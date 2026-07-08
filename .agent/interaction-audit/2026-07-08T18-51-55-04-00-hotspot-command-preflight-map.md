# Interaction Audit: Hotspot Command Preflight Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T18-51-55-04-00`

## Current interaction loop

```txt
hotspot button click or StageKit raycast click
  -> passes full hotspot descriptor into inspectHotspot(hotspot)
  -> inspectHotspot checks state.inspected[currentScene.id]
  -> repeat path writes text/log and saves
  -> first-inspect path marks inspected, grants clues, writes text/log
  -> sceneComplete checks requiresToComplete against state.clues
  -> completion path schedules showInterlude(currentScene)
  -> renderUi and saveState run from same function
```

## Current issue

The interaction event skips a command boundary. The handler receives a mutable hotspot object, reads module-level state, mutates state, mutates DOM text, schedules interlude, rebuilds buttons, and writes localStorage.

That makes it hard to test:

```txt
unknown hotspot
repeat hotspot
scene already complete
scene incomplete continue
completed scene transition
prototype terminal continue
malformed loaded state
```

## Target command preflight

```txt
input source:
  side_panel_button | stage_hotspot_click | keyboard_reset | continue_button | save_load_boot

StoryCommandEnvelope:
  id
  type
  source
  sceneId
  hotspotId?
  issuedAtFrame?
  payload?

StoryPreflight:
  sourceSnapshotOk
  stateSnapshotOk
  sceneExists
  hotspotExists
  commandAllowed
  reason

StoryCommandResult:
  status
  reason
  stateBefore
  stateAfter
  events[]
  storyProjection
  saveProjection
  interludeProjection
  stageProjection
```

## Required interaction result rows

```txt
inspect_first_hotspot:
  accepted / hotspot_inspected / clue granted / save requested.

repeat_hotspot:
  no_mutation / hotspot_repeated / no duplicate clue / save requested only if compatibility requires it.

unknown_hotspot:
  rejected / hotspot_unknown / no mutation / no save.

scene_incomplete_continue:
  rejected / scene_incomplete / no route mutation / no StageProjection.

completed_scene_continue:
  accepted / scene_transitioned / next scene StageProjection emitted.

prototype_complete_continue:
  terminal / prototype_complete / terminal story projection emitted.

reset_save:
  accepted / reset_requested / clear-save intent emitted.
```

## Host adapter rule

`src/game.js` may remain the host, but it should stop deciding story outcomes. It should create command envelopes, call the reducer, then consume projections.

## Next safe ledge

```txt
TheUnmappedHouse Story Preflight Result Fixture Contract + Stage Projection Readback Gate
```
