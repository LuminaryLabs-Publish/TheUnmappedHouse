# Gameplay Audit — Story Command Route Replay Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

## Current gameplay loop

The current gameplay is a compact point-and-click story route:

```txt
scene opens
  -> player inspects all required hotspots
  -> each hotspot grants one clue
  -> sceneComplete(scene) checks requiresToComplete against state.clues
  -> completed scene schedules interlude
  -> Continue advances to the next scene
  -> route records scene ids
  -> final Continue writes prototype-complete copy
```

## Scenes and completion gates

```txt
library-blank-map:
  required clues:
    clue:blank-square
    clue:house-door
    clue:deep-shelf

repeating-hallway:
  required clues:
    clue:home-address
    clue:wallpaper
    clue:unfinished-family

closet-weather:
  required clues:
    clue:stored-rain
    clue:wet-shadow
    clue:west-wing
```

## Gameplay authority gap

The gameplay design is clear, but the rules are not yet source-owned.

`src/game.js` owns:

```txt
inspected hotspot map
clue grant uniqueness
log ordering
scene completion
interlude opening
scene transition
prototype complete branch
save/load/reset behavior
current debug projection
```

That prevents deterministic replay of the route without DOM, StageKit, localStorage, and timer behavior.

## Target replay loop

```txt
StoryFixtureCase[]
  -> createStorySourceManifest
  -> createInitialStoryState or normalizeLoadedStoryState
  -> dispatch StoryCommandEnvelope rows
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryStateSnapshot after each row
  -> StoryProjection / SaveProjection / InterludeProjection / StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> FixtureSummary
```

## Required gameplay proof rows

```txt
initial_state
load_empty_state
load_malformed_state
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_state
load_state
reset_save
```

## Status and reasons to prove

```txt
accepted:
  initial_state_created
  hotspot_inspected
  scene_completed
  scene_transitioned
  save_requested
  projection_updated

rejected:
  loaded_state_rejected
  hotspot_unknown
  scene_incomplete
  invalid_command
  invalid_scene_id

no_mutation:
  hotspot_repeated
  source_snapshot_created
  stage_scene_snapshot
  browser_adapter_readback_created

terminal:
  prototype_complete
```

## Next gameplay-safe implementation

Add story-authority fixture rows first.

Then let `src/game.js` consume those rows and projections.

Do not add more story content until the three-scene route can replay in a fixture with accepted, rejected, no-mutation, terminal, projection, save, reset, adapter, readback, and GameHost rows.
