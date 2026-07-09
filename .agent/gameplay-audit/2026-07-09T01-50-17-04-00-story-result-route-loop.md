# Story Result Route Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Current gameplay/story loop

```txt
library-blank-map
  -> inspect three hotspots
  -> collect clue:blank-square, clue:house-door, clue:deep-shelf
  -> sceneComplete returns true
  -> show interlude
  -> continue to repeating-hallway
  -> inspect three hotspots
  -> continue to closet-weather
  -> inspect three hotspots
  -> prototype complete
```

## Current state model

```txt
sceneId
clues[]
flags{}
inspected{ sceneId: { hotspotId: true } }
route[]
log[]
```

## Current story risks

```txt
scene fallback is silent
malformed saves are shallow-merged
completion requirements are not validated against grants before runtime
repeated inspections do not return a typed no-mutation result
prototype completion writes text directly to DOM
route transitions are not journaled
save decisions are not projected
```

## Required route result records

```txt
InspectionResult:
  sceneId
  hotspotId
  status
  reason
  grantedClues
  logEntry
  text
  before
  after

SceneCompletionResult:
  sceneId
  requiredClues
  presentClues
  complete
  reason

SceneTransitionResult:
  fromSceneId
  toSceneId
  routeDelta
  status
  reason

PrototypeCompleteResult:
  sceneId
  status: terminal
  reason: prototype_complete
```

## Fixture route

```txt
initial_state
inspect map
repeat map
inspect window
inspect shelf-gap
scene incomplete/complete checks
continue to repeating-hallway
continue with incomplete hallway rejected
complete hallway
continue to closet-weather
complete closet
prototype_complete_continue terminal
save/load/reset projections
```

## Gameplay rule

Do not add more rooms or inventory until the existing three-scene route is fixture-proven as command results.
