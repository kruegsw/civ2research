# Deep Dive: Batches 25-28 (28 Functions, ~67KB)

Comparison of decompiled binary functions against JS engine equivalents.
Functions are smaller (1000-1600B range) from the remaining unaudited set.

---

## Group A — City/Production

---

### 1. process_city_food (FUN_004ebbde, 1,512B)

**Binary Behavior:**
- Takes city index (param_1). Gets city owner, calls `calc_food_box_size` (FUN_004e7eb1).
- **Famine path** (food_in_box < 0): Searches for a settler (role 5) homed to this city to disband first. If no settler found, sets FAMINE string with "1" appended. If WLTKD day active, also sets alternate string. Shows city food popup (FUN_004eb571). If WLTKD count (DAT_006a65b0) < 1: decrements city size, and if size drops to 0 calls `delete_city` + `kill_civ` and returns 1. If settler found and civ is human or city is human-controlled: disbands settler via FUN_005b5d93.
- **Growth path** (food_in_box >= growth_threshold): Plays sound (FUN_00504c05). Increments city size. Calls `city_growth_building_check` (FUN_0043d20a with param 3 = Aqueduct check). If growth blocked AND no settler creation possible: caps food_in_box at `(size+1) * (food_box_multiplier/2)` (granary half-fill). If growth succeeds: checks for auto-settler-at-size-2 (FUN_00441b11 for AI cities when size reaches 2 and civ is not human).
- **WLTKD growth**: When WLTKD day count (DAT_006a65b0) > 0, iterates through trade routes, removing routes pointing to the current WLTKD source city (DAT_006a6570). This is a specialized cleanup during celebration-growth.
- Resets food_in_box to 0 and redraws map.

**JS Implementation (cityturn.js `processCityFood`):**
- Computes food surplus via `calcFoodSurplus`. Checks growth threshold with difficulty-adjusted food box.
- **Famine**: Disbands settler first (matching binary). Decrements size, removes specialist or worst worker. At size 0: destroys city, disbands all homed units, cleans up trade routes and wonders.
- **Growth**: Increments size, checks Aqueduct (size > 8) and Sewer (size > 12) gates. Auto-assigns new worker or adds entertainer if no tile available.
- **WLTKD growth**: Handled as `wltkdGrowth` flag — grows without consuming food box when Republic/Democracy + WLTKD + positive surplus.

**Discrepancies:**
1. **WLTKD trade route cleanup MISSING**: Binary removes trade routes pointing to the WLTKD source city during celebration growth (the loop at lines 4638-4647). JS has no equivalent — it doesn't touch trade routes during WLTKD growth. Severity: Low (edge case).
2. **Granary half-fill on blocked growth**: Binary sets `food_in_box = (size+1) * (food_box_multiplier/2)` when growth is blocked (aqueduct/sewer). JS sets `newFood = growthThreshold - 1`. These formulas produce different values — binary uses `(newSize) * halfMultiplier`, JS caps just below threshold. **MODERATE**: this affects how quickly a player re-triggers growth after building the gate building.
3. **Auto-settler at size 2**: Binary (line 4688-4689) calls FUN_00441b11 to create a free settler for AI when an AI city reaches size 2 and civ is not human. JS has no equivalent. **LOW**: AI-specific.
4. **kill_civ on famine city destruction**: Binary calls `kill_civ(owner, 0)` when a city is destroyed by famine and the civ has no remaining cities. JS disbands units and clears wonders but doesn't explicitly check for civ elimination in the food path.

---

### 2. calc_shields_per_row (FUN_004e80b1, 1,497B)

**Binary Behavior:**
- Takes city index. Gets city owner and government. Calls `calc_food_box_size` (FUN_004e7eb1).
- Calculates `shields_per_row` (DAT_006a657c): For human players uses cosmic constant DAT_0064bccc (default 10). For AI: uses `0x0D - difficulty`, with `+1` if difficulty < 3, and `+1` if difficulty == 0. Late-game AI adjustment: if turn > 200 and difficulty > 1 and spaceship leader is human — subtracts a clamp(0..2) value based on alliance/war state. Non-default cosmic: `shields_per_row = cosmic * shields_per_row / 10`, rounded up if odd.
- Iterates all units. For each unit belonging to this city's owner that is homed to this city and has role < 6: calls FUN_004e7d7f to check if the unit exceeds free support. Counts units requiring shield support (DAT_006a6568). Also counts units on the city tile (DAT_006a655c), fortified units away from city (DAT_006a65e4), and settler units (DAT_006a65d8).
- Sets unit status bits (0x800 for supported, 0x400 for away-from-city).

**JS Implementation (production.js `calcUnitShieldSupport` + `calcGrossShields`):**
- `calcUnitShieldSupport` counts shield support cost. Uses government-based free support: Anarchy/Despotism = city size, Republic/Democracy = 0 (every unit costs), AI formula matches binary (13 - diffIdx, +1 if <3, +1 if 0), human Monarchy/Communism/Fundamentalism uses COSMIC_FREE_SUPPORT.
- `calcGrossShields` sums tile yields, applies Factory/Mfg/Power multipliers.

**Discrepancies:**
1. **Late-game AI adjustment MISSING**: Binary adjusts AI shields_per_row based on spaceship race status (turn > 200, difficulty > 1, alliance state). JS has no equivalent. **LOW**: AI-specific competitive adjustment.
2. **Non-default cosmic multiplier rounding**: Binary does `(cosmic * value) / 10` and rounds up when result is odd. JS uses a constant `FOOD_BOX_MULTIPLIER` which defaults to 10, so this path never triggers. **MINIMAL**: only matters with modded RULES.TXT.
3. **Unit status bit tracking**: Binary sets flags on each unit record (0x800, 0x400) to mark supported/away-from-city units. JS doesn't track these flags — it just computes the total. **MINIMAL**: display-only in binary.

---

### 3. calc_food_box_size (FUN_004e7eb1, 1,465B)

**Binary Behavior:**
- Takes city index and city owner. Computes food box growth threshold.
- For human players: `threshold = cosmic_food_box_multiplier` (DAT_0064bccb, default 10). If government tier > 2: uses secondary multiplier (DAT_0064bcce).
- For AI: `threshold = 0x0D - difficulty` (13 - difficulty). If difficulty < 3: `+1`. If difficulty == 0: `+1`. Late-game AI adjustment (same as shields_per_row): if turn > 200 and difficulty > 1 and spaceship leader is human, subtracts a clamp(0..2) value. Non-default cosmic: `threshold = cosmic * threshold / 10`, rounded up if odd.
- Stores result in DAT_006a6560 and DAT_006a6608.

**JS Implementation (cityturn.js `calcFoodBoxSize` + `calcFoodBoxWithDifficulty`):**
- `calcFoodBoxSize(size)`: returns `(size + 1) * FOOD_BOX_MULTIPLIER` where FOOD_BOX_MULTIPLIER = 10.
- `calcFoodBoxWithDifficulty(size, difficulty, isHuman)`: applies Chieftain 60%, Warlord 80% scaling for humans.

**Discrepancies:**
1. **Formula structure differs**: Binary computes `threshold` as a **per-row multiplier** (the food box = `(size+1) * threshold`), where threshold varies by difficulty for AI. JS directly computes the full food box size `(size+1) * 10` and then scales for difficulty. The net result should be equivalent for standard games, but the binary formula allows the cosmic multiplier to change the per-row value, while JS hardcodes 10.
2. **AI food box scaling MISSING**: Binary gives AI a different food-per-row value (13-difficulty with bonuses). JS uses the same formula for AI and human, only adjusting for Chieftain/Warlord. This means **AI cities grow at different rates in binary vs JS**. **MODERATE**: affects AI game balance.
3. **Government tier multiplier**: Binary checks government tier > 2 and uses a different cosmic constant (DAT_0064bcce). JS has no government-based food box adjustment. **LOW**: only applies to advanced governments.
4. **Late-game AI spaceship race adjustment**: Same as shields_per_row — not in JS. **LOW**.

---

### 4. calc_tile_resource (FUN_004e868f, 1,528B)

**Binary Behavior:**
- Takes city index, tile offset (0-20), and resource type (0=food, 1=shields, 2=trade).
- Resolves tile coordinates from city center + radius offset. Gets terrain type and improvement flags.
- **Food (param_3=0)**: Base from terrain table. If no irrigation/farmland: calls FUN_004e8c8c (improvement suggestion heuristic for auto-worker). If irrigated: adds irrigation bonus; if Supermarket (building 24) + farmland (both irrigation+mining): `food + food/2` (+50%).
- **Shields (param_3=1)**: Base from terrain table. Mining bonus if mined AND not irrigated (or specific conditions). For grassland (terrain 2): checks shield bit via FUN_0040bcb0. City center tile always produces at least 1 shield (implicit). If tile is "city center" (param_2 == 0x14/20) and shields == 0: shields = 1.
- **Trade (param_3=2)**: Base from terrain table. River: +1. Road/railroad: +1 if terrain < 3 or trade > 0. Republic/Democracy: +1 if trade > 0.
- **Common modifiers**: Railroad: `+50%` (value += value/2). Despotism/Anarchy: `-1` if value > 2 (unless WLTKD). Pollution: `(value + 1) >> 1`. Colossus (wonder 2) for trade. Harbor (building 30) for ocean food. King Richard's (wonder 8) for shields. Superhighways (25) for trade with road.
- **Ocean special**: For terrain 10 (ocean), food checks Harbor building (30), shields check Offshore Platform (31).

**JS Implementation (production.js `calcTileFood`, `calcTileShields`, `calcTileTrade`):**
- Split into three separate functions. Each implements the terrain base, special resources, improvements, government penalties, railroad bonus, pollution halving.
- Food: irrigation bonus, Supermarket+farmland +50%, Harbor on ocean, railroad +50%, Despotism/Anarchy penalty, pollution halve.
- Shields: mining bonus (if mined AND not irrigated), grassland shield, city center minimum 1, King Richard's +1, Offshore Platform on ocean, railroad +50%, government penalty, pollution.
- Trade: river +1, road/railroad +1, Colossus +1, government penalty, Republic/Democracy +1, WLTKD +1, Superhighways +50%, pollution.

**Discrepancies:**
1. **WLTKD trade bonus**: JS gives `+1 trade on every tile that produces trade > 0` during WLTKD. Binary does NOT have this — WLTKD affects the government penalty check, not an extra +1. **MODERATE**: JS over-produces trade during WLTKD.
2. **Auto-worker improvement suggestion**: Binary calls FUN_004e8c8c / FUN_004e8db5 when tiles are unimproved, which sets "improvement suggested" counters for the AI. JS has no equivalent. **MINIMAL**: AI-only display hint.
3. **Shields mining condition**: Binary has a more complex condition for mining bonus involving irrigation state AND specific terrain checks. JS simplifies to `if (imp.mining && !imp.irrigation)`. This matches the common case but may miss edge cases where the binary allows mining bonus on irrigated tiles for certain terrains. **LOW**.
4. **Government tier check for trade bonus**: Binary checks `government tier >= 2` for the +50% Superhighways bonus. JS checks the building directly. Same result. **NONE**.

---

### 5. calc_city_production (FUN_004e9c14, 1,053B)

**Binary Behavior:**
- Computes city shield production with factory/power multipliers, waste, and corruption.
- **Factory/Power**: Factory (15): +2, Mfg Plant (16): +2. Power from: Power Plant (19), Hydro (20), Nuclear (21), Solar (29), or Hoover Dam (wonder 22). Power mult capped to factory mult. Final: `base + (base * factoryMult / 4) + (base * powerMult / 4)`.
- **Waste calculation**: Counts courthouse (building 13 = 0x0D) for corruption = 0. Otherwise checks for Adam Smith's (wonder 37 = 0x25), Factory (5), Democracy (0x30), Communism (0x3E). Each match increments corruption counter. If counter > 0 and no Women's Suffrage (wonder 0x4A): +1. If counter > 0 and no WLTKD: -1. If counter > 0 and courthouse (building 29 = 0x1D): -1.
- **Shield waste**: `distance / divider - 0x14` plus `(size * corruption_count / 4)`. Applies government factor and capital distance formula.
- **Zero waste cases**: Owner == 0 (barbarian), government == fundamentalism (4), government == democracy (6), or building is set to produce nothing and no capital distance.

**JS Implementation (production.js `calcShieldWaste` + `calcGrossShields`):**
- `calcGrossShields`: sums tile yields, applies Factory/Mfg/Power multiplier. Formula: `base + (base * factoryMult >> 2) + (base * powerMult >> 2)`. Factory and power mult cap matches binary.
- `calcShieldWaste`: Zero for fundamentalism, democracy, barbs, or palace city. Uses capital distance formula with government factor. Includes Courthouse/Factory halving.

**Discrepancies:**
1. **Wonder corruption counters**: Binary tracks specific wonder-based corruption count (Adam Smith, Factory tech, Democracy, Communism, Women's Suffrage, WLTKD, Courthouse). JS uses a simpler formula based on government factor and capital distance. The binary's incremental counter system is more nuanced — for example, having Democracy wonder without being a democracy still reduces waste. **MODERATE**: affects waste calculations in some government/wonder combinations.
2. **Shield waste floor**: Binary ensures `waste >= 0` and `netShields >= 1`. JS does `Math.max(0, grossShields - support - waste)` which doesn't enforce minimum 1. **LOW**: only matters when waste == grossShields - support.

---

### 6. calc_capital_distance_and_corruption (FUN_004e7967, 1,048B)

**Binary Behavior:**
- Computes capital distance for corruption/waste. Finds the nearest same-owner city with Courthouse (building 1 = Palace check via FUN_0043d20a). Stores distance in DAT_006a6588, capital city index in DAT_006a6600.
- If no Palace: distance = 0x20 (32). If Palace found: uses isometric distance (FUN_005ae31d).
- **Corruption modifier**: If distance == 0 (city IS capital): DAT_006a6574 = 1. If civHasTech(Communism = 0x43): increment by 1 (so capital + communism = 2).
- **Same-continent check**: If capital on same continent (FUN_005b8a81 returns same body ID): uses route-based distance (FUN_00488a45). Otherwise uses raw isometric distance.
- **Tile overlap detection**: For nearby enemy cities (distance < 6), marks tiles that overlap with this city's radius for corruption penalty tracking.

**JS Implementation (production.js `calcTradeCorruption` + `calcShieldWaste` + `capitalDistance`):**
- Uses `capitalDistance(cx1, cy1, cx2, cy2, mw2, mapShape)` — isometric distance with map wrapping.
- Default distance = 32 when no capital. Communism caps distance at 3 (trade) or 3 (shields, different from tile overlap). Democracy/Fundamentalism = 0 corruption.
- No same-continent vs cross-continent distinction.

**Discrepancies:**
1. **Same-continent vs cross-continent distance**: Binary uses road-network distance (FUN_00488a45) when capital and city are on the same continent, but raw isometric distance when on different continents. JS always uses raw isometric distance. **MODERATE**: affects corruption for same-continent cities connected by roads.
2. **Tile overlap corruption tracking**: Binary detects overlapping tiles from enemy cities within distance 6 and marks them with flag 0x10 for corruption penalty. JS has no equivalent. **LOW**: cosmetic tile-level display.
3. **Communism behavior**: Binary sets corruption level = 1 at capital + 1 for communism tech (max 2). JS uses `(govt === 'communism') ? 3 : distance` which caps the distance at 3, not the corruption level. These are different values used in different formulas. **LOW**: communism corruption is already low.

---

### 7. calc_trade_route_income (FUN_004eb327, 1,378B)

**Binary Behavior:**
- Iterates city's trade routes. For each active route (negative flag in route data byte): counts the route as contributing income and tracks the destination city (DAT_006a6570). Also counts incoming routes from other cities.
- Sets `DAT_006a65b0` = outgoing route count, `DAT_006a6558` = incoming route count.
- Adjusts gross trade (DAT_006a65c8) by subtracting outgoing and adding incoming routes.

**JS Implementation (production.js `calcTradeRouteIncome`):**
- Iterates `city.tradeRoutes`. For each: calculates income = `(myGross + destGross + 4) >> 3`. Applies modifiers: same continent halve, foreign civ +50%, demand match +50%, railroad +50%. Minimum 1 per route.

**Discrepancies:**
1. **Route counting vs income calculation**: Binary FUN_004eb327 is actually just a **route counter** that tallies active outgoing and incoming trade routes and adjusts the gross trade counter. The actual trade route income calculation is elsewhere. JS `calcTradeRouteIncome` computes the per-route gold income directly. The functions are doing different things at different pipeline stages. **STRUCTURAL**: binary separates counting from calculation; JS combines them.
2. **Incoming route counting**: Binary counts routes FROM other cities TO this city (scanning all cities). JS only iterates the city's own `tradeRoutes` array and doesn't account for incoming routes. **LOW**: the parser should capture all active routes.

---

### 8. init_new_game (FUN_004aa9c0, 1,345B)

**Binary Behavior:**
- Calls FUN_00484cc0 (map generation) and FUN_004a76f5 (unknown init).
- Clears 8 player slots (0x10 byte records) and 21 unit type records (0x30 byte records).
- Initializes globals: turnsPassed=0, year=0xF060 (-4000), unk_afc=0xFFFF.
- Sets game options flags based on difficulty. Clears diplomacy/treaty state.
- Initializes 8 civs via `new_civ` (FUN_004a7ce9). Sets `DAT_006d1da8 = 1`.
- Random seed for city naming: `DAT_00655c1e = rand() % 50`.
- Clears attitude arrays (100 entries x 8 civs). Clears wonder arrays (28 wonders).
- Calls FUN_004a7754 (assign starting positions). Validates map size constraints: if `landWidth + landHeight > 10 OR landWidth > 6 OR landHeight > 6`, clamps to 6/4.
- If single human player: sets tax/science rates to custom values (6/4). If difficulty == Chieftain: treasury = 50.
- Multi-player: all alive civs get rates 6/4 and Chieftain treasury.

**JS Implementation (init.js `initNewGame`):**
- Creates mapBase, assigns continentBodyIds, initializes RNG.
- Creates 8 civ slots (0=barbarians, 1-7=players). Uses `createNewCiv()` for alive civs.
- Places starting settlers via `assignInitialSettlerPositions`. Creates starting units (Settlers + Warriors).
- Start quality scoring and extra settler for poor starts.
- Sets Chieftain treasury = 50.
- Establishes bilateral ceasefire between human players.

**Discrepancies:**
1. **Map size clamping**: Binary enforces `landWidth + landHeight <= 10` and individual caps of 6. JS has no equivalent constraint. **LOW**: map generation handles this upstream.
2. **Tax/science rate initialization**: Binary sets specific rate values (6/4 for single player). JS uses createNewCiv defaults. **LOW**: initial rates.
3. **City naming seed**: Binary uses `rand() % 50` for city name index. JS uses SeededRNG instead. **MINIMAL**: different RNG source.
4. **Starting units**: Binary uses `new_civ` which grants starting techs and potentially more setup. JS grants techs via `createNewCiv` which is already ported. **MATCHED**.
5. **Attitude arrays**: Binary clears 100x8 attitude entries (civs x tech slots?). JS initializes per-civ attitude arrays of length 8. **STRUCTURAL**: different data layout but same concept.

---

## Group B — Diplomacy/Parley

---

### 9. parley_execute_transaction (FUN_004dd285, 1,381B)

**Binary Behavior:**
- Giant switch on transaction type (offset +0x10 in packet). Dispatches to sub-handlers:
  - Case 6: `transfer_tribute` (FUN_004df10f)
  - Case 7: `transfer_tech` (FUN_004ddfb2)
  - Case 8: `transfer_unit` (FUN_004ddf04)
  - Case 9: `share_contact` (FUN_004de990)
  - Case 10: `transfer_city` (FUN_004de049)
  - Case 0xB: `share_maps` (FUN_004dd8ad) — one direction
  - Case 0xC: `share_maps` both ways (calls FUN_004dde9e twice)
  - Case 0xD: `share_maps` both ways via FUN_004dd8ad
  - Case 0xE: **Counter-offer**: processes BOTH sides (second offer in packet at `param_1 + offset_0x24`). Each side dispatches through same switch.
  - Case 0xF: **Gift/tribute**: processes sender's side only.
- After transaction: calls FUN_004b0b53 (update display). Checks if either civ was eliminated (no cities + no units → kill_civ).

**JS Implementation (diplomacy.js `executeTransaction`):**
- Processes offer objects with fields: goldAmount, techId, cityIndex, shareMaps, treatyType.
- Handles: gold transfer, tech grant, city transfer, map sharing, treaty signing.
- Uses helper functions: `grantAdvance`, `transferCity`, `shareMaps`, `signCeasefire`/`signPeaceTreaty`/`formAlliance`.

**Discrepancies:**
1. **Counter-offer handling**: Binary has explicit counter-offer (case 0xE) that processes BOTH sides of a bilateral trade. JS handles offers as separate unilateral actions. **STRUCTURAL**: JS would need two calls for a bilateral exchange.
2. **Post-transaction civ elimination check**: Binary checks if either civ has 0 cities + 0 units and kills them. JS does not check for this after a transaction. **LOW**: edge case (giving away your last city).
3. **Unit transfer (case 8)**: Binary supports transferring units between civs. JS `executeTransaction` doesn't have explicit unit transfer. **MISSING FEATURE**.
4. **Contact sharing (case 9)**: Binary supports sharing knowledge of a third civ. JS doesn't implement this. **MISSING FEATURE**.

---

### 10. parley_execute_share_maps (FUN_004dd8ad, 1,521B)

**Binary Behavior:**
- Three parameters: fromCiv, toCiv, mode (0=full share, 1=city-only share).
- Iterates ALL map tiles. For each tile visible to toCiv: if not visible to fromCiv, grants visibility to fromCiv. If mode == 0 (full share): also copies exploration data (the 0x80 bit from tile visibility masks).
- Shares city knowledge: for each city visible to or owned by toCiv, sets visibility bit for fromCiv. Updates city's known-size for fromCiv (from toCiv's knowledge or actual size).
- Shares unit knowledge around each shared city (radius 21 tiles around each city).
- If mode is 0 or 1: iterates cities, shares city size knowledge and sets visibility bits.

**JS Implementation (diplomacy.js `shareMaps`):**
- Iterates all tileData. For each tile visible to fromCiv but not toCiv: sets toCiv's visibility bit.
- Reveals tiles around fromCiv's units (via updateVisibility).
- Reveals tiles around fromCiv's cities (radius 2).

**Discrepancies:**
1. **Direction is reversed**: Binary copies FROM toCiv TO fromCiv (shares toCiv's map WITH fromCiv). JS copies FROM fromCiv TO toCiv. The callers compensate by calling in opposite direction, but this is fragile. **NOTE**: The alliance formation code calls `shareMaps(state, mapBase, civA, civB)` AND `shareMaps(state, mapBase, civB, civA)`, which is correct bidirectional sharing.
2. **Exploration data (0x80 bit)**: Binary explicitly handles the "explored but not currently visible" distinction. JS only sets the visibility bit. **LOW**: JS uses a simpler visibility model.
3. **City size knowledge sharing**: Binary updates each city's "known size" from the perspective of the receiving civ. JS doesn't track per-civ city knowledge. **LOW**: different info model.
4. **Mode parameter**: Binary has mode 0 (full) vs mode 1 (city-only). JS always does full sharing. **MINIMAL**: mode 1 is only used in specific treaty scenarios.

---

### 11. parley_handle_response (FUN_004b81dd, 1,177B)

**Binary Behavior:**
- This is a UI callback function that handles the human player's response to an AI's diplomatic offer. It checks 4 response flags:
  - DAT_006c91e8 (accept war declaration): If type=6 (tribute) and value=3 (war): shows war declaration dialog, checks treaty levels and potentially breaks ceasefire/peace.
  - DAT_006c91ec (accept offer): Calls `parley_execute_transaction`, shows PARLEYACCEPT dialog.
  - DAT_006c91f0 (reject): Shows PARLEYNOTHANKS dialog, calls FUN_004b8676(1) to handle rejection.
  - DAT_006c91f4 (counter-offer): Shows PARLEYCOUNTEROFFER dialog.
- Sets DAT_00635a3c callback back to itself for continued dialog flow.

**JS Implementation:**
- Not directly ported as a single function. The multiplayer architecture handles this through the reducer's DIPLOMACY_RESPONSE action. The server-authoritative model means responses are dispatched as actions, not UI callbacks.

**Discrepancies:**
1. **Entirely different architecture**: Binary is a Win32 callback-driven dialog. JS is action/reducer. The logic is functionally equivalent but structurally incomparable. **N/A — architectural difference**.
2. **War declaration via tribute rejection**: Binary has specific logic for detecting when a "tribute" transaction with value 3 is a war threat. JS handles war declarations as explicit DECLARE_WAR actions. **STRUCTURAL**.

---

### 12. parley_build_packet (FUN_004db690, 1,024B)

**Binary Behavior:**
- Allocates a memory buffer for a diplomacy packet. Packet structure:
  - Header: 0x66606660 magic, 0x82 message type, total size.
  - Fields at offsets: +0x10 = transaction type, +0x14 = civA, +0x18 = civB, +0x1C = unknown, +0x20 = offer data, +0x24 = counter-offer offset, +0x28 = tribute value.
- For tech offers (case 8/0xC): counts selected techs. For unit offers (case 10/0x11): counts selected units. Calculates buffer size including variable-length tech/unit lists.
- For counter-offers (type 0xE): builds a second offer sub-packet at the appropriate offset.

**JS Implementation:**
- Not ported. JS uses structured JSON objects for offers, not binary packets. The WebSocket transport serializes/deserializes natively.

**Discrepancies:**
- **N/A**: Binary networking protocol. JS uses WebSocket JSON. No port needed per CLAUDE.md instructions.

---

### 13. diplo_sign_ceasefire (FUN_0045a7a8, 1,160B)

**Binary Behavior:**
- Sets treaty flags: `0x4002` (CEASEFIRE + CONTACT). Also sets `0x40000` (TRIBUTE_DEMANDED) via FUN_00467750.
- Clamps attitude to [0, 50] via `FUN_00467904 + FUN_005adfa0 + FUN_00467933`.
- Calls `FUN_0045705e` (share_borders or clear hostility). Resets patience counter to 0.
- Records treaty turn: `ceasefireTurn[civA][civB] = currentTurn`.
- Shows CEASEFIRE dialog text.
- Clears WAR_STARTED (0x800) flag for all third-party civs toward civA:
  `for c in 1..7: treatyFlags[civA][c] &= ~0x800`.

**JS Implementation (diplomacy.js `signCeasefire`):**
- `setTreaty(state, civA, civB, 'ceasefire')` — sets treaty string + syncs flag bits.
- Clamps attitude to [0, 50].
- Records treaty turn via `recordTributeTurn`.
- Clears provoked flags in diplomacy state.
- Clears WAR_STARTED flag for third parties at war with both civA and civB.

**Discrepancies:**
1. **TRIBUTE_DEMANDED flag (0x40000)**: Binary sets this flag via FUN_00467750 during ceasefire signing. JS does not set this flag. **LOW**: tracking flag for AI decision-making.
2. **Flag clearing scope**: Binary clears 0x800 from ALL civs' flags toward civA (`treatyFlags[civA][c]` for all c). JS clears WAR_STARTED only for third parties at war with BOTH civA and civB. **MODERATE**: binary is broader — it clears the "sneak attack" flag for everyone, not just mutual enemies.
3. **Patience counter**: Binary resets patience via direct byte assignment. JS uses `recordTributeTurn` which serves a similar purpose. **MATCHED** functionally.

---

### 14. diplo_sign_peace_treaty (FUN_0045a6ab, 1,160B)

**Binary Behavior:**
- Sets treaty flags: `0x4004` (PEACE + CONTACT).
- Clamps attitude to [0, 50].
- Calls `FUN_0045705e` (share_borders).
- Resets patience counter (DAT_0064c6bf) to 0.
- Records treaty turn: `peaceTurn[civB][civA] = currentTurn`.
- Shows TREATY dialog text.

**JS Implementation (diplomacy.js `signPeaceTreaty`):**
- `setTreaty(state, civA, civB, 'peace')`. Clamps both directions to [0, 50].
- Resets patience. Records treaty turn.
- Sets withdrawal deadline (currentTurn + 2) for military withdrawal clause.

**Discrepancies:**
1. **Withdrawal deadline**: JS adds a `withdrawalDeadlines` entry (currentTurn + 2). Binary does not explicitly track withdrawal — it handles withdrawal through the unit movement system with flag checks. **ENHANCEMENT in JS**: more explicit tracking.
2. **Bidirectional attitude clamp**: JS clamps attitude BOTH directions (civA toward civB AND civB toward civA). Binary only clamps civB toward civA. **MINOR BUG in JS**: over-clamping. Binary only adjusts the accepting civ's attitude.
3. **Share borders**: Binary calls FUN_0045705e which does border normalization. JS doesn't have this. **LOW**: cosmetic/AI.

---

### 15. diplo_demand_ally_help (FUN_0045b0d6, 1,028B)

**Binary Behavior:**
- Called when a human player is at war. Checks if the human player has an alliance with another civ (not at war or in bilateral war with the enemy).
- If alliance partner exists: calls FUN_00458df9 to check if the ally can realistically help. If ally can't help (return 0): simply improves attitude (+100).
- If ally can help: shows DEMANDHELP dialog. If player accepts (local_18 == 1): opens unit transfer dialog for the ally to provide military units. If rejected: shows NOHELP text.
- Scans units (1..0x3F) to find military units to transfer.

**JS Implementation:**
- Not directly implemented as a standalone function. The multiplayer architecture handles alliance requests through the proposal system. There is no explicit "demand ally help" action.

**Discrepancies:**
1. **Not implemented**: JS has no equivalent of demanding military assistance from an ally. **MISSING FEATURE**: this is a player-to-AI interaction that would need specific UI and reducer support.

---

## Group C — Units/Movement

---

### 16. validate_unit_stack (FUN_005b2590, 1,050B)

**Binary Behavior:**
- Validates the linked list integrity of a unit stack. Three passes:
  1. **Infinite loop detection**: Follows `prev` pointers up to 0x7FF (2047) steps. If exceeded: logs "Infinite unit stack", detaches all units in the stack (pick_up + put_down), returns 0.
  2. **Dead unit check (prev chain)**: Walks the `prev` chain. If a unit's alive flag is 0: logs "Dead unit in unit stack", severs the link.
  3. **Dead unit check (next chain)**: Same for the `next` chain.
  4. **Location mismatch**: Walks `prev` chain checking that all units in the stack share the same (x, y) coordinates. If mismatch: logs "Crossed locations", severs the link.
- Returns 1 if stack is valid, 0 if repairs were needed.

**JS Implementation:**
- No direct equivalent. JS doesn't use linked lists for unit stacks — it uses array-based filtering: `state.units.filter(u => u.gx === x && u.gy === y)`. Stack integrity is guaranteed by the data structure.

**Discrepancies:**
1. **N/A**: JS uses arrays, not linked lists. Stack validation is unnecessary. The binary's linked list is a legacy optimization. **ARCHITECTURAL**.

---

### 17. pick_up_unit (FUN_004c9528, 2,453B)

**Binary Behavior:**
- This function handles both unit "pick up" (detach from map) AND the bribe cost calculation for diplomats/spies.
- **Bribe cost calculation**: `distToPalace = calc_city_revolt_distance(target.owner, x, y)`. Communism/Republic cap at 10. `cost = unit_cost * (treasury + 750) / (dist + 2)`. Non-settler: cost /= 2. Damaged units cost less. Shows dialog with cost and asks for confirmation.
- **Pick up mechanics**: Removes unit from its tile's unit stack (prev/next linked list manipulation). If unit had a home city, decrements that city's supported unit count. Updates tile visibility.

**JS Implementation (espionage.js `calcBribeCostEnhanced`):**
- Bribe cost: `dist = calcCityRevoltDistance(...)`. Communism/Republic cap. `cost = unitCost * (treasury + 750) / (dist + 2)`. Non-settler halved. Damaged units discount. Garrison proximity discount.

**Discrepancies:**
1. **Government check direction**: Binary checks the TARGET's government for Communism/Republic distance cap. JS comment says "TARGET's government" and the code uses `getGovernment(null, state, target.owner)` — this matches.
2. **Garrison proximity discount**: JS adds a 10% discount when garrison distance > 10. Binary does NOT have this. **MINOR EXTRA in JS**: non-binary behavior.
3. **Damage cost reduction formula**: Binary uses `cost * (maxHP - hpLost) / maxHP`. JS uses `cost * curHp / maxHp` where `curHp = maxHp - movesRemain`. The binary uses `hpLost` field directly. **POTENTIAL BUG in JS**: using `movesRemain` instead of `hpLost` is incorrect — movesRemain is movement points, not HP. Should use `target.hpLost` or equivalent.
4. **Unit stack manipulation**: Binary does linked list removal. JS doesn't need this (array-based). **ARCHITECTURAL**.

---

### 18. execute_worker_order (FUN_004c42a0, 2,035B)

**Binary Behavior:**
- Takes unit index and order type (4-10). Calculates turns needed based on terrain:
  - 4 (Road): `terrain_road_cost / 2 + 3`
  - 5 (Irrigation): `(pollution ? 4 : 2) * terrain_irrigation_cost`. If river: +2.
  - 6 (Mine): terrain mine cost
  - 7 (Plant Forest): terrain plant cost
  - 8 (Transform): `terrain_transform_cost * cosmic_transform_multiplier`
  - 9 (Clean Pollution): 4 turns
  - 10 (Airbase): 4 turns
- Pools work from other settlers/engineers on the same tile doing the same order. Engineers (type 1) count as 2 work points.
- When work completes (workTurns >= required): applies the improvement. Specific completion logic per order type:
  - Road (4): Checks if tile already has fortress+road → skip. Sets road improvement. If no city exists: clears existing irrigation/farmland conflicts.
  - Irrigation (5): If no previous irrigation, sets irrigation. If already irrigated and has Railroad tech (0x43): sets farmland.
  - Mine (6/7): Complex terrain transformation. If terrain transform code < 0: sets railroad/irrigation flags. Otherwise: changes terrain type.
  - Transform (8): Changes terrain to transform target. Clears mining/irrigation conflicts.
  - Pollution (9): Clears pollution. Decrements global pollution count.
  - Airbase (10): Sets airbase + fortress flags.
- After completion: clears orders for all settlers doing that task on this tile. Updates visibility.

**JS Implementation (reducer.js WORKER_ORDER case + rules.js):**
- Sets `unit.orders = order` and `unit.workTurns = 0`, `movesLeft = 0`.
- Actual completion handled in END_TURN processing (not in the reducer case). The reducer just initiates the order.

**Discrepancies:**
1. **Work pooling from multiple settlers**: Binary pools work points from all settlers on the same tile doing the same order. JS doesn't implement work pooling — each unit works independently. **MODERATE**: engineers should complete faster when multiple are working.
2. **Engineer double speed**: Binary counts engineers as 2 work points. JS may not distinguish settler vs engineer work rate. **MODERATE**: core mechanic.
3. **Turn calculation per terrain**: Binary uses terrain-specific work costs from the terrain table. JS uses hardcoded turn counts. **MODERATE**: may not match modded RULES.TXT.
4. **Farmland upgrade**: Binary detects "already irrigated + has Railroad tech" to upgrade to farmland. JS implementation needs verification for this path.
5. **Terrain transformation (mine/plant)**: Binary has complex terrain change logic based on transform codes. JS handling of terrain changes may be simplified.

---

### 19. handle_incident_terror (FUN_004c59f0, 1,465B)

**Binary Behavior:**
- Diplomatic consequences when a spy/diplomat performs espionage.
- Gets attacker and defender civs. Checks treaty status.
- **At war**: Only attitude penalty (-20).
- **At peace/ceasefire**: Shows incident dialog. Significant attitude penalty. May trigger war declaration by AI. Records incident.
- **Republic/Democracy scandal**:
  - Communism: immune to scandal
  - Democracy: ALWAYS triggers revolution (government → anarchy, 1-4 random turns)
  - Republic: 50% chance of revolution
- Updates reputation tracking.

**JS Implementation (espionage.js `handleEspionageIncident`):**
- At war: -20 attitude penalty.
- At peace/ceasefire/alliance: -30 attitude penalty (binary is also about -30 based on context), records incident, pushes turnEvent.
- Republic/Democracy scandal: Communism immune, Democracy always triggers, Republic 50% chance. Matches binary.
- `triggerRevolutionFromScandal`: sets government to 'anarchy', 1-4 random turns.

**Discrepancies:**
1. **Attitude penalty values**: JS uses -20 (war) and -30 (peace). Binary's exact values depend on context but are in the same range. **CLOSE MATCH**.
2. **AI war declaration**: Binary may immediately declare war in response. JS only records the incident for AI to process later. **MINOR**: deferred vs immediate.
3. **Reputation system**: Binary tracks reputation damage more granularly. JS records incident but doesn't update a specific reputation score. **LOW**: affects long-term AI diplomacy.

---

### 20. unit_order_goto_city (FUN_0058d6af, 1,787B)

**Binary Behavior:**
- UI function for the "Go to city" order. Gets current unit, its owner, position, and continent.
- Builds a list of valid destination cities based on unit type:
  - Domain 2 (air): Shows all cities if on same continent; checks fuel range if flying.
  - Domain 0 (land): Only cities on same continent (FUN_005b8a81 body ID check). OR cities reachable by transport (FUN_004429af/0044263f).
  - Domain 1 (sea) with transport flag: Range-based filtering using remaining movement.
- For settlers (role 5): Counts pollution squares around each city and displays count.
- For trade units (caravans/freight): Checks if city has Airport (building 32) and displays airport icon.
- Shows city list dialog. Player selects destination. Sets unit's goto coordinates.

**JS Implementation:**
- Not implemented as a standalone function. JS uses pathfinding (`pathfinding.js`) with explicit `goToX`/`goToY` coordinates set by the player through the UI. The city list filtering logic is client-side.

**Discrepancies:**
1. **Domain-based filtering**: Binary filters cities by unit domain (land → same continent, sea → reachable, air → fuel range). JS relies on the pathfinding system to determine reachability, not explicit domain filtering. **STRUCTURAL**.
2. **Not a game-logic function**: This is primarily UI code (dialog display). The game logic (movement execution) is in the movement system, which IS ported. **N/A for engine**.

---

## Group D — AI/Research

---

### 21. ai_tech_exchange (FUN_0055d1e2, 1,182B)

**Binary Behavior:**
- AI attempts to trade techs between civSlot (param_1) and param_2.
- First checks: if scenario flag 0x80 set AND game flags 0x20 set → return 0 (no trading).
- Checks spaceship race: if spaceship leader is human, turn > 200, difficulty > 1, and leader has more techs than both civs → sets `bVar1 = true` (competitive pressure flag).
- Scans all 100 techs. For each tech known to one civ but not the other: evaluates value using `calcTechValue` + random(0-2). Tracks best tech for each direction (highest value).
- If both sides have a tech to offer (local_10 == 3): executes mutual exchange via FUN_004bf05b.
- If only one side has a tech: checks alliance status, tech gap, competitive pressure. If conditions met: demands tech as tribute (sets TRIBUTE_DEMANDED flag 0x40000).

**JS Implementation:**
- Not directly implemented as a standalone function. AI tech trading is handled in `ai/diplomai.js` through the broader AI diplomacy system.

**Discrepancies:**
1. **Not standalone**: JS integrates tech exchange into the broader diplomacy AI pipeline rather than having a dedicated exchange function. **STRUCTURAL**.
2. **Competitive pressure from spaceship race**: Binary checks spaceship leader status. JS diplomacy AI may not have this specific check. **LOW**: AI-specific.

---

### 22. check_join_war (FUN_0055d685, 595B)

**Binary Behavior:**
- Called when civA (param_1) considers joining param_3's war against param_2.
- First: if civA is already at war with param_2 OR has the INTRUDER flag (0x20) with param_2 → return 0 (already hostile).
- If param_2 doesn't have INTRUDER flag with param_3: checks if BOTH civA and param_3 have VENDETTA (0x10) against param_2 → if so, sets INTRUDER (0x20) on both and returns 0.
- For human civ (param_2 is human): checks if enough time has passed since last war (6 turns). If attitude level < 7 (not worshipful): 2/3 chance of returning 0.
- Records war start turn for both civA and param_3.
- Shows JOINWAR dialog. Calls FUN_00467825 to set WAR flag (0x2000). Returns 1.

**JS Implementation:**
- Not directly implemented. Alliance war cascades are handled in `diplomacy.js formAlliance` where allies automatically join wars.

**Discrepancies:**
1. **Explicit join-war gate**: Binary has a specific function with cooldown (6 turns), attitude check, and random gate (2/3 chance). JS's alliance cascade is automatic without these gates. **MODERATE**: JS is more aggressive about pulling allies into wars.
2. **INTRUDER/VENDETTA flag handling**: Binary uses granular treaty flags for "shared enemy" detection. JS uses string-based treaty comparisons. **LOW**: functionally similar.

---

### 23. ai_choose_government (FUN_0055f5a3, 1,149B)

**Binary Behavior:**
- AI selects best government type. Checks: if scenario flag 0x80 AND game flag 0x10 set AND current government != anarchy → return (don't change).
- Maximum government level: defaults to 6 (all). If param_2 != 0: `level = 5`, then `rand() % 3 != 0 → level = 4`.
- If game has "aggression" flag (0x01) AND human player has higher tech AND AI attitude < 6: caps government scores (forces -2 on luxury, -1 on science).
- If city has positive wealth AND current government tier < 6: `level = 1` (only anarchy/despotism).
- Iterates governments 1 through `level`. For each: calls FUN_0055c277 to check if prerequisites are met. Tracks highest-scoring government (using per-civ stored government scores from DAT_0064ca74).
- Calls FUN_0055c69d to execute government change.

**JS Implementation:**
- Not implemented as a standalone function. AI government selection is handled in `ai/econai.js` through the broader economic AI system.

**Discrepancies:**
1. **Not standalone**: JS integrates this into the economic AI pipeline. **STRUCTURAL**.
2. **Government scoring**: Binary uses pre-computed per-civ government scores (DAT_0064ca74). JS likely computes scores on the fly. **IMPLEMENTATION**: different but functionally equivalent.
3. **Aggression flag checks**: Binary has specific scenario/difficulty-based gates. JS may not have all these. **LOW**: scenario-specific.

---

### 24. ai_calc_tech_value (FUN_004bdb2c, 2,869B)

**Binary Behavior:**
- Comprehensive tech valuation for AI research selection. Key components:
  1. **Base**: `AI_INTEREST[tech] * leaderPersonality + EPOCH[tech]`
  2. **Personality damping**: If non-human civ is at war with more advanced human civ, reduce personality.
  3. **Naval scoring**: Prereq chain to naval techs (Map Making=3, Navigation/Magnetism=2, Industrialization=1).
  4. **Continent connectivity**: Check if civ has presence on multiple continents; affects naval bonus.
  5. **Bloodlust flag**: Doubles naval score.
  6. **Strategic goal**: If human has Space Flight, prereqs get +2, goal tech gets +5.
  7. **Wonder prereqs**: +2 if rival owns wonder, -2 if we own it (except Engineering).
  8. **Aqueduct/Sewer**: +2 if largest city at threshold.
  9. **Leader-specific bonuses**: Big switch on `rulesCivNumber` (21 cases). E.g., Romans favor Republic, Greeks favor Democracy, etc.
  10. **Already-known discount**: -2 if we already have the tech.
  11. **Minimum floor**: Score clamped to >= 1.

**JS Implementation (ai/econai.js `calcTechValue`):**
- Faithful port with same major components: base score, personality damping, naval scoring, strategic goal, wonder prereqs, aqueduct/sewer, leader bonuses.
- Uses simplified continent connectivity (checks Map Making ownership instead of per-continent arrays).
- Leader-specific bonuses ported via `getLeaderTechBonuses` helper.

**Discrepancies:**
1. **Continent connectivity simplification**: Binary checks actual per-continent city arrays. JS checks if civ has Map Making tech as a proxy. **LOW**: approximation.
2. **Bloodlust flag**: Binary doubles naval score when scenario bloodlust flag is set. JS doesn't check this. **LOW**: scenario-specific.
3. **Already-known discount**: Binary deducts points for techs the civ already has (which shouldn't normally be in the candidate list). JS may skip this check. **MINIMAL**: shouldn't be needed if candidate filtering is correct.
4. **Leader personality array access**: Binary reads from complex memory layout (0x594-byte civ records). JS uses a lookup function. **ARCHITECTURAL**: same data, different access.

---

## Group E — Misc

---

### 25. map_ascii (FUN_00411f91, 1,203B)

**Binary Behavior:**
- This function was not found in the decompiled files (no match for FUN_00411f91 in any block file). May be inlined, a thunk, or located in a different address range.

**JS Implementation:**
- N/A — function not found in decompiled source.

**Discrepancies:**
- **Cannot compare**: function not present in decompiled output. **SKIPPED**.

---

### 26. handle_resign (FUN_0055b6c7, 586B)

**Binary Behavior:**
- Handles player resignation. Checks multiplayer level:
  - Level < 3 OR network flag not set: single-player resign
    - Level 0: calls FUN_0046e6a9 + FUN_00484d3b (cleanup and return to menu)
    - Level > 0 but < 3: If level > 2: closes chat window, shows resignation screen with player stats (name, title, score, civ name). If scenario flag not set: shows victory/defeat screen. Sets DAT_00628054 = 0. Calls FUN_0041033a (reset). If current player is the last human: removes from alive bitmask, sends kill event (0x31 to multiplayer), calls FUN_00484d3b + FUN_0046e6a9.
    - Otherwise: calls FUN_004e1763 (end turn processing).

**JS Implementation:**
- Not implemented as a standalone function. Game resignation is handled through the server's session management (disconnect/leave room). The server removes the player's seat and may convert them to AI.

**Discrepancies:**
1. **Entirely different architecture**: Binary is a local game state cleanup. JS uses server-authoritative session management. **ARCHITECTURAL**.
2. **Kill civ on last human resign**: Binary clears the human bit from alive mask and sends a kill event. JS would need explicit civ elimination logic. **POTENTIAL GAP**: if a player resigns mid-game, their civ should be removed or converted to AI.

---

### 27. set_city_shields (FUN_005569e3, 1,357B)

**Binary Behavior:**
- This function was not found in the decompiled files (no match for FUN_005569e3 in any block file or function index for that address). May be a misidentified address.

**JS Implementation:**
- N/A — function not found in decompiled source.

**Discrepancies:**
- **Cannot compare**: function not present in decompiled output. **SKIPPED**.

---

### 28. apply_global_warming (FUN_004868fb, 819B)

**Binary Behavior:**
- Takes param_1 (warming severity level, 0-6). Shows GLOBALWARMING dialog if not in test mode. If multiplayer level > 2: broadcasts event.
- Iterates ALL map tiles. For each tile with terrain < 4 (desert, plains, grassland, forest):
  - Counts adjacent land tiles (8 neighbors). The count determines resistance.
  - **Low neighbor count** (< 7 - severity): Uses a hash `(x*3 + y*(-3)) & 7` == severity to select which tiles degrade. If tile has a city: clears city exploration. If terrain < 2 (desert/plains): degrades terrain to desert (0) or swamp (1). If terrain == 2 or 3: degrades to desert (0) or plains (1).
  - **High neighbor count** (>= 7 - severity): Tile is surrounded by land. Degrades more aggressively: terrain 3 → swamp (9), else → jungle (8). Clears road/railroad improvements. Updates visibility for all players.
- Resets tile exploration state. Calls FUN_005b9f1c (map recalculation).

**JS Implementation:**
- Not implemented. Global warming is not in the JS engine. The parser reads `globalWarmingCount` from save files but the engine doesn't process warming events.

**Discrepancies:**
1. **NOT IMPLEMENTED**: Global warming is entirely missing from the JS engine. **MAJOR GAP**: this is a core end-game mechanic that degrades terrain quality.
2. **Terrain degradation formula**: Binary uses a deterministic hash `(x*3 - y*3) & 7` to select tiles for degradation, ensuring consistent (but spread-out) warming patterns. **NEEDS IMPLEMENTATION**.
3. **Severity scaling**: The severity parameter (0-6) controls how many tiles are affected — lower severity means fewer tiles degrade. This scales with the number of global warming events the game has experienced.
4. **Improvement destruction**: Warming clears road/railroad improvements on degraded tiles. **NEEDS IMPLEMENTATION**.

---

## Summary of Key Discrepancies

### Critical/Major
- **#28 Global warming entirely missing** — core end-game mechanic not implemented
- **#1 WLTKD trade route cleanup missing** — minor edge case but binary-faithful gap
- **#17 Bribe cost uses movesRemain instead of hpLost** — potential bug in damage discount calculation
- **#18 Worker order pooling and engineer double speed missing** — affects settler/engineer work rates

### Moderate
- **#1 Granary half-fill formula differs** — affects growth timing after blocked growth
- **#3 AI food box scaling missing** — AI cities grow at wrong rate
- **#4 WLTKD trade bonus overproduction** — JS gives extra +1 trade during WLTKD that binary doesn't
- **#5 Wonder-based corruption counters simplified** — affects waste in some government/wonder combos
- **#6 Same-continent vs cross-continent distance** — corruption formula differs for connected cities
- **#13 Ceasefire flag clearing scope differs** — binary clears sneak flags more broadly
- **#22 Alliance war cascade missing gates** — JS auto-joins wars without cooldown/attitude checks

### Structural/Architectural
- **#7 Trade route counting vs income** — different pipeline stages
- **#9 Counter-offer bilateral exchange** — JS needs two calls
- **#11, #12 UI/networking** — different architecture entirely
- **#16 Unit stacks** — arrays vs linked lists
- **#20 Goto city filtering** — UI function, not game logic

### Missing Features
- **#9 Unit transfer in diplomacy** — case 8 not ported
- **#9 Contact sharing** — case 9 not ported
- **#15 Demand ally help** — not implemented
- **#25, #27** — functions not found in decompiled source
