# Room Progress Result Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T14-31-06-04-00`

## Goal

Make the current room progression loop fixture-readable before adding more content.

## Current gameplay loop

```txt
read room opening text
  -> inspect three authored hotspots
  -> each first inspection grants clue(s)
  -> repeated inspection only re-reads text and logs a repeat
  -> room completes when requiresToComplete clues are all present
  -> interlude opens after a timer
  -> Continue advances to the next scene
  -> final scene reaches prototype complete text
```

## Current scenes

```txt
library-blank-map:
  completion: clue:blank-square, clue:house-door, clue:deep-shelf
  hotspots: map, window, shelf-gap

repeating-hallway:
  completion: clue:home-address, clue:wallpaper, clue:unfinished-family
  hotspots: wrong-door, class-number, unfinished-photo

closet-weather:
  completion: clue:stored-rain, clue:wet-shadow, clue:west-wing
  hotspots: bucket-storm, wet-shadow, closet-map
```

## Gameplay result contracts needed

```txt
InspectionResult:
  proves hotspot accepted, repeated, or rejected

ClueGrantResult:
  proves which clues were newly granted and which were already present

SceneCompletionResult:
  proves incomplete, newly complete, already complete, or invalid scene

SceneTransitionResult:
  proves continue accepted, rejected, or terminal prototype complete

SaveResult:
  proves state write, clear, or no-save intent

ProjectionResult:
  proves player-facing text, buttons, notebook, interlude, and debug data came from result records
```

## Gameplay reasons needed

```txt
hotspot_inspected
hotspot_repeated
hotspot_unknown
clue_granted
clue_already_present
scene_incomplete
scene_completed
scene_already_complete
scene_transitioned
prototype_complete
save_requested
reset_requested
```

## Acceptance behavior

```txt
First library hotspot:
  accepted, one clue granted, notebook prepended, save requested.

Repeated library hotspot:
  no_mutation, no duplicate clue, repeat text projected, repeat event recorded.

Unknown hotspot:
  rejected, no clue, no route change, no save write.

Continue before completion:
  rejected, scene_incomplete, no route change.

Complete library:
  accepted inspection plus scene_completed event and interlude projection.

Continue after completion:
  accepted, scene_transitioned to repeating-hallway, route appended once.

Complete final closet:
  accepted completion.

Continue after final closet:
  terminal, prototype_complete, no undefined scene fallback.
```

## Stop line

Do not add new scenes or expand horror content until the three existing scenes can be replayed as reducer fixture rows.
