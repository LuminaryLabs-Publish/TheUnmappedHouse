# Gameplay Audit — Story Route Save Adapter Loop

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Current gameplay loop

The gameplay loop is simple and clear:

```txt
inspect all required hotspots in a scene
  -> clues are granted
  -> scene completion becomes true
  -> interlude opens
  -> continue advances to next scene
  -> route records visited scene ids
  -> save is written
```

The current three scene route is:

```txt
library-blank-map
  -> repeating-hallway
  -> closet-weather
  -> terminal prototype-complete state
```

## Current source facts

```txt
src/story-data.js owns the scene list, hotspots, grants, requirements, and interlude copy.
src/game.js owns the mutable route, clue ledger, inspected hotspot map, log, save/load, and terminal route behavior.
```

## Current gameplay risk

The visible behavior works, but there is no typed gameplay result for:

```txt
first hotspot inspection
repeat hotspot inspection
unknown hotspot attempt
scene completion
continue while incomplete
continue to next scene
continue after final scene
save write
save reset
malformed save fallback
```

Without typed results, future additions can accidentally change story progression, duplicate clues, skip interludes, or produce unprovable save state.

## Next gameplay proof

```txt
StoryFixtureCase
  -> StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> expected state snapshot
```

## Fixture rows needed

```txt
initial_state_created
inspect_first_hotspot
repeat_hotspot_no_mutation
unknown_hotspot_rejected
scene_incomplete_continue_rejected
complete_library_scene
continue_to_repeating_hallway
complete_all_scenes
prototype_terminal_result
save_projection_created
reset_save_requested
load_malformed_state_normalized
```

## Recommendation

Do not add rooms or inventory until route/save/interlude results are source-owned and replayable without DOM, WebGL, or localStorage.
