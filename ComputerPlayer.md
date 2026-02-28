# Computer Player (AI) Design Document

## Overview

This document outlines the approaches and design decisions for adding AI-controlled players to the browser-based multiplayer Civ 2 game. AI players participate alongside human players over the internet.

---

## AI Approaches Considered

### 1. Rule-Based / Scripted AI

Explicit if/then rules covering every decision. "If I have fewer than 3 cities and a settler, found a city near a river."

- **Implementation:** A `takeTurn(gameState, civId)` function with priority-ordered rules for each decision point (build, move, attack, research).
- **Pros:** Predictable, debuggable, no training needed, runs instantly in the browser.
- **Cons:** Brittle — every edge case needs a rule. Feels robotic. The original Civ 2 AI works this way and is notoriously exploitable.
- **Effort:** Medium. Basic version in days, but making it good takes months of tuning.

### 2. Utility-Based AI (Enhanced Rule-Based)

Every possible action gets a numeric "utility" score; the AI picks the highest. Used by Civ 5, Civ 6, and Endless Legend.

- **Implementation:** For each possible action, compute a score from weighted factors. Example for "should I build a warrior?":
  ```
  score = (threatLevel * 30) + (unexploredTiles * 5) - (existingMilitaryUnits * 10)
  ```
  Pick the highest-scoring action. Optionally add small random noise for unpredictability.
- **Pros:** Flexible, easy to tune (adjust weights), handles tradeoffs naturally, runs instantly in the browser.
- **Cons:** Requires defining every factor and weight by hand. Balancing weights is the hard part.
- **Effort:** Medium-high. Architecture is simple, but weight balancing takes extensive playtesting.

### 3. Finite State Machine (FSM) / Goal-Oriented AI

The AI has distinct behavioral states (expanding, defending, attacking, teching up) and transitions between them based on game conditions.

- **Implementation:** Define states (`EARLY_EXPAND`, `BUILD_MILITARY`, `ATTACK`, `DEFEND`, `TECH_RUSH`, `TURTLE`) with transition conditions. Each state has its own priorities. Can layer on top of utility-based scoring by having states modify weights.
- **Pros:** Creates coherent long-term strategies. The AI feels like it has "plans." Easy to debug.
- **Cons:** State transitions can feel abrupt. Still fundamentally hand-authored.
- **Effort:** Medium. Natural extension of approaches #1 or #2.

### 4. Monte Carlo Tree Search (MCTS)

The AI simulates many random future game states to evaluate which move leads to the best outcomes.

- **Implementation:** Generate all legal moves, run random playouts N turns into the future, pick the move that leads to the best average outcome.
- **Pros:** No hand-tuned evaluation rules needed. Can discover non-obvious strategies.
- **Cons:** Civ 2's state space is enormous. Simulating even 10 turns is computationally expensive. Likely impractical in a browser without heavy simplification.
- **Effort:** High. Needs a fast simplified simulation model plus significant compute.

### 5. Machine Learning (Reinforcement Learning)

A neural network learns to play via millions of self-play games, receiving rewards for winning.

- **Implementation:** Define state as numeric vector/grid, define action space, train with PPO/DQN via TensorFlow.js or Python (PyTorch/TF) then export. Ship trained model; runtime does inference only.
- **Pros:** Can learn strategies humans haven't considered. No manual rule-writing.
- **Cons:** Massive action space + long games make RL extremely difficult. Training requires enormous compute (days/weeks on GPUs). Black-box behavior, hard to debug.
- **Effort:** Very high. Research-level challenge for a game this complex (comparable to OpenAI Five or AlphaStar projects).

### 6. LLM-Powered AI (Claude/GPT as the "brain")

Send game state as text to a large language model and ask it to decide what to do.

- **Implementation:** Serialize game state to text, send to Claude API with rules/strategy prompt, parse structured JSON response into game actions.
- **Pros:** Decent strategic reasoning out of the box. Excellent for natural-language diplomacy. Easy to prototype. Can explain its reasoning.
- **Cons:** Slow (seconds per API call). Costs money. Inconsistent — may make illegal moves. No learning between games.
- **Effort:** Low to prototype, hard to make reliable and performant.

---

## Chosen Approach

**Primary: Utility-Based (#2) layered with State Machine (#3)**

Rationale:
- Runs entirely client-side in JavaScript — no server costs, no latency
- Game state is already parsed and accessible in the existing codebase
- Can get something playable quickly, then improve incrementally
- This is what the actual Civ series uses (Civ 5/6 are utility-based)
- Easy to add difficulty levels by adjusting weights or giving bonuses

**Optional addition: LLM (#6) specifically for diplomacy** — uniquely good at negotiating in natural language with human players, where scripted AI always falls flat.

---

## Utility-Based AI — Deep Dive

### Decision Categories

The AI faces a handful of distinct decision types each turn. Each has its own set of candidate actions and scoring factors:

| Category | Candidates | Key Factors |
|----------|-----------|-------------|
| **City Production** | Every buildable unit, building, wonder | Threat level, missing infrastructure, city count, strategic state |
| **Unit Movement** | Every legal destination tile | Enemy proximity, terrain defense, fog of war, tile quality |
| **Combat** | Attack / retreat / hold | Relative strength, terrain bonus, HP remaining, backup units |
| **Research** | All researchable techs | What it unlocks, proximity to critical techs, opponent progress |
| **Diplomacy** | Peace / war / trade / nothing | Relative military strength, shared borders, active fronts |

### How Scoring Works

Each factor is a function that returns a number. Multiply by a weight, sum them all:

```
scoreWarrior =
    (nearbyEnemies * 40) +
    (borderExposure * 20) +
    (missingDefenders * 50) -
    (existingMilitary * 15) +
    (atWar ? 60 : 0)

scoreGranary =
    (citySize * 10) +
    (hasFoodSurplus ? 30 : 0) -
    (alreadyHasGranary ? 9999 : 0) -
    (nearbyEnemies * 20)

scoreSettler =
    (goodSitesAvailable * 35) +
    (fewCities ? 50 : 0) -
    (nearbyEnemies * 30) -
    (citySize < 3 ? 9999 : 0)
```

### Making It Feel Less Robotic

- **Random noise:** Add +-10% to each score so the AI isn't perfectly predictable
- **Personality profiles:** Different weight sets per AI player (aggressive, builder, expansionist)
- **Difficulty scaling:** Easy AI uses suboptimal weights; hard AI gets production bonuses or better map knowledge

### Architecture Sketch

```
AIPlayer
├── evaluateProduction(city, gameState) → ranked build list
├── evaluateMovement(unit, gameState)  → best destination tile
├── evaluateCombat(unit, targets)      → attack/retreat/hold
├── evaluateResearch(gameState)        → best tech
├── evaluateDiplomacy(gameState)       → diplomatic actions
│
├── weights: { military, growth, expansion, research, ... }
├── personality: "aggressive" | "builder" | "expansionist" | ...
└── takeTurn(gameState) → list of actions
```

### Tuning the Weights

This is where 90% of the effort goes:

1. **Manual playtesting** — Play against the AI, note bad decisions, adjust weights. Repeat.
2. **A/B tournaments** — Run AI vs. AI with different weight sets, keep the winners (simple evolutionary approach).
3. **Start simple** — Begin with just military vs. infrastructure for production, "move toward enemy" vs. "explore" for movement. Add factors gradually.

---

## Deep Dive: City Production

City production is the most impactful decision category. What a city builds each turn compounds over the entire game — a wrong build order in the early game can be unrecoverable.

### Build Candidates

Each turn, a city can build one of three types of things:

| Type | Examples | When it matters |
|------|----------|----------------|
| **Units** | Warriors, settlers, catapults, diplomats | Military defense, expansion, warfare, exploration |
| **Buildings** | Granary, temple, marketplace, barracks | Long-term city growth, happiness, economy |
| **Wonders** | Great Library, Hanging Gardens, etc. | Unique global bonuses, race condition vs. opponents |

### Scoring Factors for Production

Each candidate gets scored against these factors. The AI evaluates all candidates and picks the highest total score.

#### A. Military Need

```
militaryScore(unitType) =
    (nearbyEnemyUnits * W_THREAT) +
    (citiesWithoutDefender * W_UNDEFENDED) +
    (atWar ? W_WARTIME : 0) +
    (enemyMilitaryAdvantage * W_ARMS_RACE) -
    (ownMilitaryUnits * W_ALREADY_HAVE)
```

**Inputs the AI needs to compute:**
- Count of enemy units within a threat radius (e.g., 5 tiles) of this city
- Count of own cities that have no military unit garrisoned
- Whether currently at war with any civ
- Ratio of enemy total military strength to own military strength
- Count of own existing military units

**Unit type differentiation:** Not all military units score equally. A city under direct threat scores melee defenders highest. A city far from enemies might score an offensive unit or siege weapon if the AI is in an ATTACK state. Scouts/explorers score high early game when the map is unexplored.

#### B. Growth & Infrastructure Need

```
buildingScore(building) =
    (populationGrowthValue * W_GROWTH) +
    (happinessValue * W_HAPPINESS) +
    (revenueValue * W_ECONOMY) +
    (turnsToComplete < threshold ? W_QUICK_BUILD : 0) -
    (alreadyBuilt ? IMPOSSIBLE : 0) -
    (prerequisiteMissing ? IMPOSSIBLE : 0)
```

**Building priority tiers** (general guideline, modified by weights):
1. **Critical:** Granary (food growth), Temple (happiness to prevent disorder)
2. **Important:** Marketplace (economy), Library (research), Barracks (veteran units)
3. **Nice to have:** Aqueduct (growth past size 8), Bank (economy boost), University
4. **Late game:** Factory, Power Plant, Research Lab, etc.

**Key insight:** Building value is context-dependent. A granary is worth far more in a high-food city than a desert city. A temple is urgent if the city is close to civil disorder but worthless if citizens are already happy.

#### C. Expansion Need

```
settlerScore =
    (goodCitySitesAvailable * W_GOOD_SITES) +
    (totalCities < targetCityCount ? W_NEED_CITIES : 0) +
    (gameTurn < earlyGameThreshold ? W_EARLY_EXPAND : 0) -
    (citySize < 3 ? IMPOSSIBLE : 0) -        // don't shrink tiny cities
    (noEscortAvailable ? W_DANGER_PENALTY : 0) -
    (nearbyEnemies * W_THREAT_PENALTY)
```

**City site evaluation** (used to compute `goodCitySitesAvailable`):

The AI needs a `rateCitySite(tile)` function that scores potential city locations:
```
siteScore(tile) =
    sum of food/shields/trade for all tiles in city radius +
    (hasRiver ? bonus : 0) +
    (coastal ? bonus : 0) +
    (distanceFromOwnCities in sweet spot ? bonus : 0) -
    (tooCloseToOwnCity ? penalty : 0) -
    (tooCloseToEnemy ? penalty : 0)
```

Ideal city spacing is 4-5 tiles apart so city radii don't overlap excessively.

#### D. Wonder Racing

```
wonderScore(wonder) =
    (wonderValue * W_WONDER_POWER) +
    (closeToCompletion ? W_ALMOST_DONE : 0) -
    (otherCivBuildingSameWonder ? W_RACE_RISK : 0) -
    (turnsToComplete * W_OPPORTUNITY_COST)
```

Wonders are high-risk/high-reward. The AI needs to estimate whether it can finish before opponents. If another civ completes the wonder first, all invested shields are wasted (converted to gold at a loss).

### Production Evaluation Flow

```
evaluateProduction(city, gameState):
    candidates = getAllBuildableItems(city)
    scores = []

    for each candidate in candidates:
        score = 0
        score += militaryScore(candidate)      // if unit
        score += buildingScore(candidate)       // if building
        score += settlerScore(candidate)        // if settler
        score += wonderScore(candidate)         // if wonder
        score += personalityModifier(candidate) // from AI personality
        score += stateModifier(candidate)       // from FSM state
        score += randomNoise()                  // +-10% for variety
        scores.push({ candidate, score })

    return scores.sort(byScoreDescending)[0]
```

### Build Queue vs. Single Item

Civ 2 builds one item at a time per city. The AI re-evaluates each turn, so it can switch production if circumstances change (e.g., enemy appears — switch from granary to warrior). However, switching costs shields (some production is lost). The scoring should include a **switching penalty** to avoid flip-flopping:

```
if (candidate !== currentlyBuilding)
    score -= (shieldsAlreadyInvested * W_SWITCH_COST)
```

### Starter Implementation Order

1. **Phase 1 — Basics:** Score military units vs. settlers vs. "default building" (pick from a hardcoded priority list). This alone produces a playable AI.
2. **Phase 2 — Building scoring:** Score individual buildings based on city needs (growth, happiness, economy).
3. **Phase 3 — Context awareness:** Factor in nearby enemies, city size, terrain quality, game phase.
4. **Phase 4 — Wonder evaluation:** Add wonder racing logic.
5. **Phase 5 — Personality & tuning:** Differentiate AI players with weight profiles, add noise, playtest extensively.
