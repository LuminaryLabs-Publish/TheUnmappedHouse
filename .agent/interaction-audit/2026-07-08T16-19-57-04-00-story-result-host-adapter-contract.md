# Story Result Host Adapter Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T16-19-57-04-00`

## Current interaction problem

The host currently owns story rules.

`inspectHotspot(hotspot)` dispatches the command, mutates story state, grants clues, writes text/log output, checks completion, schedules interlude, renders UI, and saves.

`nextScene()` mutates route state, DOM interlude state, StageKit scene state, UI, and save state.

## Target host adapter

`src/game.js` should become a consumer of source-owned results and projections.

```txt
DOM button click or StageKit callback
  -> createStoryCommandEnvelope({ type, sceneId, hotspotId, source })
  -> applyStoryCommand(sourceSnapshot, stateSnapshot, command)
  -> receive StoryCommandResult
  -> projectStoryUiState(result)
  -> projectSaveIntent(result)
  -> projectInterludeIntent(result)
  -> render DOM from projections
  -> update localStorage from SaveProjection only
  -> update window.GameHost diagnostics additively
```

## Required command result shape

```txt
StoryCommandResult:
  id
  commandId
  type
  status: accepted | rejected | no_mutation | terminal
  reason
  before
  after
  events[]
  projection
  saveProjection
  interludeProjection
  diagnostics
```

## Required host adapter invariants

```txt
The host may read DOM events.
The host may call StageKit.loadScene().
The host may render buttons and text from StoryProjection.
The host may write or clear localStorage from SaveProjection.
The host may open/close interlude DOM from InterludeProjection.
The host must not decide clue grants, completion, route transition, repeat-inspection behavior, or terminal state.
```

## Stable reasons needed

```txt
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
invalid_command
invalid_scene_id
loaded_state_normalized
loaded_state_rejected
save_requested
reset_requested
projection_updated
```

## Fixture rows

```txt
inspect_first_hotspot -> accepted / hotspot_inspected
repeat_hotspot -> no_mutation / hotspot_repeated
unknown_hotspot -> rejected / hotspot_unknown
scene_incomplete_continue -> rejected / scene_incomplete
complete_library_scene -> accepted / scene_completed
continue_to_hallway -> accepted / scene_transitioned
prototype_complete_continue -> terminal / prototype_complete
save_state -> accepted / save_requested
reset_save -> accepted / reset_requested
```
