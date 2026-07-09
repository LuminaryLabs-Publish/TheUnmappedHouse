# Inspection Command Result Plan

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Current interaction authority

`inspectHotspot(hotspot)` is currently the interaction boundary and the reducer.

It directly does all of this:

```txt
reads currentScene
reads/modifies state.inspected
adds clues through grantClues
writes scene text directly into the DOM
writes notebook log entries
checks scene completion
schedules showInterlude with setTimeout
calls renderUi
calls saveState
returns undefined
```

`nextScene()` directly advances route state and renderer state.

```txt
find current scene index
choose next scene
terminal path writes prototype-complete text directly into interlude DOM
otherwise mutate currentScene, state.sceneId, and state.route
close interlude DOM
call stage.loadScene(currentScene)
render UI
save state
```

## Required interaction domains

```txt
story-command-envelope:
  service: wrap UI button clicks, StageKit raycast clicks, continue clicks, reset key, save/load/projection/readback checks.

inspection-preflight:
  service: validate current scene, target hotspot id, duplicate inspection, known grant ids, source version.

inspection-result:
  service: accepted first inspection, no_mutation repeated inspection, rejected unknown hotspot.

clue-ledger-reducer:
  service: create clue delta without duplicate grants.

scene-completion-result:
  service: report incomplete/complete scene with required clues and newly satisfied clues.

scene-transition-result:
  service: continue only when the current scene is complete; route to next scene or terminal prototype-complete state.

story-event-record:
  service: hotspot_inspected, clue_granted, hotspot_repeated, scene_completed, scene_transitioned, prototype_complete, save_requested.

browser-adapter-plan:
  service: tell the browser which text, list labels, debug, save, interlude, and stage actions to perform.

browser-adapter-readback:
  service: prove which plan operations were consumed.
```

## Required command ids

```txt
story.inspect_hotspot
story.continue_scene
story.load_state
story.save_state
story.reset_save
story.project
story.validate_source
story.snapshot_stage
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

## Required reason families

```txt
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
source_preflight_passed
source_preflight_rejected
save_requested
reset_requested
projection_updated
stage_projection_requested
browser_adapter_plan_created
browser_adapter_readback_created
gamehost_projection_created
central_ledger_readback_created
central_ledger_caught_up
```

## Fixture rows

```txt
inspect_first_hotspot:
  command: story.inspect_hotspot
  expected: accepted, clue delta, inspected delta, log event, save projection

repeat_hotspot:
  command: story.inspect_hotspot
  expected: no_mutation, no duplicate clue, repeated reason, text projection still allowed

unknown_hotspot:
  command: story.inspect_hotspot
  expected: rejected, no state mutation, no save write

scene_incomplete_continue:
  command: story.continue_scene
  expected: rejected, reason scene_incomplete, no route mutation

complete_library_scene:
  command sequence: inspect all library hotspots
  expected: scene_completed event, interlude projection open

continue_to_hallway:
  command: story.continue_scene
  expected: accepted, route delta, stage projection load repeating-hallway

prototype_complete_continue:
  command: story.continue_scene from final completed scene
  expected: terminal, prototype_complete reason, no next scene load
```

## Source splice rule

Keep `StageKit` callbacks and visible buttons, but make both dispatch `StoryCommandEnvelope` records.

`src/game.js` should become the adapter that applies `StoryBrowserAdapterPlan`, not the source of story truth.
