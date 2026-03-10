# Civ2 JS Game Model

The canonical JavaScript representation for all game data. The parser converts `.sav` binary → this model. Everything downstream (engine, reducer, rules, client, WebSocket) speaks this model natively. There is no plan to export back to `.sav` format.

---

## Design Principles

1. **No byte-level encoding in JS** — bitmasks become Sets, arrays, or objects
2. **No derived/stale fields** — if it can be computed, compute it on demand via functions
3. **Immutable map vs mutable state** — the reducer only clones mutable state
4. **JSON-serializable** — the model must survive `JSON.stringify` / `JSON.parse` for WebSocket transport (Sets become arrays in transit, reconstructed on receipt)
5. **Parser is the only converter** — `.sav` → model happens once at load time

---

## Top-Level Structure

```js
{
  meta,       // file/session metadata
  settings,   // game rules, difficulty, toggles
  map,        // terrain, rivers, improvements — IMMUTABLE after load
  civs,       // per-civ state (8 slots, index 0 = barbarians)
  cities,     // all city records
  units,      // all unit records
  diplomacy,  // treaties, attitudes — separated for clarity
  wonders,    // wonder ownership
  technology, // tech discovery tracking
  turn,       // turn counter, active civ
  tail,       // miscellaneous data (kill history, passwords, etc.)
  events,     // scenario events (null if none)
}
```

---

## `meta` — File & Session Metadata

```js
meta: {
  sourceFormat: 'sav' | 'scn' | 'net' | 'new',  // how the game was created
  formatVersion: number,       // from header, e.g. 39
  isScenario: boolean,         // scenario flag from header

  // Multiplayer session fields (not from .sav — added by server)
  roomId: string | null,       // multiplayer room identifier
  sessionId: string | null,    // player session for reconnect
  seatCivMap: number[] | null, // maps lobby seat index → civ slot
  version: number,             // state version counter (incremented by reducer)
}
```

**From .sav**: `sourceFormat`, `formatVersion`, `isScenario`
**Not from .sav**: multiplayer fields — injected by server at game start
**Excluded from .sav**: `magic`, `nullSep`, `formatMarker` — file format plumbing, not game data

---

## `settings` — Game Rules & Configuration

```js
settings: {
  difficulty: number,          // 0-5 (Chieftain → Deity)
  barbarianActivity: number,   // 0-3
  mapRevealed: boolean,        // full map revealed (cheat/debug)

  // QUESTION: Do we need all 35 toggle flags in the JS game?
  // Most are UI preferences (sound, music, animation speed, grid display).
  // Some affect gameplay (bloodlust, flatEarth, simplifiedCombat).
  // Proposal: Keep gameplay-affecting ones as named fields,
  // store the rest in a `uiPreferences` sub-object for .sav fidelity.

  bloodlust: boolean,          // no diplomacy, conquest only
  simplifiedCombat: boolean,   // simplified combat resolution
  flatEarth: boolean,          // no horizontal wrapping

  // Scenario-specific
  scenarioNoTechLimits: boolean,

  // UI preferences — needed for faithful rendering but not game logic
  // QUESTION: Include these? They're per-player preferences, not shared state.
  // In multiplayer, each client would have their own. Store client-side only?
  uiPreferences: {
    showMapGrid: boolean,
    soundEffects: boolean,
    music: boolean,
    fastPieceSlide: boolean,
    showEnemyMoves: boolean,
    // ... remaining ~25 toggle flags
  },

  // COSMIC constants from RULES.TXT (affect game mechanics)
  // QUESTION: Should these be stored in the model or loaded from RULES.TXT?
  // For multiplayer, all players must agree on the same rules.
  // Proposal: Store them in the model so the server is authoritative.
  cosmic: {
    foodRows: number,            // food box rows (default 2 in MGE)
    shieldRows: number,          // shield box rows
    contentCitizensBase: number, // base content citizens (default 7)
    unhappyOffset: number,       // unhappy offset (default 14)
    techCostMultiplier: number,  // base tech cost factor
    movementMultiplier: number,  // movement thirds (always 3)
    // ... full 22 COSMIC constants from RULES.TXT
  },
}
```

**From .sav**: difficulty, barbarianActivity, mapRevealed, all toggles, COSMIC constants (from tail engine constants)
**Excluded**: `cheatMenu`, `cheatPenalty` — don't want cheats in multiplayer
**QUESTION**: The 97-byte `engineConstants` in the tail encode COSMIC values — should we parse them into named fields? Currently stored as raw bytes. The RULES.TXT values are the canonical source but the .sav may override them.

---

## `map` — Terrain & Geography (IMMUTABLE)

```js
map: {
  width: number,              // tile columns (gx range: 0 to width-1)
  height: number,             // tile rows (gy range: 0 to height-1)
  wraps: boolean,             // horizontal wrapping (derived from mapShape)
  shape: number,              // 0=flat, 1=round (raw value preserved)
  seed: number,               // resource placement seed

  // QUESTION: Store tiles as array-of-objects or parallel typed arrays?
  //
  // Option A: Array of objects (readable, easy to serialize)
  //   tiles: [{ terrain, river, improvements, ... }, ...]
  //
  // Option B: Parallel typed arrays (compact, fast iteration)
  //   terrain: Uint8Array, rivers: Uint8Array, ...
  //
  // Proposal: Option A for the model definition. If performance is an issue
  // with large maps (150×300 = 45,000 tiles), we can optimize later.
  // JSON serialization of Option A is ~2-3× larger but still <1MB for huge maps.

  tiles: [
    {
      terrain: number,         // 0-10: desert/plains/grass/forest/hills/mountains/tundra/glacier/swamp/jungle/ocean
      river: boolean,
      goodyHut: boolean,

      // QUESTION: Improvements — object vs Set vs array?
      //
      // Current binary: single byte, bits = road|railroad|irrigation|mining|fortress|pollution|farmland|airbase
      // Note: farmland = irrigation AND mining bits both set (special case)
      //
      // Option A: Object with boolean flags
      //   improvements: { road: true, railroad: false, irrigation: true, ... }
      //   Pro: readable, fast individual lookups
      //   Con: 8 fields, farmland is derived (irrigation && mining)
      //
      // Option B: Set of strings
      //   improvements: new Set(['road', 'irrigation'])
      //   Pro: compact when sparse (most tiles have 0-2 improvements)
      //   Con: Set not JSON-serializable (needs toJSON/fromJSON)
      //
      // Option C: Array of strings
      //   improvements: ['road', 'irrigation']
      //   Pro: JSON-serializable, compact
      //   Con: O(n) lookups, need .includes()
      //
      // Proposal: Option A (object). Tiles are read far more often than
      // written, and individual flag checks (if tile.road) are the most
      // common operation. Farmland stored as its own flag, separate from
      // irrigation/mining.

      improvements: {
        road: boolean,
        railroad: boolean,
        irrigation: boolean,
        mining: boolean,
        fortress: boolean,
        airbase: boolean,
        pollution: boolean,
        farmland: boolean,     // NOTE: in .sav this is irrigation+mining both set
      },

      // Per-civ exploration (persistent "has explored" flag)
      // QUESTION: Keep as a Set of civ slots, or an array of booleans?
      // This is mutated every time a unit moves (updateVisibility).
      // Currently: single byte, bit N = civ N has explored.
      //
      // Proposal: Set<number> — e.g. new Set([1, 3, 5]) means civs 1, 3, 5
      // have explored this tile. Easy to check: tile.exploredBy.has(civSlot).
      // Mutate: tile.exploredBy.add(civSlot).
      //
      // CONCERN: This is the one field that's mutated during gameplay on the
      // "immutable" map. In Civ2, exploration is persistent (once seen, always
      // on the minimap). We could move it to mutable state, but it's really
      // per-tile data. Keeping it on the tile but acknowledging it's mutable
      // seems pragmatic.
      //
      // PERFORMANCE: 45,000 tiles × Set overhead vs 45,000 bytes.
      // For multiplayer state updates, we'd send delta visibility anyway.
      // Sets become arrays in JSON: [1, 3, 5].

      exploredBy: Set<number>,   // civ slots that have explored this tile

      // Tile ownership & metadata
      owner: number | null,      // civ slot (1-7) or null if unowned
      fertility: number,         // AI fertility score 0-15
      bodyId: number,            // continent/body ID
      cityRadiusOwner: number | null,  // civ that claims this in a city radius, or null

      // QUESTION: What about the per-civ "known improvements" (Block 1)?
      // Each civ has its own view of what improvements exist on each tile
      // (fog of war for improvements). This is 7 × mapSize bytes.
      // Needed for: showing correct improvements under fog.
      //
      // Option A: Store on tile as knownImprovements: { [civSlot]: {...} }
      //   Con: 7 copies of improvement data per tile = huge
      // Option B: Separate sparse structure, only for tiles that differ
      //   Con: complex
      // Option C: Keep as parallel arrays (like current knownImprovements[civ][tileIdx])
      //   Pro: matches current implementation, compact
      //
      // Proposal: Keep as a separate top-level structure (not per-tile).
      // See map.knownImprovements below.
    },
    // ... one per tile (width × height entries)
  ],

  // Per-civ known improvements — what each civ last saw on each tile
  // Indexed as knownImprovements[civSlot][tileIndex]
  // QUESTION: Convert each byte to an improvements object like above?
  // That would be 7 × 45,000 objects for a large map. Might be excessive.
  // Proposal: Keep as raw byte arrays for now. Only the renderer reads them,
  // and only for fogged tiles. Convert to improvement objects lazily on read.
  knownImprovements: {
    [civSlot: number]: Uint8Array  // one byte per tile, same bitmask as .sav
  },

  // Quarter-resolution data (Block 3)
  // QUESTION: Is this needed for gameplay? It seems to be AI pathfinding data.
  // If we implement our own AI, we'd compute this ourselves.
  // Proposal: Store for .sav fidelity, mark as opaque/unused by JS engine.
  quarterData: Uint8Array | null,

  // Padding block (1024 bytes between Block 3 and units)
  // QUESTION: Exclude? It's always zeros in standard saves.
  // Proposal: Exclude from model. Only relevant for binary round-trip.
}
```

**From .sav**: All fields above. `wraps` derived from `mapShape !== 0`.
**Excluded**: `mw2` (doubled-X width) — internal coordinate system detail, derive as `width * 2`
**Excluded**: `ms` (mapSize) — derive as `width * height`
**Excluded**: `qw`, `qh` (quarter dims) — derive from quarterData length if needed

**Accessor functions** are NOT part of the model. They're created by `createAccessors(model.map)` and provide convenience lookups like `getTerrain(gx, gy)`, `getNeighbors(gx, gy)`, `wrap(x)`, etc. The model stores the data; the accessors compute from it.

---

## `civs` — Per-Civilization State

```js
civs: [
  // Index 0 = Barbarians, 1-7 = player civs
  {
    alive: boolean,            // derived from civsAlive bitmask
    isHuman: boolean,          // derived from humanPlayers bitmask
    everExisted: boolean,      // derived from civsEverExisted bitmask

    // Identity
    rulesCivNumber: number,    // 0-20, index into RULES.TXT/LEADERS.TXT
    civVariant: number,        // variant when multiple civs share rulesCivNumber
    style: number,             // city style 0-3 (European/Classical/Far Eastern/Middle Eastern)
    name: string,              // resolved display name (from LEADERS_TXT_NAMES or tribeName)
    leaderName: string,        // from civNameBlock
    gender: number,            // 0=male, 1=female
    tribeName: string,         // e.g. "Romans"
    tribeAdjective: string,    // e.g. "Roman"

    // Government titles (per government type)
    // QUESTION: Store all 7 titles? They're from the civ name block.
    // Only needed if we display "King Caesar" style titles.
    // Proposal: Store them — they're small and part of the civ identity.
    titles: {
      anarchy: string,
      despotism: string,
      monarchy: string,
      communism: string,
      fundamentalism: string,
      republic: string,
      democracy: string,
    },

    // Economy & government
    treasury: number,          // gold (signed int32, can go negative)
    government: number,        // 0-6: Anarchy/Despotism/Monarchy/Communism/Fundamentalism/Republic/Democracy
    scienceRate: number,       // 0-10 (each unit = 10%)
    taxRate: number,           // 0-10
    // QUESTION: luxuryRate is derived (10 - scienceRate - taxRate). Store it?
    // Proposal: Don't store — compute on read.

    // Research
    researchProgress: number,  // beakers accumulated toward current research
    techBeingResearched: number | null, // advance ID, or null if none (0xFF in .sav)
    acquiredTechCount: number, // total techs acquired
    futureTechCount: number,   // future tech count

    // AI personality
    aiRandomSeed: number,
    patience: number,          // negotiation patience 0-6
    reputation: number,        // diplomatic reputation 0-255
    treatyBreakingCount: number,
    personaIndex: number,      // AI persona: (rulesCivNumber % 7) + 7 * personality

    // State flags
    // QUESTION: Keep as individual booleans or group into a flags object?
    // These are from the stateFlags byte (+0 of civ data block).
    // Proposal: Individual booleans — there are only 5 decoded ones.
    skipNextOedoYear: boolean,
    atWar: boolean,
    senateOverride: boolean,
    recoveredFromRevolution: boolean,
    freeAdvancePending: boolean,

    // Position & history
    startingPosition: number,  // encoded starting position
    turnOfCityBuild: number,   // turn when first city was built (-1 if never)

    // Unit statistics (AUTHORITATIVE — cumulative, not runtime cache)
    unitCasualtyCounts: number[],  // losses per unit type (63 entries)

    // QUESTION: unitTypeEverBuilt — keep or derive?
    // It's a boolean[64] of whether each unit type was ever built.
    // Proposal: Keep — it's authoritative historical data, not derivable from current state.
    unitTypeEverBuilt: boolean[],  // per unit type

    // Spaceship
    spaceship: {
      structural: number,      // components built
      propulsion: number,      // max 8
      estimate1: number,       // score/year estimate
      estimate2: number,       // typically estimate1 - 427
    },

    // AI continent goals (64 entries)
    // QUESTION: Needed for JS game? Only relevant if we implement AI.
    // Proposal: Store for .sav fidelity. Skip in new-game initialization.
    continentGoals: [
      { x: number, y: number, goalType: number, priority: number },
      // ... 64 entries
    ] | null,

    // Per-continent statistics
    // QUESTION: These are mostly DERIVED (runtime counters). Exclude?
    // The authoritative ones are: continentStatusFlags, unitTypeEverBuilt.
    // Proposal: Exclude derived per-continent stats. Keep continentStatusFlags.
    continentStatusFlags: number[] | null,  // 63 entries, per-continent

    // Last contact turns (7 entries, one per other civ)
    lastContactTurns: number[],

    // ── DERIVED FIELDS — EXCLUDED ──
    // These are runtime caches in the .sav, recomputable from current state:
    //   militaryUnitCount, cityCount, navalUnitCount, sumOfCitySizes,
    //   totalUnitAtkDefSum, totalUnitAtkSum, activeUnitCounts,
    //   unitsInProduction, all per-continent military/city/size counters,
    //   powerGraphData
    //
    // If the JS game needs these, compute them on demand from units/cities arrays.

    // ── UNKNOWN FIELDS — STORED AS RAW FOR .SAV FIDELITY ──
    // QUESTION: Include unknown bytes for round-trip? We said no .sav export.
    // Proposal: Exclude unknown bytes entirely. If we discover their purpose
    // later, we add named fields then.
    //   unknown_18, unknown_23_26, diplomaticInteractionCounters_80_87
  },
  // ... 8 entries (indices 0-7)
]
```

**From .sav**: All authoritative fields listed above
**Excluded — Derived**: militaryUnitCount, cityCount, navalUnitCount, sumOfCitySizes, totalUnitAtkDefSum, totalUnitAtkSum, activeUnitCounts, unitsInProduction, per-continent military stats, powerGraphData
**Excluded — Unknown**: bytes +18, +23-26, +80-87 (purpose unclear)
**Excluded — Padding**: all known-zero padding bytes

---

## `cities` — City Records

```js
cities: [
  {
    // Identity & location
    name: string,              // city name (max 15 chars)
    owner: number,             // civ slot 0-7
    originalOwner: number,     // founding civ slot
    gx: number,                // grid X
    gy: number,                // grid Y
    size: number,              // population (1-63)
    style: number,             // city style 0-3 (from civ)

    // Worker tile assignments
    // QUESTION RESOLVED: Use plain array instead of bitmasks.
    // Array of tile indices (0-19) that are actively worked.
    // Center tile (index 20) is ALWAYS worked and not listed here.
    // Max length = city.size (all citizens working tiles, no specialists).
    workedTiles: number[],     // e.g. [0, 3, 5, 7, 12]

    // Specialists
    // QUESTION RESOLVED: Use plain array instead of packed 2-bit bytes.
    // Ordered list of specialist types. Length = city.size - workedTiles.length.
    // QUESTION: Use strings or numbers for specialist types?
    //   Strings: ['entertainer', 'taxman', 'scientist'] — readable
    //   Numbers: [1, 2, 3] — compact, matches .sav encoding
    // Proposal: Strings. This is the JS model — readability wins.
    // The enum is tiny (3 values) and unlikely to change.
    specialists: ('entertainer' | 'taxman' | 'scientist')[],
    // Invariant: workedTiles.length + specialists.length === size

    // Buildings
    // QUESTION: How to represent the building bitmask (40 bits across 5 bytes)?
    //
    // Option A: Set<number> — building IDs (1-indexed, RULES.TXT order)
    //   buildings: new Set([1, 5, 9, 10])  // Palace, Marketplace, City Walls, Bank
    //   Pro: fast has() check, easy add/delete
    //   Con: Set not JSON-serializable without custom handling
    //
    // Option B: Set<string> — building names
    //   buildings: new Set(['palace', 'marketplace', 'city_walls'])
    //   Pro: very readable
    //   Con: need name→ID lookup for game formulas, string matching
    //
    // Option C: Array<number> — building IDs
    //   buildings: [1, 5, 9, 10]
    //   Pro: JSON-serializable, simple
    //   Con: O(n) lookups with .includes()
    //
    // Option D: Object<number, boolean> — sparse map
    //   buildings: { 1: true, 5: true, 9: true }
    //   Pro: O(1) lookup, JSON-safe
    //   Con: keys are strings in JS objects
    //
    // Proposal: Set<number> for in-memory use, serialize as Array<number>
    // for WebSocket. Building IDs are stable (RULES.TXT order) and all game
    // formulas already use numeric IDs. Names are for display only (look up
    // from BUILDING_NAMES[id]).
    buildings: Set<number>,    // building IDs present (1-indexed)

    // Storage
    foodInBox: number,         // food accumulated
    shieldsInBox: number,      // shields toward current production

    // Production
    // QUESTION: How to represent the production item?
    // In .sav: single byte, units 0x00-0x3F, buildings = 256 - value.
    // Proposal: Object with type discrimination.
    producing: {
      type: 'unit' | 'building' | 'wonder',
      id: number,              // unit type ID or building/wonder ID
    },

    // Trade routes
    tradeRoutes: [
      {
        partnerCityIndex: number,  // index into cities array
        commodity: number,         // commodity ID being traded
      },
      // ... 0-3 entries
    ],

    // City attributes (boolean flags)
    weLoveKingDay: boolean,
    civilDisorder: boolean,
    canBuildCoastal: boolean,
    canBuildHydro: boolean,
    canBuildShips: boolean,
    autoBuild: boolean,
    autoBuildDomestic: boolean,
    autoBuildMilitary: boolean,
    techStolen: boolean,
    improvementSold: boolean,  // an improvement was sold this turn
    turnsSinceCapture: number, // 0 if never captured

    // Scenario objective flags
    objectiveX1: boolean,
    objectiveX3: boolean,

    // Per-civ believed size (fog of war — what each civ thinks the size is)
    // QUESTION: Needed for multiplayer? The server filters state per-civ anyway.
    // Proposal: Include for .sav fidelity. In multiplayer, the server sends
    // each client only the believed size for their civ, not the real one.
    believedSize: number[],    // 8 entries (one per civ slot)

    // Known to which civs
    knownTo: Set<number>,      // civ slots that know about this city

    // ── DERIVED FIELDS — EXCLUDED ──
    // Not stored in model. Computed on demand by game functions:
    //   netBaseTrade, totalTrade, scienceOutput, taxOutput,
    //   foodProduction, shieldProduction, happyCitizens, unhappyCitizens,
    //   tradeCommoditiesAvail, tradeCommoditiesDemand
    //
    // These are the ~50% of city fields that are runtime caches in .sav.
    // The city dialog already recomputes trade/corruption/happiness.

    // ── CONVENIENCE FIELDS — COMPUTED, NOT STORED ──
    // These can be derived but are used so often they might warrant caching:
    //   hasPalace: buildings.has(1)
    //   hasWalls: buildings.has(8)
    //   isOccupied: owner !== originalOwner
    // Proposal: Don't store. Use buildings.has() directly. It's O(1) on a Set.
  },
  // ... one per city
]
```

**From .sav**: All authoritative fields. Bitmasks converted at parser boundary.
**Excluded — Derived**: netBaseTrade, totalTrade, scienceOutput, taxOutput, foodProduction, shieldProduction, happyCitizens, unhappyCitizens, tradeCommoditiesAvail, tradeCommoditiesDemand
**Excluded — Internal**: sequenceId (save-file internal), specialistCountRaw (redundant with specialists array), raw coordinate cx/cy (use gx/gy)

---

## `units` — Unit Records

```js
units: [
  {
    // Identity & position
    type: number,              // 0-62 (indexes UNIT_NAMES)
    owner: number,             // civ slot 0-7
    gx: number,                // grid X (-1 if dead)
    gy: number,                // grid Y (-1 if dead)
    alive: boolean,            // true if alive and on map
    veteran: boolean,

    // Movement
    movesLeft: number,         // movement points remaining (in thirds)

    // QUESTION: Movement flags — expand from bitmask to individual booleans?
    // Only 3 flags decoded: firstMoved, paraLaunched, immobile
    // Proposal: Individual booleans. Only 3 of them.
    hasMoved: boolean,         // has moved this turn
    paradropLaunched: boolean,
    immobile: boolean,

    // Status & orders
    // QUESTION: orders — number or string?
    //   Number: 0-11 (indexes ORDER_NAMES)
    //   String: 'none' | 'fortifying' | 'fortified' | 'sleep' | 'buildFortress' | ...
    // Proposal: String. The order set is small (12 values), stable, and
    // strings make conditionals readable: if (unit.orders === 'fortified')
    // vs if (unit.orders === 2)
    orders: 'none' | 'fortifying' | 'fortified' | 'sleep' |
            'buildFortress' | 'buildRoad' | 'buildIrrigation' |
            'buildMine' | 'buildAirbase' | 'goTo' |
            'noOrders' | 'buildRailroad',

    automated: boolean,
    waiting: boolean,

    // Combat
    hpLost: number,            // damage taken (subtract from unit type's max HP)

    // Navigation & AI
    lastDirection: number | null,  // 0-7 or null if never moved
    homeCity: number | null,   // index into cities array, or null
    gotoX: number | null,      // goto destination gx, or null
    gotoY: number | null,      // goto destination gy, or null

    // Context-dependent cargo field
    // QUESTION: This byte means different things for different unit types:
    //   Caravan/Freight: commodity ID being carried
    //   Settler/Engineer: work turns accumulated
    //   Air units: fuel remaining
    //   Transport/Carrier: cargo count
    // Proposal: Store as a generic number with a semantic alias function,
    // or split into named fields based on unit domain/type?
    //
    // Option A: Single field, interpret based on type
    //   cargo: number
    //
    // Option B: Named fields, only one populated
    //   commodity: number | null     // caravans/freight
    //   workProgress: number | null  // settlers/engineers
    //   fuel: number | null          // air units
    //   cargoCount: number | null    // transports/carriers
    //
    // Proposal: Option A. The parser already stores it as cargoWorkFuel.
    // Type-specific interpretation belongs in display/game logic, not the model.
    // A helper function unitCargo(unit) can return the right interpretation.
    cargo: number,

    // AI
    aiTaskRole: number,        // AI task assignment

    // Visibility
    // QUESTION: visFlag byte — which civs can see this unit.
    // Similar to tile exploration but for units.
    // Proposal: Set<number> like tile.exploredBy.
    visibleTo: Set<number>,    // civ slots that can see this unit

    // Stack pointers
    // QUESTION: Keep linked list pointers or derive stacking from position?
    // In .sav: prevInStack/nextInStack form a linked list of units on same tile.
    // In JS: we can just filter units by (gx, gy) to find co-located units.
    // The linked list order only matters for "top unit" display and iteration.
    //
    // Proposal: Exclude stack pointers. Derive stacking from position.
    // The .sav linked list order is not semantically meaningful beyond display.
    // If we need a "top unit" concept, sort by type or use array order.

    // ── EXCLUDED FROM .SAV ──
    // prevInStack, nextInStack — derive from position
    // sequenceId — save-file internal
    // saveIndex — save-file internal (kept in a separate lookup if needed)
    // raw x/y coordinates — use gx/gy
    // padding bytes
  },
  // ... one per unit (including dead units with alive=false)
]
```

**QUESTION — Dead units**: The .sav keeps dead unit slots for reuse. In the JS model, do we:
- (A) Keep dead units in the array (preserves indices for homeCity references) — current approach
- (B) Filter to alive only, use a separate ID system for references
- Proposal: (A) for .sav imports. For new games, we can use a different allocation strategy. The array indices are used as IDs in homeCity, unitIndex actions, etc.

---

## `diplomacy` — Treaties & Relations

```js
diplomacy: {
  // Per civ-pair relationships
  // Indexed as relations[civA][civB]
  // QUESTION: Flatten to a single array of pair objects, or keep as 2D?
  // Proposal: 2D — matches the mental model and the .sav layout.
  // relations[1][3] = what civ 1 thinks of civ 3.
  // Note: not symmetric — civ 1's attitude toward 3 ≠ civ 3's attitude toward 1.

  relations: [
    // Index = source civ (0-7)
    [
      // Index = target civ (0-7, including self)
      {
        // Treaty status — currently active treaties
        // QUESTION: Set<string> or individual booleans?
        // There are ~7 treaty flags. Individual booleans are more explicit.
        contact: boolean,
        ceaseFire: boolean,
        peace: boolean,
        alliance: boolean,
        war: boolean,
        vendetta: boolean,
        embassy: boolean,

        // Historical flags (things that happened)
        hatred: boolean,         // spaceship-related hatred
        nukeTalk: boolean,       // discussed nukes
        attacked: boolean,       // attacked their unit
        recentPeace: boolean,    // recently signed peace
        cityCapture: boolean,    // captured their city
        weNukedThem: boolean,    // used nukes on them
        tribute: boolean,        // accepted tribute

        // Attitude (0-100, higher = more favorable)
        attitude: number,

        // Treaty violation tracker (signed: negative = we broke, positive = they broke)
        treatyViolations: number,
      },
      // ... 8 entries per source civ
    ],
    // ... 8 source civs
  ],

  // Global peace counter
  turnsOfPeace: number,
}
```

**From .sav**: treaties (+32-63), attitudes (+64-71), treatyViolations (+72-79), turnsOfPeace
**Excluded**: diplomaticInteractionCounters (+80-87) — unknown purpose
**Excluded**: unknown bytes +23-26 — unclear diplomatic counters

---

## `wonders` — World Wonders

```js
wonders: [
  // 28 entries (indexed by wonder ID, 0-27)
  {
    id: number,                // wonder ID (for display name lookup)
    cityIndex: number | null,  // index into cities array, or null if not built
    destroyed: boolean,        // wonder was built but then destroyed
    // QUESTION: Store owner explicitly or derive from cities[cityIndex].owner?
    // Proposal: Derive — it's always cities[cityIndex].owner.
    // If cityIndex is null, there is no owner.
  },
  // ... 28 entries
]
```

**From .sav**: wonderCityIds (28 × uint16). 0xFFFF → not built (cityIndex: null, destroyed: false). 0xFFEF → destroyed (cityIndex: null, destroyed: true). Otherwise → cityIndex = value.

---

## `technology` — Tech Discovery State

```js
technology: {
  // Per-advance tracking
  // QUESTION: How many advances? Standard Civ2 has 89 + 11 unused = 100 slots.
  // The parser reads 100 bytes for firstDiscoverer and 100 bits for per-civ masks.
  // Proposal: Use 100 entries for .sav compat, only 89 are real advances.

  advances: [
    // Index = advance ID (0-99)
    {
      firstDiscoveredBy: number | null,  // civ slot (1-7) or null if undiscovered
      discoveredBy: Set<number>,         // set of civ slots that have this tech
    },
    // ... 100 entries
  ],

  // Per-civ tech sets (convenience view, derived from advances above)
  // QUESTION: Store per-civ tech sets redundantly, or always derive from advances?
  // The parser currently provides civTechs[civSlot] = Set<advanceId>.
  // It's used for era calculation, building prerequisites, etc.
  //
  // Proposal: Don't store redundantly. Provide a helper function:
  //   getTechsForCiv(technology, civSlot) → Set<number>
  // This avoids dual bookkeeping. The advances array is the single source of truth.
  //
  // COUNTER-ARGUMENT: civTechs is accessed very frequently (every city render,
  // every build check). Rebuilding the Set each time is O(100).
  // Compromise: cache it, invalidate on tech change. But not stored in model.

  // Per-civ tech counts (for era calculation)
  // Same argument as above — derive from advances, cache if needed.
  // QUESTION: The parser counts only the first 89 advances (not all 100).
  // This is correct — advances 89-99 are unused padding.
}
```

**From .sav**: firstDiscoverer[100] at +0x42, techDiscoveryBitmask[100] at +0xA6
**Excluded — Redundant**: civTechCounts, civTechs — derive from advances array

---

## `turn` — Turn State

```js
turn: {
  number: number,             // current turn number (0-based)
  activeCiv: number,          // civ slot whose turn it is (1-7)
  year: number | null,        // computed from turn number via year formula, or null

  // QUESTION: Store humanPlayers bitmask here or on each civ?
  // Currently it's a top-level bitmask. In the model, each civ has isHuman.
  // For the turn system, we need to know which civs are human to determine
  // whether to wait for input or auto-play AI turns.
  // Proposal: Already on civs[i].isHuman. Don't duplicate here.

  // .sav fields related to turn
  selectedUnit: number | null, // currently selected unit index, or null

  // QUESTION: Is playerCiv (the human player's civ slot) per-session or per-game?
  // In single-player, there's one human. In multiplayer, multiple humans.
  // Proposal: playerCiv is per-session (the local player's civ), stored in meta.
  // The model's turn.activeCiv tells whose turn it is globally.
}
```

**From .sav**: turnsPassed (+0x1C), activeHumanPlayer (+0x27), selectedUnit (+0x22), playerCiv (+0x29)

---

## `tail` — Miscellaneous Persistent Data

```js
tail: {
  // City naming counters (21 entries, one per standard civ rulesCivNumber)
  cityNameCounters: [
    { citiesBuilt: number },   // how many cities this civ type has ever built
    // ... 21 entries
  ],

  // Cursor/viewport position (for restoring view on load)
  cursorPosition: { x: number, y: number },

  // Per-civ passwords (multiplayer .sav feature)
  // QUESTION: Include? Passwords are for the original Civ2 hotseat multiplayer.
  // Our multiplayer uses WebSocket sessions, not passwords.
  // Proposal: Store for .sav fidelity. Exclude from new-game initialization.
  passwords: Uint8Array[] | null,  // 7 entries of 32 bytes each

  // Kill history
  killHistory: {
    count: number,
    entries: [
      {
        turn: number,            // turn the elimination happened
        killerCiv: number,       // civ slot of the killer
        destroyedCivRulesId: number, // rulesCivNumber + 21*generation
        destroyedCivName: string,
      },
      // ... up to 12 entries
    ],
  },

  // Scenario block (only present in scenario saves)
  scenario: {
    name: string,
    rawBlock: Uint8Array,      // full 100 bytes for fields we haven't decoded
  } | null,

  // Engine constants (97 bytes — encodes COSMIC values)
  // QUESTION: Parse into settings.cosmic or keep raw?
  // Proposal: Parse into settings.cosmic. The raw bytes aren't useful in JS.
  // If some constants aren't yet mapped, store remainder as raw.
  engineConstantsRaw: Uint8Array | null,

  // Fixed constants (7 bytes — validation sentinel)
  fixedConstants: Uint8Array | null,
  fixedConstantsValid: boolean,

  // Power graph / history data
  // QUESTION: Large block (~1221 bytes) of partially decoded data.
  // Contains historical power rankings, demographics over time.
  // Needed for: replay graphs, demographics screen.
  // Proposal: Store raw for now. Decode incrementally as we build features.
  historyData: Uint8Array | null,

  // Network data (NET files only)
  networkData: Uint8Array | null,
}
```

---

## `events` — Scenario Events

```js
events: {
  records: [
    {
      triggers: Set<string>,   // e.g. new Set(['turn', 'unitKilled'])
      actions: Set<string>,    // e.g. new Set(['text', 'createUnit', 'justOnce'])
      params: Uint8Array,      // 290 raw parameter bytes (event-type-specific)
      // QUESTION: Decode params into typed fields per trigger/action combo?
      // There are dozens of combinations. The event system is complex.
      // Proposal: Keep params raw for now. Decode when we implement the
      // scenario event engine. Triggers and actions as string Sets are enough
      // for filtering and display.
    },
    // ... one per event
  ],
  strings: string[],           // text messages, filenames referenced by events
} | null  // null if no events section found
```

---

## `gapRecord` — Inter-Section Data

```js
// QUESTION: The 32-byte gap record between cities and tail is poorly understood.
// It may contain cursor state, last-action metadata, or AI scratch data.
// Proposal: Store raw for .sav fidelity. Exclude from new-game initialization.
// If we discover its purpose, promote fields to named properties.
gapRecord: Uint8Array | null   // 32 bytes, or null for new games
```

---

## Serialization for WebSocket

The model must survive JSON round-trip for multiplayer state sync. Fields that need special handling:

| Type | Serialize | Deserialize |
|------|-----------|-------------|
| `Set<number>` | `[...set]` (array) | `new Set(arr)` |
| `Set<string>` | `[...set]` (array) | `new Set(arr)` |
| `Uint8Array` | `Array.from(arr)` or base64 | `new Uint8Array(arr)` |

**QUESTION**: Should we use a custom `toJSON`/`fromJSON` on the model, or handle conversion at the transport boundary?
**Proposal**: Handle at transport boundary. The model uses native JS types (Set, Uint8Array). Two small functions — `serializeState(model)` and `deserializeState(json)` — handle the conversion. This keeps the model clean and the serialization logic centralized.

**Payload size considerations**:
- Current GAME_START is ~325KB for a 40×50 map with binary-encoded fields
- Converting bitmasks to arrays/objects will increase size ~2-3×
- A 150×300 map (45K tiles) with improvement objects per tile: ~5-10MB
- QUESTION: Is this acceptable? WebSocket can handle it, but initial load time matters.
- Mitigation: Send map tiles as compact arrays on initial load, expand on client.
  Or compress with standard algorithms (the data compresses well).

---

## What's NOT in the Model (and why)

| Excluded Data | Reason |
|---------------|--------|
| Raw binary offsets (cx, cy, x, y) | Use gx/gy only — derived coordinates |
| Unit sequenceId | Save-file internal indexing |
| City sequenceId | Save-file internal indexing |
| Unit stack pointers (prev/next) | Derive stacking from position |
| Derived city fields (50% of city record) | Recompute on demand |
| Derived civ demographics | Recompute from units/cities |
| mw2 (doubled width) | Derive as width × 2 |
| ms (map size) | Derive as width × height |
| File magic, format markers | File plumbing, not game data |
| All known-zero padding bytes | No information content |
| Unknown/undecoded bytes | No known purpose; add when decoded |

---

## Open Questions Summary

1. **Tile improvements representation** — object with boolean flags vs Set vs array? (Proposed: object)
2. **Tile storage** — array of objects vs parallel typed arrays? (Proposed: array of objects)
3. **Building representation** — Set\<number\> vs Set\<string\> vs array? (Proposed: Set\<number\>)
4. **Unit orders** — string vs number? (Proposed: string)
5. **Specialist types** — string vs number? (Proposed: string)
6. **COSMIC constants** — parse from engine constants or load from RULES.TXT? (Proposed: parse and store in model)
7. **UI preferences** — in shared model or client-only? (Proposed: client-only for multiplayer, in model for .sav fidelity)
8. **Dead units** — keep in array or filter out? (Proposed: keep for index stability)
9. **Per-civ knownImprovements** — convert bytes to objects or keep raw? (Proposed: keep raw, convert lazily)
10. **Payload size** — acceptable for large maps? (Proposed: compress or use compact initial format)
11. **exploredBy on tiles** — mutable field on "immutable" map data? (Proposed: acknowledge mutation, keep on tile)
12. **Redundant tech views** — store civTechs per-civ or derive from advances? (Proposed: derive, cache separately)
13. **Cargo field semantics** — single generic field or type-specific named fields? (Proposed: single generic field)

---

## Migration Plan (High-Level)

### Phase 1: Workers & Specialists (smallest scope)
- Convert parser output for worker bitmasks → `workedTiles: number[]`
- Convert specialist packed bytes → `specialists: string[]`
- Update: reducer, rules, city dialog, app.js handleWorkerChange
- All downstream code uses arrays/strings instead of bit manipulation

### Phase 2: Buildings
- Convert parser output for building bitmasks → `buildings: Set<number>`
- Update: city dialog (building checks), happiness calc, trade calc, production
- ~30 callsites using `buildings & (1 << N)`

### Phase 3: Unit Fields
- Convert orders byte → string enum
- Convert movement/status flag bytes → individual booleans
- Convert visFlag → `visibleTo: Set<number>`
- Exclude stack pointers
- Update: renderer, tooltip, events, reducer

### Phase 4: Tile Improvements
- Convert improvement byte → improvement object
- This is the largest change (~50+ callsites in renderer, city dialog, movement, etc.)
- Update: renderer, city dialog resource map, movement cost calc, tooltip, all getImprovements() callers

### Phase 5: Diplomacy, Wonders, Technology
- Restructure into dedicated top-level objects
- Convert treaty bitmasks → boolean flags
- Convert wonder cityIds → objects
- Convert tech bitmasks → Set-based structure

### Phase 6: Map Visibility
- Convert tile visibility byte → `exploredBy: Set<number>`
- Update: updateVisibility, FOW rendering, filterStateForCiv

### Phase 7: Settings & Remaining Fields
- Parse toggle bytes → named boolean fields
- Parse COSMIC constants from engine constants
- Structure tail data
- Clean up meta fields

Each phase is independently deployable. Earlier phases don't depend on later ones. The parser gains a conversion layer that can be enabled per-section, allowing gradual migration.
