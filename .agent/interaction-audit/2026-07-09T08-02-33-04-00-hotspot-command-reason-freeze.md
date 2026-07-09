# Interaction Audit — Hotspot Command Reason Freeze

**Timestamp:** `2026-07-09T08-02-33-04-00`

## Current interaction behavior

```txt
StageKit click or sidebar button
  -> inspectHotspot(hotspot)
  -> if already inspected, write text/log/render/save and return
  -> otherwise mark inspected
  -> grant hotspot.clues
  -> write text/log
  -> if sceneComplete(currentScene), schedule showInterlude(currentScene)
  -> renderUi()
  -> saveState()
```

`continueButton` calls `nextScene()` directly.

`KeyR` clears localStorage and reloads.

## Missing command records

```txt
story.inspect_hotspot
story.continue_scene
story.reset_save
story.load_state
story.save_state
story.project
story.validate_source
story.snapshot_stage
story.browser_adapter_plan
story.browser_adapter_readback
story.central_ledger_readback
```

## Reason code freeze

The next implementation should reserve stable reasons before browser splice:

```txt
accepted:first_inspection
no_mutation:repeat_inspection
rejected:unknown_hotspot
rejected:scene_incomplete
accepted:scene_complete
accepted:continue_to_next_scene
terminal:prototype_complete
normalized:empty_save
normalized:malformed_save
rejected:duplicate_scene_id
rejected:duplicate_hotspot_id
rejected:ungrantable_required_clue
readback:stage_projection_consumed
readback:browser_adapter_plan_consumed
readback:central_ledger_snapshot_created
```

## Adapter rule

A DOM button or StageKit click should create a command envelope.

It should not mutate story state directly.

The reducer should produce `StoryCommandResult`, and the browser adapter should consume `StoryBrowserAdapterPlan`.