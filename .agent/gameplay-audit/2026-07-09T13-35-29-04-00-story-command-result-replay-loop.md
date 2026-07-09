# Gameplay Audit - Story Command Result Replay Loop

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Current gameplay loop

The game loop is a story inspection loop, not a movement loop.

```txt
read room opening text
  -> inspect all required hotspots
  -> collect clue grants
  -> room completion condition passes
  -> interlude opens
  -> continue to next scene
  -> repeat until terminal prototype-complete state
```

## Current scenes

```txt
library-blank-map
  required clues:
    clue:blank-square
    clue:house-door
    clue:deep-shelf

repeating-hallway
  required clues:
    clue:home-address
    clue:wallpaper
    clue:unfinished-family

closet-weather
  required clues:
    clue:stored-rain
    clue:wet-shadow
    clue:west-wing
```

## Gameplay authority gap

Completion is currently derived directly inside `src/game.js` with `sceneComplete(scene)` and command handlers mutate state immediately.

There is no replayable result ledger that proves:

```txt
which command was submitted
which source version it used
which scene was active
which hotspot was targeted
whether the hotspot existed
whether the command was accepted, rejected, no_mutation, or terminal
which clues were granted
whether completion changed
which interlude should open
which stage should load next
which save intent should be emitted
which DOM/browser projection should be consumed
```

## Fixture replay target

```txt
createInitialState
  -> inspect library map
  -> inspect library window
  -> inspect library shelf-gap
  -> scene_completed result
  -> continue to repeating-hallway
  -> repeat hallway inspections
  -> continue to closet-weather
  -> repeat closet inspections
  -> continue terminal
```

## Required fixture rows

```txt
inspect_first_hotspot accepted
repeat_hotspot_no_mutation no_mutation
unknown_hotspot_rejected rejected
scene_incomplete_continue_rejected rejected
complete_library_scene accepted
continue_to_repeating_hallway accepted
complete_all_scenes accepted
prototype_terminal_result terminal
save_projection_created readback
interlude_projection_created readback
stage_projection_created readback
browser_adapter_readback_created readback
repo_local_ledger_snapshot_created readback
central_ledger_snapshot_created readback
```

## Main gameplay finding

The story already has enough content to validate the loop.

The next gameplay work should make command results and replay rows stable before adding new rooms or mechanics.
