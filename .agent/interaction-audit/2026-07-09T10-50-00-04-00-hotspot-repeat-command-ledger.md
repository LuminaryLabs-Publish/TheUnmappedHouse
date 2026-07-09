# Interaction Audit: Hotspot Repeat Command Ledger

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T10-50-00-04-00`

## Current interaction path

```txt
button click or StageKit raycast click
  -> inspectHotspot(hotspot)
  -> if first inspection:
       mark inspected
       grant clues
       write text
       write log
       maybe schedule interlude
       render UI
       save state
  -> if repeat inspection:
       write text
       write re-read log
       render UI
       save state
```

## Main issue

Repeat hotspot interaction is not wrong visually, but it is not represented as a source-owned result.

The same function decides command handling, mutation, UI projection, completion, interlude scheduling, and save. This makes it hard to prove that repeat interaction is intentionally `no_mutation`, that clues do not duplicate, and that save/interlude/stage projections are correct.

## Required command reasons

```txt
hotspot_first_inspection_accepted
hotspot_repeat_no_mutation
hotspot_unknown_rejected
scene_completion_met
scene_completion_not_met
scene_continue_accepted
scene_continue_rejected_incomplete
scene_continue_terminal
save_projection_created
interlude_projection_created
stage_projection_created
browser_adapter_plan_created
browser_adapter_readback_created
central_ledger_snapshot_created
```

## Required fixture rows

```txt
inspect_first_hotspot
repeat_hotspot_no_mutation
unknown_hotspot_rejected
scene_incomplete_continue_rejected
complete_library_scene
continue_to_repeating_hallway
complete_all_scenes
prototype_terminal_result
```

## Next cut

Create command envelopes and command results before editing browser behavior.

After fixture rows pass, adapt both side-panel buttons and StageKit raycast clicks to dispatch the same `story.inspect_hotspot` command.
