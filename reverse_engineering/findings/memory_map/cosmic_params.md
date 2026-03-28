# Cosmic Parameters (Game Constants)

Documented 2026-03-27. Memory read at title screen (before any game loaded).

## Table Location

- **Base address:** `0x0064BCC8`
- **Size:** 22 bytes (one byte per parameter)
- **Source:** @COSMIC section of RULES.TXT maps directly to these bytes

## Parameter Table

| Offset | Value | RULES.TXT Value | RULES.TXT Description                                       |
|--------|-------|-----------------|-------------------------------------------------------------|
| 0      | 3     | 3               | Road movement multiplier                                    |
| 1      | 2     | 2               | 1-in-X chance Trireme lost (modified by Seafaring/Navigation) |
| 2      | 2     | 2               | Food each citizen eats per turn                             |
| 3      | 10    | 10              | Rows in food box (rows × city_size+1 = box size)           |
| 4      | 10    | 10              | Rows in shield box                                          |
| 5      | 1     | 1               | Settlers eat (govt ≤ Monarchy)                             |
| 6      | 2     | 2               | Settlers eat (govt ≥ Communism)                            |
| 7      | 7     | 7               | City size for first unhappiness at Chieftain level          |
| 8      | 14    | 14              | Riot factor based on # cities (higher = less effect)        |
| 9      | 8     | 8               | Aqueduct needed to exceed this city size                    |
| 10     | 12    | 12              | Sewer System needed to exceed this city size                |
| 11     | 10    | 10              | Tech paradigm (higher = slower research)                    |
| 12     | 20    | 20              | Base time for engineers to transform terrain (×2)           |
| 13     | 3     | 3               | Monarchy pays support for all units past this #             |
| 14     | 3     | 3               | Communism pays support for all units past this #            |
| 15     | 8     | 10              | **DISCREPANCY** — Fundamentalism pays support past this #; RULES.TXT=10, memory=8 |
| 16     | 1     | 0               | **DISCREPANCY** — Communism = equivalent of this palace distance; RULES.TXT=0, memory=1 |
| 17     | 50    | 50              | Fundamentalism loses this % of science                      |
| 18     | 50    | 50              | Percent shield penalty for production type change           |
| 19     | 10    | 10              | Max paradrop range                                          |
| 20     | 75    | 75              | Mass/Thrust paradigm (increasing slows spaceship time)      |
| 21     | 5     | 5               | Max effective science rate in fundamentalism (×10, so 5=50%) |

## Cross-Validation Notes

- 20/22 values match RULES.TXT exactly ✓
- **Offset 15 discrepancy:** RULES.TXT says 10, memory shows 8
  - Possible explanation: runtime modification, different loaded scenario, or file edited after last launch
- **Offset 16 discrepancy:** RULES.TXT says 0, memory shows 1
  - Same possible explanations

## JavaScript Usage

```javascript
// Read cosmic params from save file or hardcode defaults
const COSMIC = {
  roadMovementMultiplier:  3,
  triremeChanceLost:       2,   // 1-in-2 per turn
  foodPerCitizen:          2,
  foodBoxRows:             10,
  shieldBoxRows:           10,
  settlersEatMonarchy:     1,
  settlersEatCommunism:    2,
  unhappySize:             7,
  riotFactor:              14,
  aqueductLimit:           8,
  sewerLimit:              12,
  techParadigm:            10,
  engineerTransformBase:   20,
  monarchySupportFree:     3,
  communismSupportFree:    3,
  fundySupportFree:        10,   // from RULES.TXT (memory shows 8 — investigate)
  communismPalaceEquiv:    0,    // from RULES.TXT (memory shows 1 — investigate)
  fundyScienceLoss:        50,
  productionChangePenalty: 50,
  maxParadropRange:        10,
  massThrustParadigm:      75,
  maxFundyScience:         5,    // × 10 = 50%
};
```
