# Interaction Audit: Inspect and Continue Command Contract

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Current interaction surface

```txt
hotspot list button click
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> clickHotspot()
  -> this.onHotspot(hotspot)
  -> inspectHotspot(hotspot)

continue button click
  -> nextScene()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current command authority problem

`inspectHotspot(hotspot)` is not just a handler. It is the command envelope, preflight, reducer, reason selector, event emitter, story projection, interlude scheduler, UI adapter, save adapter, and fixture boundary in one function.

`nextScene()` is also not just a handler. It selects the next route state, detects terminal completion, mutates route, hides interlude DOM, calls `stage.loadScene`, renders UI, and saves state.

## Required command types

```txt
story.inspect_hotspot
story.continue_scene
story.load_state
story.save_state
story.reset_save
story.project
story.validate_source
story.snapshot_stage
story.preflight
story.browser_adapter_plan
story.browser_adapter_readback
story.gamehost_projection
story.central_ledger_readback
```

## Required result statuses

```txt
accepted
rejected
no_mutation
terminal
projected
readback
ledger_readback
```

## Required reasons

```txt
source_manifest_created
source_snapshot_created
initial_state_created
loaded_state_normalized
loaded_state_rejected
source_preflight_passed
source_preflight_rejected
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
invalid_command
invalid_scene_id
duplicate_scene_id
duplicate_hotspot_id
ungrantable_required_clue
save_requested
reset_requested
projection_updated
stage_snapshot_created
stage_projection_requested
browser_adapter_plan_created
browser_adapter_readback_created
gamehost_projection_created
central_ledger_readback_created
central_ledger_caught_up
```

## Command envelope shape target

```txt
StoryCommandEnvelope:
  id
  type
  source
  sceneId
  hotspotId
  timestamp
  previousStateFingerprint
  payload
```

## Command result shape target

```txt
StoryCommandResult:
  id
  commandId
  type
  status
  reason
  sceneIdBefore
  sceneIdAfter
  stateChanged
  inspectedChanged
  cluesGranted
  routeChanged
  shouldSave
  shouldOpenInterlude
  shouldLoadStageScene
  events
  projections
  debug
```

## Required interaction fixture rows

```txt
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
reset_save
browser_adapter_plan
browser_adapter_readback
```

## Adapter rule

Browser callbacks may create and submit `StoryCommandEnvelope` objects.

Browser callbacks must not own command rules after the next source pass.

The browser may consume `StoryBrowserAdapterPlan` records to update DOM, save, interlude state, StageKit, and GameHost diagnostics.
