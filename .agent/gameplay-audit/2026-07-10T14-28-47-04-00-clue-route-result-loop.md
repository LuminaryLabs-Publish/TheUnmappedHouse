# Gameplay audit: Clue Route Result Loop

Timestamp: `2026-07-10T14-28-47-04-00`

## Core loop

```txt
enter scene
  -> inspect three authored hotspots in any order
  -> each first inspection grants one authored clue
  -> required-clue policy determines scene completion
  -> completion opens an interlude after 450 ms
  -> continue advances to the next authored scene
  -> repeat for three scenes
  -> final continue shows prototype-complete terminal copy
```

## Current state model

```js
{
  sceneId,
  clues: [],
  flags: {},
  inspected: { [sceneId]: { [hotspotId]: true } },
  route: [],
  log: []
}
```

## Current gameplay strengths

- The three-scene route is deterministic.
- Hotspots are authored as source descriptors rather than hardcoded coordinates in runtime logic.
- Clue grants are idempotent because `grantClues()` avoids duplicates.
- Scene completion is derived from authored `requiresToComplete` arrays.
- Route history avoids duplicate scene ids.
- The notebook log is bounded.
- Reload persistence keeps progression available.

## Gameplay authority gaps

- The runtime accepts a live hotspot object, so source identity is implicit.
- First inspection and repeat inspection are not typed outcomes.
- Repeat inspection still writes log/UI/save effects despite no gameplay mutation.
- Completion can schedule multiple interlude timers if multiple paths invoke completion before the overlay opens.
- Continue has no explicit incomplete rejection path because the button is controlled through DOM state rather than authority preflight.
- Terminal completion is represented as direct copy rather than a terminal route result.
- Flags exist in state but have no current source policy or documented consumer.
- Save data is shallow-merged without source version migration.

## Required gameplay results

```txt
inspect accepted
  inspected hotspot transition
  clue-grant transition
  notebook-log transition
  scene-completion transition when requirements become satisfied
  projection/save intents
  interlude intent when newly completed

inspect repeat
  no_mutation/already_inspected
  optional reread projection/log intent
  no duplicate clue or completion transition

continue accepted
  route transition
  scene transition
  stage-load intent
  projection/save intents

continue terminal
  terminal_route result
  terminal projection intent

continue incomplete
  rejected/scene_incomplete
  no route, stage-load, or save mutation
```

## Deterministic fixture route

```txt
library-blank-map
  map -> clue:blank-square
  window -> clue:house-door
  shelf-gap -> clue:deep-shelf

repeating-hallway
  wrong-door -> clue:home-address
  class-number -> clue:wallpaper
  unfinished-photo -> clue:unfinished-family

closet-weather
  bucket-storm -> clue:stored-rain
  wet-shadow -> clue:wet-shadow
  closet-map -> clue:west-wing
```

The DOM-free fixture should prove all three scenes, every authored hotspot/grant pair, completion order independence, repeat idempotence, route progression, terminal result, and replay equality.

## Defer until proof exists

```txt
additional rooms
inventory
branching routes
flags-based story rules
audio
new failure states
```
