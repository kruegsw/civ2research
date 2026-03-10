# Civ2 JS Game Model

The canonical JavaScript representation for all game data. The parser converts `.sav` binary → this model. Everything downstream (engine, reducer, rules, client, WebSocket) speaks this model natively. There is no plan to export back to `.sav` format.

---

## Design Principles

1. **No byte-level encoding in JS** — bitmasks become Sets, arrays, or objects
2. **No derived/stale fields** — if it can be computed, compute it on demand via functions
3. **Data-driven defaults with overrides** — engine rules live in code (`engine/defs.js`); the model only stores overrides (null = use engine default)
4. **JSON-serializable** — the model must survive `JSON.stringify` / `JSON.parse` for WebSocket transport (Sets become arrays in transit, reconstructed on receipt)
5. **Parser is the only converter** — `.sav` → model happens once at load time
6. **Excluded .sav fields are documented in parser** — comments explain what was skipped and why
7. **Append-only arrays for entities** — units and cities arrays never reorder or compact. Dead/destroyed entries remain as slots (`alive: false` or equivalent). This guarantees index stability for cross-references (`homeCity`, `partnerCityIndex`, `unitIndex` in actions, `wonders[i].cityIndex`). Array index = entity ID throughout the model.
8. **Strings for small enums, numbers for large catalogs** — Small fixed sets (≤~12 values) used in display and conditionals become strings for readability (`government: 'democracy'`, `gender: 'male'`). Large catalogs (unit types, buildings, techs, wonders — 28-89 values) stay numeric IDs for performance; display names live in `defs.js` lookup arrays (`UNIT_NAMES[type]`, `BUILDING_NAMES[id]`, etc.). When in doubt, prefer numbers — they're faster and mod-safe.

---

## Top-Level Structure

```js
{
  meta,        // file/session metadata, cursor position
  settings,    // difficulty, barbarian activity, COSMIC overrides, city name overrides
  map,         // terrain, rivers, improvements (mutable — terraforming changes it)
  civs,        // per-civ state (8 slots, index 0 = barbarians)
  cities,      // all city records
  units,       // all unit records
  diplomacy,   // treaties, attitudes (separate from civs — civ×civ matrix)
  wonders,     // wonder ownership
  technology,  // tech discovery tracking
  turn,        // turn counter, active civ
  history,     // kill history, power graph, game replay data
  events,      // scenario events + scenario metadata (null if none)
}
```

### Decisions Made

- **`diplomacy`** stays separate from `civs` — it's a civ×civ matrix, awkward to nest inside a single civ
- **`wonders`** and **`technology`** stay separate — wonders are about city ownership, technology is about discovery tracking
- **`events`** stays top-level — scenario events actively affect gameplay
- **`map`** is mutable (terraforming, pollution, global warming change terrain) but kept as a separate section
- **`rules`** merged into **`settings`** — all configuration/customization in one place
- **`tail`** eliminated — all data redistributed to appropriate sections or excluded
- **`history`** added — kill history, power graph, game replay (new top-level section)

### Tail Data Redistribution

All `.sav` tail data has been redistributed or excluded:

| # | Tail Data | Origin | Destination | Notes |
|---|-----------|--------|-------------|-------|
| 1 | City name counters (21 entries) | Counter is runtime state in .sav tail; name lists from RULES.TXT | `civs[i].cityNameCounter` + `settings.cityNameOverrides` | Engine defaults in `defs.js`, overrides in settings (null = default) |
| 2 | Cursor/viewport position | Runtime UI state in .sav tail | `meta.cursorPosition` | Useful for restoring viewport on .sav load; ignored in multiplayer |
| 3 | Passwords (7 × 32 bytes) | Entered by players in hotseat mode, stored in .sav tail | **Excluded** | Hotseat feature — our auth is WebSocket sessions. Documented in parser |
| 4 | Kill history (up to 12 entries) | Runtime state accumulated during gameplay, stored in .sav tail | `history.kills` | Who eliminated whom and when — displayed in Hall of Fame / replay |
| 5 | Scenario block (100 bytes) | .scn file metadata, copied into .sav tail on save | `events.scenario` | Scenario name, objective flags — lives with scenario events |
| 6 | COSMIC constants (22 values, 97 bytes) | RULES.TXT `@COSMIC` section, copied into .sav tail at game creation | `settings.cosmic` | Null override pattern — engine defaults in code, overrides in model |
| 7 | Fixed constants (7 bytes) | Hardcoded in Civ2.exe, always `[0xAB,0x05,0x46,0x03,0x01,0x00,0x03]` | **Excluded** | Validation sentinel only — not game data. Documented in parser |
| 8 | Power graph / history data (~1221 bytes) | Runtime state accumulated each turn by engine, stored in .sav tail | `history.powerGraphRaw` | Demographics and power rankings over time — for replay/graphs |
| 9 | Network data (1172 bytes, .net only) | Original Civ2 LAN multiplayer protocol state in .net file tail | **Excluded** | Irrelevant to our WebSocket multiplayer. Documented in parser |

---

## `meta` — File & Session Metadata

```js
meta: {
  sourceFormat: 'sav' | 'scn' | 'net' | 'new',  // how the game was created
  formatVersion: number,       // from header, e.g. 39
  isScenario: boolean,         // scenario flag from header
  cursorPosition: { x: number, y: number },  // viewport restore position (from .sav tail)

  // Multiplayer session fields (not from .sav — added by server)
  roomId: string | null,       // multiplayer room identifier
  sessionId: string | null,    // player session for reconnect
  seatCivMap: number[] | null, // maps lobby seat index → civ slot
  version: number,             // state version counter (incremented by reducer)
}
```

**From .sav**: `sourceFormat`, `formatVersion`, `isScenario`, `cursorPosition`
**Not from .sav**: multiplayer fields — injected by server at game start
**Excluded from .sav**: `magic`, `nullSep`, `formatMarker` — file format plumbing, not game data

---

## `settings` — Game Configuration & Rule Overrides

All configuration in one place. Null override pattern: engine defaults live in `engine/defs.js`, settings only stores what differs from defaults.

```js
settings: {
  difficulty: 'chieftain' | 'warlord' | 'prince' | 'king' | 'emperor' | 'deity',
  barbarianActivity: 'none' | 'roaming' | 'restless' | 'raging',
  mapRevealed: boolean,        // full map revealed (cheat/debug)

  // Gameplay-affecting flags
  bloodlust: boolean,          // no diplomacy, conquest only
  simplifiedCombat: boolean,   // simplified combat resolution
  flatEarth: boolean,          // no horizontal wrapping

  // Scenario-specific
  scenarioNoTechLimits: boolean,

  // UI preferences (showMapGrid, soundEffects, music, fastPieceSlide, etc.)
  // are EXCLUDED from the shared game model. In multiplayer, each player has
  // their own preferences — these are per-client state stored in localStorage,
  // not shared game state. The .sav toggle flags (~25 UI preferences) are
  // parsed by the parser but not carried into the model. Only gameplay-affecting
  // flags (bloodlust, simplifiedCombat, flatEarth, scenarioNoTechLimits) are
  // stored above.

  // COSMIC rule overrides — null = use engine default from defs.js
  cosmic: {
    foodBoxMultiplier: number | null,      // default: 2
    shieldBoxMultiplier: number | null,    // default: 2
    contentCitizensBase: number | null,    // default: 7
    unhappyOffset: number | null,          // default: 14
    techCostMultiplier: number | null,     // default: varies by difficulty
    movementMultiplier: number | null,     // default: 3
    // ... remaining COSMIC constants (22 total)
  },

  // City name overrides — null = use engine default lists from defs.js
  cityNameOverrides: {
    [rulesCivNumber: number]: string[] | null
  } | null,
}
```

**From .sav**: difficulty, barbarianActivity, mapRevealed, gameplay toggles, COSMIC constants (parsed from tail engine constants)
**Excluded**: `cheatMenu`, `cheatPenalty` — don't want cheats in multiplayer. Documented in parser.

---

## `map` — Terrain & Geography

Mutable — terrain changes via terraforming, pollution, global warming, nukes, scenario events. Kept as a separate section because it's conceptually distinct from units/cities.

```js
map: {
  width: number,              // tile columns (gx range: 0 to width-1)
  height: number,             // tile rows (gy range: 0 to height-1)
  wraps: boolean,             // horizontal wrapping (derived from settings.flatEarth)
  seed: number,               // resource placement seed

  // Array of objects (readable, easy to serialize). If performance is an issue
  // with large maps (150×300 = 45,000 tiles), we can optimize to parallel typed
  // arrays later. JSON serialization is ~2-3× larger but still <1MB for huge maps.
  // (See Open Question #2)
  tiles: [
    {
      terrain: number,         // 0-10: desert/plains/grass/forest/hills/mountains/tundra/glacier/swamp/jungle/ocean
      river: boolean,
      goodyHut: boolean,        // consumed when a unit enters the tile
      resourceSuppressed: boolean, // if true, no special resource even if seed formula says so

      // Improvement flags — object with booleans (Resolved Q1).
      // Tiles are read far more often than written; `if (tile.improvements.road)`
      // is the most common operation. Farmland is its own flag (not derived from
      // irrigation+mining like in .sav).
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

      // Tile ownership & metadata
      owner: number | null,      // civ slot (1-7) or null if unowned
      fertility: number,         // AI fertility score 0-15
      bodyId: number,            // continent/body ID
      cityRadiusOwner: number | null,  // civ that claims this in a city radius, or null

      // Per-civ known improvements stored separately — see map.knownImprovements below.
    },
    // ... one per tile (width × height entries)
  ],

  // Per-civ known improvements — what each civ last saw on each tile.
  // This is fog-of-war memory: when civ 3 last saw tile (5,12), it had a road.
  // If civ 1 later builds irrigation there, civ 3 still sees just a road until
  // they re-explore. Converted up front from raw bytes to improvement objects
  // at parse time (consistent with "no byte logic in JS" principle).
  // 7 civs × mapSize objects — ~315K objects for a large map, <100ms to create.
  knownImprovements: {
    [civSlot: number]: [      // civ slots 1-7 (barbarians have no fog memory)
      // indexed by tile index (width × height entries)
      { road: boolean, railroad: boolean, irrigation: boolean, mining: boolean,
        fortress: boolean, airbase: boolean, pollution: boolean, farmland: boolean },
    ]
  },

  // Per-civ exploration state — which tiles each civ has ever seen.
  // Persistent (once explored, stays explored). Distinct from transient LOS
  // which is a server-side cache (see Visibility Architecture section).
  explored: {
    [civSlot: number]: Set<tileIndex>,  // civ slots 1-7
  },

  // Quarter-resolution data (Block 3) — EXCLUDED
  // Opaque AI pathfinding data from the .sav. If we implement AI, we'd compute
  // our own. Excluded from model; documented in parser why it's skipped.
}
```

**From .sav**: All fields above. `wraps` derived from `!settings.flatEarth`. `mapShape` from .sav is consumed by settings.flatEarth and not stored separately.
**Excluded**: `mw2` (doubled-X width) — derive as `width * 2`. Documented in parser.
**Excluded**: `ms` (mapSize) — derive as `width * height`. Documented in parser.
**Excluded**: `qw`, `qh` (quarter dims) — derive from quarterData length if needed. Documented in parser.
**Excluded**: 1024-byte padding block — always zeros, only relevant for binary round-trip. Documented in parser.

**Exploration**: stored per-civ as `map.explored[civSlot]: Set<tileIndex>`, restructured from the .sav's per-tile visibility byte (which packed all 7 civs into one byte). Per-civ Sets are cleaner and faster for fog-of-war filtering.

**Resources** are NOT stored per-tile. They're computed on demand from `map.seed` via a deterministic formula (`getResource(gx, gy)`). The seed is fixed at map generation, so resources never change. The `resourceSuppressed` flag on tiles overrides the formula to suppress a resource.

**Accessor functions** are NOT part of the model. They're created by `createAccessors(model.map)` and provide convenience lookups like `getTerrain(gx, gy)`, `getNeighbors(gx, gy)`, `getResource(gx, gy)`, `wrap(x)`, etc. The model stores the data; the accessors compute from it.

---

## `civs` — Per-Civilization State

```js
civs: [
  // Index 0 = Barbarians, 1-7 = player civs
  {
    alive: boolean,
    isHuman: boolean,
    everExisted: boolean,

    // Identity
    rulesCivNumber: number,    // 0-20, index into RULES.TXT/LEADERS.TXT (numeric — large catalog)
    civVariant: number,        // variant when multiple civs share rulesCivNumber
    style: 'european' | 'classical' | 'farEastern' | 'middleEastern',
    name: string,              // resolved display name (from LEADERS_TXT_NAMES or tribeName)
    leaderName: string,        // from civNameBlock
    gender: 'male' | 'female',
    tribeName: string,         // e.g. "Romans"
    tribeAdjective: string,    // e.g. "Roman"

    // Government titles (per government type) — small, part of civ identity
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
    government: 'anarchy' | 'despotism' | 'monarchy' | 'communism' | 'fundamentalism' | 'republic' | 'democracy',
    scienceRate: number,       // 0-10 (each unit = 10%)
    taxRate: number,           // 0-10
    // luxuryRate is derived (10 - scienceRate - taxRate) — not stored

    // Research
    researchProgress: number,  // beakers accumulated toward current research
    techBeingResearched: number | null, // advance ID, or null if none (0xFF in .sav)
    acquiredTechCount: number, // total techs acquired (derivable from technology.advances
                               // but kept — used frequently for era calculation, tech cost,
                               // AI decisions. Kept in sync by reducer on tech change.)
    futureTechCount: number,   // future tech count

    // City naming (from tail redistribution)
    cityNameCounter: number,   // next city gets name at this index from the civ's name list

    // AI personality
    aiRandomSeed: number,
    patience: number,          // negotiation patience 0-6
    reputation: number,        // diplomatic reputation 0-255
    treatyBreakingCount: number,
    personaIndex: number,      // AI persona: (rulesCivNumber % 7) + 7 * personality

    // State flags (from .sav bitfield — individual booleans for readability)
    // skipNextOedoYear:       prevents exploit of toggling luxury for repeated WLTKD
    // atWar:                  civ is currently at war (derivable from diplomacy.relations,
    //                         but kept as authoritative flag — .sav stores it, and it may
    //                         capture edge cases not reflected in individual treaty booleans)
    // senateOverride:         senate overridden this turn (Republic/Democracy war blocking)
    // recoveredFromRevolution: just finished revolution (government transition timing)
    // freeAdvancePending:     free tech to pick (from hut, wonder, or scenario event)
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
    unitTypeEverBuilt: boolean[],  // per unit type — authoritative historical data

    // Spaceship
    spaceship: {
      structural: number,      // components built
      propulsion: number,      // max 8
      estimate1: number,       // score/year estimate
      estimate2: number,       // typically estimate1 - 427
    },

    // AI fields — imported from .sav for fidelity, not yet used by JS AI logic.
    // When we implement Civ2-faithful AI, these provide the starting state for
    // loaded games. For initNewGame(), initialized to sensible defaults (empty
    // goals, zero seeds, etc.).
    continentGoals: [
      { x: number, y: number, goalType: number, priority: number },
      // ... 64 entries
    ] | null,
    continentStatusFlags: number[] | null,  // 63 entries
    lastContactTurns: number[],             // 7 entries, one per other civ

    // ── DERIVED FIELDS — EXCLUDED ──
    // Runtime caches recomputable from current state. Wherever Civ2.exe
    // looked these up directly, the JS equivalent must derive them from
    // the units/cities arrays instead (e.g. count units where owner===civSlot).
    //   militaryUnitCount    — count units with military domain
    //   cityCount            — cities.filter(c => c.owner === slot).length
    //   navalUnitCount       — count units with sea domain
    //   sumOfCitySizes       — sum city.size for owned cities
    //   totalUnitAtkDefSum   — sum (atk+def) for owned units
    //   totalUnitAtkSum      — sum atk for owned units
    //   activeUnitCounts[63] — count per unit type
    //   unitsInProduction[63]— count cities producing each unit type
    //   per-continent military/city/size counters — derive from position + bodyId
    //   powerGraphData[9]    — moved to history.powerGraphRaw

    // ── UNKNOWN FIELDS — EXCLUDED ──
    // No known purpose; add as named fields when decoded:
    //   unknown_18, unknown_23_26, diplomaticInteractionCounters_80_87
  },
  // ... 8 entries (indices 0-7)
]
```

**From .sav**: All authoritative fields listed above. AI fields (continentGoals, continentStatusFlags, lastContactTurns, personaIndex, aiRandomSeed) imported for fidelity — not yet used by JS logic.
**Excluded — Derived**: militaryUnitCount, cityCount, navalUnitCount, sumOfCitySizes, totalUnitAtkDefSum, totalUnitAtkSum, activeUnitCounts, unitsInProduction, per-continent military/city/size counters, powerGraphData. JS code must derive these from units/cities arrays rather than looking them up.
**Excluded — Unknown**: bytes +18, +23-26, +80-87 (purpose unclear)
**Excluded — Padding**: all known-zero padding bytes
**Spaceship**: 4 basic fields stored now (structural, propulsion, estimate1, estimate2). Expand with fuel/habitation/solar/launch when spaceship victory is implemented.

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
    // style: EXCLUDED — derive from civs[city.owner].style

    // Worker tile assignments — plain array instead of bitmasks
    // Array of tile indices (0-19) that are actively worked.
    // Center tile (index 20) is ALWAYS worked and not listed here.
    workedTiles: number[],     // e.g. [0, 3, 5, 7, 12]

    // Specialists — plain array of string types (small enum, 3 values)
    specialists: ('entertainer' | 'taxman' | 'scientist')[],
    // Invariant: workedTiles.length + specialists.length === size

    // Buildings — Set<number> in memory, serialized as Array<number> for WebSocket.
    // Building IDs are 1-indexed per RULES.TXT order. Display names via
    // BUILDING_NAMES[id] in defs.js. Set gives O(1) has() for game formulas.
    buildings: Set<number>,    // e.g. new Set([1, 5, 9]) = Palace, Marketplace, City Walls

    // Storage
    foodInBox: number,         // food accumulated
    shieldsInBox: number,      // shields toward current production

    // Production — discriminated object for readability
    // .sav encodes as single byte (units 0x00-0x3F, buildings = 256 - value);
    // parser converts to this structured form.
    producing: {
      type: 'unit' | 'building' | 'wonder',
      id: number,              // unit type ID or building/wonder ID
    },

    // Trade routes — index-based partner reference. Cities array is append-only
    // (destroyed cities leave dead slots), so indices are stable within a game.
    // Trade income is derived each turn from distance, continent, commodity,
    // government, and building bonuses — not stored.
    tradeRoutes: [
      {
        partnerCityIndex: number,  // index into cities array (stable — append-only)
        commodity: number,         // commodity ID (numeric — large catalog)
      },
      // ... 0-3 entries
    ],

    // City attributes (boolean flags — kept flat, no sub-object)
    weLoveKingDay: boolean,
    civilDisorder: boolean,
    canBuildCoastal: boolean,   // kept for readability despite being derivable
    canBuildHydro: boolean,     // kept for readability despite being derivable
    canBuildShips: boolean,     // kept for readability despite being derivable
    autoBuild: boolean,
    autoBuildDomestic: boolean,
    autoBuildMilitary: boolean,
    techStolen: boolean,
    improvementSold: boolean,  // an improvement was sold this turn
    turnsSinceCapture: number, // 0 if never captured

    // Scenario objective flags
    objectiveX1: boolean,
    objectiveX3: boolean,

    // Per-civ believed size (fog of war — what each civ thinks the size is).
    // All 8 stored for .sav import fidelity. Server filters to send only
    // the requesting civ's believed size in multiplayer.
    believedSize: number[],    // 8 entries (one per civ slot)

    // Known to which civs
    knownTo: Set<number>,      // civ slots 0-7 that know about this city

    // ── DERIVED FIELDS — EXCLUDED ──
    // Computed on demand by game functions:
    //   netBaseTrade, totalTrade, scienceOutput, taxOutput,
    //   foodProduction, shieldProduction, happyCitizens, unhappyCitizens,
    //   tradeCommoditiesAvail, tradeCommoditiesDemand

    // ── CONVENIENCE FIELDS — NOT STORED ──
    //   hasPalace: buildings.has(1)
    //   hasWalls: buildings.has(8)
    //   isOccupied: owner !== originalOwner
  },
  // ... one per city
]
```

**From .sav**: All authoritative fields. Bitmasks converted at parser boundary.
**Excluded — Derived**: netBaseTrade, totalTrade, scienceOutput, taxOutput, foodProduction, shieldProduction, happyCitizens, unhappyCitizens, tradeCommoditiesAvail, tradeCommoditiesDemand
**Excluded — Derived but kept**: canBuildCoastal, canBuildHydro, canBuildShips — derivable from position, but kept for code readability (`city.canBuildCoastal` is cleaner than recomputing adjacency)
**Excluded — Internal**: sequenceId, specialistCountRaw, raw coordinates cx/cy
**Excluded — Redundant**: style — derive from `civs[city.owner].style`
**Trade routes**: Index-based partner reference (`partnerCityIndex`) — cities array is append-only (destroyed cities leave dead slots), so indices are stable. O(1) lookup. Trade income is derived each turn, not stored.

---

## `units` — Unit Records

Array is append-only — dead units remain as slots with `alive: false`. This preserves
index stability for `homeCity` references, `unitIndex` in actions, and trade route
partner lookups (same pattern as cities array).

```js
units: [
  {
    // Identity & position
    type: number,              // 0-62 (display via UNIT_NAMES[type] in defs.js)
    owner: number,             // civ slot 0-7
    gx: number,                // grid X (-1 if dead)
    gy: number,                // grid Y (-1 if dead)
    alive: boolean,            // true if alive and on map
    veteran: boolean,

    // Movement
    movesLeft: number,         // movement points remaining (in thirds)
    hasMoved: boolean,         // has moved this turn
    paradropLaunched: boolean,
    immobile: boolean,

    // Status & orders — string enum (12 values, small set)
    // 'none' = idle/default (order byte 0 in .sav)
    // 'noOrders' = explicitly skipped this turn (order byte 10 in .sav)
    // Distinction matters: turn cannot end until all units have moved or
    // been explicitly skipped. 'none' = hasn't acted yet, 'noOrders' = skipped.
    orders: 'none' | 'fortifying' | 'fortified' | 'sleep' |
            'buildFortress' | 'buildRoad' | 'buildIrrigation' |
            'buildMine' | 'buildAirbase' | 'goTo' |
            'noOrders' | 'buildRailroad',

    automated: boolean,
    waiting: boolean,

    // Combat
    hpLost: number,            // damage taken (subtract from unit type's max HP)

    // Navigation & AI
    lastDirection: number | null,  // 0-7 direction index, used mathematically
                                   // (pathfinding continuity, offset lookups) — kept numeric
    homeCity: number | null,   // index into cities array (stable — append-only), or null
    gotoX: number | null,      // goto destination gx, or null
    gotoY: number | null,      // goto destination gy, or null

    // Type-specific cargo fields — separate named fields for readability.
    // Only one is meaningful per unit type; others are null.
    commodityCarried: number | null,  // Caravan/Freight: commodity ID being carried
    workTurns: number | null,         // Settler/Engineer: work turns accumulated
    fuelRemaining: number | null,     // Air units: fuel remaining
    cargoCount: number | null,        // Transport/Carrier: number of units carried

    // AI — imported from .sav for fidelity, not yet used by JS AI logic
    aiTaskRole: number,        // AI task assignment

    // ── EXCLUDED FROM MODEL — VISIBILITY ──
    // visibleTo is NOT stored on units. See "Visibility Architecture" section
    // below for the design decision and rationale.

    // ── EXCLUDED FROM .SAV ──
    // prevInStack, nextInStack — derive stacking from position (co-located units)
    // sequenceId — save-file internal indexing
    // saveIndex — save-file internal indexing
    // raw x/y coordinates — use gx/gy only
    // padding bytes
  },
  // ... one per unit (including dead units with alive=false)
]
```

**From .sav**: All authoritative fields. Order byte → string enum, cargo byte → named fields, stack pointers excluded.
**Excluded — Derived**: visibleTo (server-side cache, see Visibility Architecture below), stacking (derive from position)
**Excluded — Internal**: sequenceId, saveIndex, raw x/y, padding

---

## `diplomacy` — Treaties & Relations

```js
diplomacy: {
  // Per civ-pair relationships — full 8×8 matrix (including self-relations
  // and barbarians). Self-relations (relations[i][i]) are mostly zeros but
  // stored for index simplicity — avoids diagonal-skip logic in every loop.
  //
  // Indexed as relations[sourceCiv][targetCiv].
  // NOT symmetric: relations[1][3] is civ 1's view of civ 3.
  // Some flags are directional (attacked, cityCapture, weNukedThem) —
  // the source is always the actor. Symmetric flags (war, peace, alliance)
  // are kept in sync by the engine writing both directions.
  relations: [
    // Index = source civ (0-7)
    [
      // Index = target civ (0-7, including self)
      {
        // Treaty status — accumulated booleans (alliance implies peace implies contact).
        // Stored independently rather than as a single level because edge cases
        // exist (war + contact both true) and the .sav stores them this way.
        contact: boolean,
        ceaseFire: boolean,
        peace: boolean,
        alliance: boolean,
        war: boolean,
        vendetta: boolean,
        embassy: boolean,

        // Historical flags
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
**Full 8×8 matrix**: includes self-relations (mostly zeros) and barbarian relations — simpler than skipping diagonals
**Asymmetric by design**: directional flags (attacked, weNukedThem) differ per direction; symmetric flags (war, peace) kept in sync by engine
**Treaty flags**: accumulated booleans, not a single level — allows edge cases from .sav
**Excluded**: diplomaticInteractionCounters (+80-87) — unknown purpose. Documented in parser; add as named fields when decoded.
**Excluded**: unknown bytes +23-26 — unclear diplomatic counters. Documented in parser.

---

## `wonders` — World Wonders

Array index = wonder ID (consistent with units, cities, techs — no redundant `.id` field).
Display names via `WONDER_NAMES[wonderIndex]` in `defs.js`.
Wonder effects live in engine code, not the model.

```js
wonders: [
  // 28 entries — array index = wonder ID (0-27)
  {
    cityIndex: number | null,  // index into cities array, or null if not built
    destroyed: boolean,        // wonder was built but then destroyed
    // Owner derived from cities[cityIndex].owner — not stored
  },
  // ... 28 entries
]
```

**From .sav**: wonderCityIds (28 × uint16). 0xFFFF → not built. 0xFFEF → destroyed. Otherwise → cityIndex.
**Convention**: array index = ID throughout the model (units, cities, techs, wonders). No redundant `.id` fields.

---

## `technology` — Tech Discovery State

Stores only per-advance data. Per-civ views ("which techs does civ 3 have?") are
derived via helper functions or cached outside the model — same pattern as the
visibility cache. Entries 89-99 are unused padding, kept for index alignment with .sav.

```js
technology: {
  advances: [
    // 100 entries — array index = advance ID
    // Only 0-88 are real advances; 89-99 are unused padding (kept for .sav index alignment)
    {
      firstDiscoveredBy: number | null,  // civ slot 1-7, or null if undiscovered
      discoveredBy: Set<number>,         // civ slots 1-7 that have this tech
    },
    // ... 100 entries
  ],

  // Per-civ tech sets and counts are NOT stored in the model.
  // Derive via helper functions, cached outside the model after parse/deserialization
  // (same pattern as visibility cache — computed index, not game state):
  //
  //   techCache = {
  //     civTechs: { [civSlot]: Set<advanceId> },  // which techs each civ has
  //     civTechCounts: { [civSlot]: number },      // count per civ
  //   };
  //
  // Rebuilt from advances array after parse and after any tech change.
  // Provides O(1) lookup: techCache.civTechs[3].has(advanceId)
}
```

**From .sav**: firstDiscoverer[100] at +0x42, techDiscoveryBitmask[100] at +0xA6
**Excluded — Redundant**: civTechCounts, civTechs — derived, cached outside model as computed index
**Padding entries 89-99**: kept for .sav index alignment, always empty

---

## `turn` — Turn State

Kept as its own top-level section — turn advancement is a core game mechanic
that the reducer touches every END_TURN. Thin by design.

```js
turn: {
  number: number,             // current turn number (0-based)
  activeCiv: number,          // civ slot whose turn it is (1-7)
  selectedUnit: number | null, // currently selected unit index, or null
                               // Used to center map on initial load for each player.
                               // In multiplayer, server stores per-civ selected unit.

  // year: EXCLUDED — derive via getYear(turn.number) in engine/year.js.
  //   Pure function, one-liner. Avoids reducer needing to update it every turn.
  // humanPlayers: lives on civs[i].isHuman — not duplicated here
  // playerCiv: per-session — stored in meta.seatCivMap
}
```

**From .sav**: turnsPassed (+0x1C), activeHumanPlayer (+0x27), selectedUnit (+0x22), playerCiv (+0x29)
**Excluded — Derived**: year — compute via `getYear(turn.number)` from `engine/year.js`

---

## `history` — Historical & Retrospective Data

```js
history: {
  // Civ eliminations — unlimited entries (not constrained by .sav's 12-entry limit)
  kills: [
    {
      turn: number,
      killerCiv: number,       // civ slot 1-7
      destroyedCivRulesId: number,  // rulesCivNumber + 21*generation
      destroyedCivName: string,
    },
    // ... unlimited entries
  ],

  // Per-turn snapshots for power graph, top-5 lists, demographics report.
  // Computed at each turn boundary by processTurnStart() and appended here.
  // For new/ongoing games, built natively each turn.
  // For .sav imports, this starts empty — powerGraphRaw is a placeholder
  // for future decoding. Code should fail gracefully when turnSnapshots
  // is empty (e.g. power graph UI shows "no data" or is disabled).
  turnSnapshots: [
    {
      turn: number,
      civSnapshots: [
        {
          civSlot: number,
          population: number,    // sum of city sizes
          territory: number,     // tiles owned
          military: number,      // total unit attack+defense
          gold: number,          // treasury at end of turn
          techCount: number,     // advances discovered
          cityCount: number,
          productionTotal: number, // total shield output across cities
        },
        // ... one per alive civ
      ],
    },
    // ... one per completed turn
  ],

  // Raw power graph data from .sav (partially decoded).
  // Placeholder — future work to decode into turnSnapshots format.
  // For now, stored as raw bytes for fidelity. Code that reads
  // turnSnapshots must handle the case where this is the only
  // history data available (graceful fallback).
  powerGraphRaw: Uint8Array | null,

  // Game replay data (unit/city positions per turn for minimap playback).
  // NEW — doesn't exist in .sav. Placeholder, define structure when
  // we implement the feature. Accumulated during gameplay for
  // post-game review.
  replay: [] | null,           // TBD structure
}
```

**From .sav**: kills from tail kill history (12-entry limit removed in JS), powerGraphRaw from tail history data
**New for JS game**: turnSnapshots (built each turn), replay (end-game playback, TBD)
**Graceful fallback**: .sav imports have powerGraphRaw but empty turnSnapshots — UI must handle both cases

---

## `events` — Scenario Events & Metadata

```js
// null for non-scenario games. Entire section absent — not an empty object.
events: {
  // Scenario metadata (from .sav tail scenario block)
  scenario: {
    name: string,
    // ... other decoded scenario fields (objectives, flags)
    // Undecoded fields stored as raw bytes until we need them
    rawBlock: Uint8Array,
  } | null,

  records: [
    {
      triggers: Set<string>,   // e.g. new Set(['turn', 'unitKilled'])
      actions: Set<string>,    // e.g. new Set(['text', 'createUnit', 'justOnce'])
      params: Uint8Array,      // 290 raw parameter bytes (event-type-specific)
    },
    // ... one per event
  ],
  strings: string[],           // text messages, filenames referenced by events
} | null

// TODO: This section is intentionally rough. The scenario event engine is not
// yet implemented. When we build it, revisit this structure to:
//   - Decode params bytes into named fields per trigger/action type
//   - Define the event processing pipeline (when triggers fire, how actions execute)
//   - Decide whether events mutate the model directly or go through the reducer
```

---

## `gapRecord` — Inter-Section Data

```js
// The 32-byte gap record between cities and tail in .sav is poorly understood.
// May contain cursor state, last-action metadata, or AI scratch data.
// Proposal: Exclude from model. Document in parser why it's skipped.
// If we discover its purpose, add named fields to the appropriate section.
```

---

## Serialization for WebSocket

The model must survive JSON round-trip for multiplayer state sync:

| Type | Serialize | Deserialize |
|------|-----------|-------------|
| `Set<number>` | `[...set]` (array) | `new Set(arr)` |
| `Set<string>` | `[...set]` (array) | `new Set(arr)` |
| `Uint8Array` | `Array.from(arr)` or base64 | `new Uint8Array(arr)` |

Handled at transport boundary via `serializeState(model)` and `deserializeState(json)`. The model uses native JS types; serialization logic is centralized.

**Payload size considerations**:
- Current GAME_START is ~325KB for a 40×50 map with binary-encoded fields
- Converting bitmasks to arrays/objects will increase size ~2-3×
- A 150×300 map (45K tiles) with improvement objects per tile: ~5-10MB
- Mitigation: compress with standard algorithms, or send map tiles in compact format on initial load and expand on client

---

## Server-Side Filtering (Fog of War)

The server NEVER sends the full model to a client. Each player receives only what their civ can see. This matches Civ2.exe behavior — you only see what you've explored, and enemy details are hidden unless you have intelligence (embassy, spy).

### Visibility Rules

| Data | What Client Receives | Condition |
|------|---------------------|-----------|
| Map terrain | Only explored tiles | `map.explored[myCiv].has(tileIndex)` |
| Map improvements (current) | Only tiles with current LOS | Unit/city within sight radius |
| Map improvements (fogged) | Last-seen snapshot | `map.knownImprovements[myCiv][tileIndex]` |
| My units | Full data | Always |
| Enemy units | Position, type, owner, HP | Only if on a tile I have LOS on |
| Enemy unit orders, goto, cargo | Hidden | Never (unless spy) |
| My cities | Full data | Always |
| Enemy cities | Name, owner, believed size | Only if in `city.knownTo[myCiv]` |
| Enemy city internals (production, buildings, workers) | Hidden | Unless embassy/spy |
| My civ (treasury, research, rates) | Full data | Always |
| Enemy civ (treasury, research, rates) | Hidden | Unless embassy |
| My diplomacy | Full relations data | Always |
| Enemy-to-enemy diplomacy | Hidden | Never |
| Wonders | Public — all players see when built/destroyed | Always |
| Technology (my techs) | Full set | Always |
| Technology (enemy techs) | Hidden | Unless embassy/intelligence |
| History (kills) | Public | Always |

### Implementation

The server runs `filterStateForCiv(fullModel, civSlot)` before sending to each client. This produces a per-civ view of the model with private data stripped. The function is lightweight — for a typical game (200 units, 2000 tiles, 40 cities) it runs in <1ms per player.

---

## Real-Time Updates & Delta Broadcasting

Instead of sending the full filtered state after every action, the server sends targeted deltas. This is both more efficient (smaller payloads) and better UX (other players see moves as they happen, not batched at end of turn).

### Flow

```
Player A moves a unit:
  → Client sends ACTION { type: MOVE_UNIT, unitIndex, dir }
  → Server validates, applies to authoritative state
  → Server sends deltas to each client:

  To Player A (the actor):
    { type: 'MOVE_RESULT', unitIndex, newGx, newGy, movesLeft, visibilityUpdates }

  To Player B (can see the unit):
    { type: 'UNIT_MOVED', unitIndex, fromGx, fromGy, toGx, toGy }

  To Player C (cannot see the unit):
    (nothing — no delta sent)

  To Player D (unit moved INTO their LOS):
    { type: 'UNIT_APPEARED', unit: { type, owner, gx, gy, ... } }

  To Player E (unit moved OUT OF their LOS):
    { type: 'UNIT_DISAPPEARED', unitIndex, lastGx, lastGy }
```

### Delta Types

| Delta | When Sent | Payload |
|-------|-----------|---------|
| `MOVE_RESULT` | To acting player after move | New position, moves left, new visibility |
| `UNIT_MOVED` | To players who can see both old and new position | From/to coordinates |
| `UNIT_APPEARED` | To players who can now see the unit | Full visible unit data |
| `UNIT_DISAPPEARED` | To players who lost sight of the unit | Last known position |
| `CITY_FOUNDED` | To players who can see the tile | City name, owner, position |
| `TURN_START` | To the civ whose turn begins | Updated units (movement reset), city production results |
| `TURN_CHANGED` | To all players | New activeCiv, turn number |

### Full State Sync

Full filtered state is sent only on:
- **GAME_START** — initial load
- **Reconnect** — player rejoins after disconnect
- **Desync detection** — version mismatch triggers full resync

---

## Visibility Architecture (Server-Side Cache)

### The Design Decision

Unit and city visibility — "which civs can see which units/tiles right now?" — is
**NOT stored in the game model**. It is maintained as a **server-side cache** that
lives outside the model, rebuilt after each action.

### Why Not Store It in the Model?

Three options were considered:

| | Store on each unit | Derive on demand | Server-side cache |
|---|---|---|---|
| **Where it lives** | `unit.visibleTo: Set<number>` | Computed each time | Server lookup table |
| **Reducer impact** | Must update on every move | None | None |
| **Lookup speed** | O(1) | O(units + cities) per query | O(1) |
| **Correctness risk** | Can drift if reducer has bugs | Always correct | Always correct if rebuilt after each action |
| **Model purity** | Derived data in the model | Clean model | Clean model |

**Decision: Server-side cache (Option C).** Rationale:

1. **Design principle #2** says "no derived/stale fields" — visibility is fully
   derivable from unit/city positions + sight radii. Storing it in the model
   violates this principle and creates a class of sync bugs.

2. **Reducer stays pure** — the reducer applies game rules (movement, combat,
   production). Tracking "who can see what" is a server concern for filtering
   and broadcasting, not a game rule.

3. **Performance is fine** — rebuilding visibility after each action is cheap.
   A typical game has ~200 units and ~40 cities. Scanning all positions to
   rebuild LOS is <1ms. The cache gives O(1) lookups for broadcasting.

4. **Single source of truth** — positions are the truth. The cache is just an
   index over positions. No risk of the cache disagreeing with reality because
   it's rebuilt (or incrementally updated) from positions after every action.

### Cache Structure

```js
// Server infrastructure — NOT part of the game model.
// Lives on room object, rebuilt after each reducer call.
room.visibilityCache = {
  // Which tiles each civ can currently see (from their units + cities)
  // Rebuilt from: unit positions (sight radius 1 = 9 tiles) +
  //               city positions (sight radius 2 = 21 tiles)
  visibleTiles: {
    [civSlot: number]: Set<tileIndex>,  // e.g. { 1: Set([204, 205, ...]) }
  },

  // Reverse index: which civs can see a given tile
  // Enables O(1) lookup: "who can see tile 204?" → Set([1, 3])
  tileObservers: {
    [tileIndex: number]: Set<civSlot>,  // e.g. { 204: Set([1, 3]) }
  },
};
```

### How It's Used

```
Player moves a unit:
  1. Reducer applies MOVE_UNIT → returns new game state (pure, no visibility logic)
  2. Server saves old visibilityCache
  3. Server rebuilds visibilityCache from new state
  4. Server diffs old vs new cache to determine deltas:
     - Unit was in civ 3's visibleTiles before but not after → UNIT_DISAPPEARED to civ 3
     - Unit is in civ 2's visibleTiles now but wasn't before → UNIT_APPEARED to civ 2
     - Unit is in civ 4's visibleTiles both before and after → UNIT_MOVED to civ 4
  5. Server sends appropriate deltas to each client
```

### What About Exploration (Persistent)?

Exploration ("has this civ ever seen this tile?") is different from LOS ("can this
civ see this tile right now?"). Exploration IS stored in the model at
`map.explored[civSlot]: Set<tileIndex>` because it's persistent, authoritative
game state — once a tile is explored, it stays explored. The visibility cache only
tracks transient LOS.

### Separation of Concerns

| Concept | Where it lives | Why |
|---------|---------------|-----|
| **Exploration** (persistent) | `map.explored[civSlot]` in game model | Authoritative game state — survives save/load |
| **LOS** (transient) | `room.visibilityCache` on server | Derived from positions — rebuilt after each action |
| **Known improvements** (fog memory) | `map.knownImprovements[civSlot]` in game model | Authoritative — what civ last saw on each tile |
| **Believed city size** (fog memory) | `city.believedSize[civSlot]` in game model | Authoritative — what civ last saw as city size |

---

## What's NOT in the Model (and why)

| Excluded Data | Reason |
|---------------|--------|
| Raw binary offsets (cx, cy, x, y) | Use gx/gy only — derived coordinates |
| Unit sequenceId | Save-file internal indexing |
| City sequenceId | Save-file internal indexing |
| Unit stack pointers (prev/next) | Derive stacking from position |
| Unit visibleTo | Server-side cache — see Visibility Architecture section |
| Derived city fields (50% of city record) | Recompute on demand |
| Derived civ demographics | Recompute from units/cities |
| mw2 (doubled width) | Derive as width × 2 |
| ms (map size) | Derive as width × height |
| File magic, format markers | File plumbing, not game data |
| All known-zero padding bytes | No information content |
| Unknown/undecoded bytes | No known purpose; add when decoded |
| Passwords (hotseat multiplayer) | Auth via WebSocket sessions |
| Fixed constants (7-byte sentinel) | Validation only, not game data |
| Network data (.net LAN protocol) | Irrelevant to WebSocket multiplayer |
| Gap record (32 bytes) | Poorly understood, not needed for gameplay |
| Game rules (movement costs, terrain yields, etc.) | Engine code in `defs.js`, not game state |
| COSMIC defaults | Engine code in `defs.js`; model only stores overrides (null = default) |
| City name lists | Engine code in `defs.js`; model only stores overrides and per-civ counter |

---

## Open Questions Summary

### Resolved

| # | Question | Decision |
|---|----------|----------|
| 1 | Tile improvements representation | Object with boolean flags. Farmland is a separate flag (like railroad vs road) |
| 6 | UI preferences | Client-only (localStorage). Excluded from shared model — each player has own prefs |
| 8 | Per-civ knownImprovements | Convert up front at parse time — no byte logic in JS |
| 10 | exploredBy on tiles | Per-civ Set at `map.explored[civSlot]`, not per-tile |
| 13 | Quarter-resolution data | Excluded — AI pathfinding data, we'd compute our own |
| 14 | Gap record | Excluded — document in parser |
| 15 | Numeric enums vs strings | Strings for small enums (≤12 values): difficulty, barbarian, gender, style, government, orders, specialists. Numbers for large catalogs (unit types, buildings, techs, wonders) with display names in `defs.js`. When in doubt, prefer numbers. |
| 3 | Building representation | `Set<number>` — building IDs (1-indexed, RULES.TXT order). Display via `BUILDING_NAMES[id]` in defs.js. Serialized as array for WebSocket. |
| 4 | Unit orders | String enum — small set (12 values), readability wins |
| 5 | Specialist types | String enum — small set (3 values), readability wins |
| 16 | City style | Derived from `civs[city.owner].style` — not stored on city |
| 17 | Trade route partner reference | Index-based (`partnerCityIndex`) — cities array is append-only so indices are stable. O(1) lookup, check alive status directly. |
| 18 | City attribute booleans | Flat on city object (no sub-object nesting) |
| 19 | canBuildCoastal/Hydro/Ships | Kept despite being derivable — readability trumps purity |
| 20 | believedSize | All 8 entries for .sav import; server filters per-civ on send |
| 21 | Production representation | Discriminated object `{ type, id }` — clear conditionals |
| 7 | Dead units | Keep in array with `alive: false` — append-only, preserves index stability for homeCity and unitIndex references |
| 12 | Cargo field semantics | Separate named fields (`commodityCarried`, `workTurns`, `fuelRemaining`, `cargoCount`) — readability over compactness. Unused fields are null. |
| 22 | Unit visibleTo | NOT in model — server-side cache. Derived from positions + sight radii, rebuilt after each action. See Visibility Architecture section. |
| 23 | lastDirection type | Numeric (0-7) — used mathematically for offset lookups, not in display conditionals |
| 24 | AI fields on units | Import `aiTaskRole` from .sav for fidelity, not used by JS yet |
| 25 | 'none' vs 'noOrders' | Keep distinct — 'none'=idle/default, 'noOrders'=explicitly skipped. Turn cannot end until all units have moved or been skipped. |
| 26 | Diplomacy matrix shape | Full 8×8 including self-relations and barbarians — simpler indexing, no diagonal-skip logic |
| 27 | Diplomacy symmetry | Store both directions independently. Directional flags (attacked, weNukedThem) differ per direction; engine keeps symmetric flags (war, peace) in sync. |
| 28 | Treaty representation | Accumulated booleans (not single level) — allows edge cases, matches .sav |
| 29 | turnsOfPeace location | Stays in diplomacy — conceptually about diplomatic state, not turn mechanics |
| 30 | Unknown diplomatic fields | Excluded with parser comment — add as named fields when decoded |
| 31 | Wonder `.id` field | Removed — array index = ID, consistent with units/cities/techs. No redundant `.id` fields anywhere in the model. |
| 32 | Wonder effects | Engine code in `defs.js` / game logic, not stored in the model |
| 11 | Redundant tech views | Per-civ tech sets derived and cached outside the model (computed index, same pattern as visibility cache). Rebuilt after parse and after any tech change. |
| 33 | Tech padding entries 89-99 | Kept for .sav index alignment — always empty |
| 34 | Civ slot ranges | Consistent: 0-7 for arrays/matrices (includes barbarians), 1-7 where barbarians can't act (activeCiv, firstDiscoveredBy, discoveredBy, killerCiv). All ranges annotated in model. |
| 35 | Year in turn | Excluded — derive via `getYear(turn.number)`. Pure function, avoids reducer update. |
| 36 | selectedUnit in turn | Kept — useful for centering map on initial load. Server stores per-civ. |
| 37 | Turn as top-level section | Kept separate — turn advancement is core reducer mechanic, conceptually distinct from meta |
| 38 | kills limit | Unlimited — not constrained by .sav's 12-entry binary limit |
| 39 | turnSnapshots for .sav imports | Starts empty — powerGraphRaw is placeholder for future decoding. Code must fail gracefully. |
| 40 | replay | Placeholder (TBD structure) — define when feature is implemented |
| 41 | Events section | Kept rough/placeholder — null for non-scenarios. Revisit when scenario event engine is built. |

### Still Open

2. **Tile storage** — array of objects vs parallel typed arrays? (Proposed: array of objects)
9. **Payload size** — acceptable for large maps? (Proposed: delta broadcasting solves most of this)

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
- Convert cargo byte → separate named fields (commodityCarried, workTurns, fuelRemaining, cargoCount)
- Exclude stack pointers (derive stacking from position)
- Exclude visibleTo (server-side cache, not model — see Visibility Architecture)
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

### Phase 6: Map Visibility & Tile Data
- Convert tile visibility byte → `exploredBy: Set<number>`
- Convert tile data to objects with named fields
- Update: updateVisibility, FOW rendering, filterStateForCiv

### Phase 7: Settings, Meta, History
- Parse toggle bytes → named boolean fields
- Parse COSMIC constants into settings.cosmic (null override pattern)
- Move cursor position to meta
- Structure kill history and power graph into history
- Move city name counters to civs
- Move CIV_CITY_NAMES from reducer.js to defs.js
- Clean up remaining fields

Each phase is independently deployable. Earlier phases don't depend on later ones. The parser gains a conversion layer that can be enabled per-section, allowing gradual migration.
