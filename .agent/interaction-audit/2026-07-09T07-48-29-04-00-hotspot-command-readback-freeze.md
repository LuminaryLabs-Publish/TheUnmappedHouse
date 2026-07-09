# Interaction Audit: Hotspot Command Readback Freeze

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

The interaction surface is intentionally small: side-panel buttons and StageKit raycast clicks both invoke `inspectHotspot(hotspot)`, and the continue button invokes `nextScene()`.

The problem is that these interactions are not command records. They directly mutate story state, DOM-facing text, logs, interlude state, StageKit scene loading, and saves.

## Current interaction loop

```txt
side-panel hotspot button click
  -> inspectHotspot(hotspot)

StageKit canvas pointer move
  -> StageKit.handlePointer(event)
  -> StageKit.pick()
  -> hover label projection

StageKit canvas click
  -> StageKit.clickHotspot()
  -> StageKit.pick()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)

continue button click
  -> nextScene()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current interaction decisions

```txt
repeat hotspot:
  branch inside inspectHotspot
  writes text/log/UI/save
  returns with no typed no_mutation result

first hotspot:
  mutates inspected state
  grants clues
  writes text/log
  checks completion
  schedules interlude when complete
  renders UI
  saves

continue:
  resolves next scene by current index
  mutates currentScene/state.route/interlude/stage/UI/save
  terminal route writes prototype complete text directly

reset:
  clears storage and reloads
```

## Required command envelopes

```txt
story.inspect_hotspot
story.continue_scene
story.load_state
story.save_state
story.reset_save
story.project
story.snapshot_stage
story.browser_adapter_readback
story.gamehost_projection
story.central_ledger_readback
```

## Required reason codes

```txt
hotspot_inspected_first_time
hotspot_already_inspected
hotspot_unknown
scene_completion_pending
scene_completed
continue_blocked_scene_incomplete
continue_scene_accepted
continue_terminal_prototype
save_loaded_empty
save_loaded_valid
save_loaded_malformed_normalized
save_write_requested
reset_save_requested
stage_projection_requested
browser_adapter_plan_created
browser_adapter_readback_created
gamehost_projection_created
central_ledger_snapshot_created
```

## Required result statuses

```txt
accepted
rejected
no_mutation
terminal
readback
normalized
```

## Main gap

There is no command journal or stable interaction result ledger. The browser decides what happened by object identity, DOM text, and ad hoc state mutation.

## Next interaction acceptance

A DOM-free fixture should prove:

```txt
inspect first hotspot -> accepted + clue grant + log event
inspect same hotspot again -> no_mutation + no duplicate clue
inspect unknown hotspot -> rejected + stable reason
continue incomplete scene -> rejected + stable reason
complete scene -> accepted + interlude projection
continue complete scene -> accepted + stage projection
continue after final scene -> terminal
reset -> accepted + clear-save intent, not direct reload in source authority
```

The browser should only apply the adapter plan that comes from those results.
