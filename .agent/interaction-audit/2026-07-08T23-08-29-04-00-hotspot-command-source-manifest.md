# Interaction Audit: Hotspot Command Source Manifest

**Timestamp:** `2026-07-08T23-08-29-04-00`

## Current interaction ownership

Two browser surfaces dispatch the same story action:

```txt
side-panel hotspot button
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> clickHotspot()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

`inspectHotspot` currently acts as dispatcher, validator, reducer, clue ledger, text projector, log writer, completion detector, interlude scheduler, UI projector, and save trigger.

## Required interaction contract

Both browser surfaces should dispatch the same command envelope.

```txt
StoryCommandEnvelope = {
  commandType: "story.inspect_hotspot",
  source: "side-panel" | "stage-raycast" | "fixture",
  sceneId,
  hotspotId,
  sourceManifestId,
  inputFrame,
  payload
}
```

## Source manifest facts

```txt
StorySourceManifest = {
  productId: "the-unmapped-house",
  routeId: "stage-prototype-v1",
  entry: "index.html -> src/game.js",
  saveKey: "the-unmapped-house.stage-prototype.v1",
  scenes: ["library-blank-map", "repeating-hallway", "closet-weather"],
  commandTypes: [
    "story.inspect_hotspot",
    "story.continue_scene",
    "story.load_state",
    "story.save_state",
    "story.reset_save",
    "story.project",
    "story.snapshot_stage",
    "story.browser_adapter_plan"
  ]
}
```

## Required command results

```txt
inspect_first_hotspot:
  status: accepted
  reason: hotspot_inspected
  mutation: inspected=true, grant new clue, append log

repeat_hotspot:
  status: no_mutation
  reason: hotspot_repeated
  mutation: no duplicate clue, log readback allowed

unknown_hotspot:
  status: rejected
  reason: hotspot_unknown
  mutation: none

scene_complete_after_inspect:
  status: accepted
  reason: scene_completed
  events: hotspot_inspected, clue_granted, scene_completed
  projections: story, save, interlude
```

## Browser adapter rule

The DOM host may still attach event listeners, update text, update buttons, set interlude classes, write localStorage, and call `stage.loadScene`.

The DOM host should not decide whether a hotspot is valid, whether a room is complete, which clue is granted, whether a scene transition is allowed, or whether the route has reached prototype completion.

## Fixture rows

```txt
side_panel_inspect_first_hotspot
stage_raycast_inspect_first_hotspot
repeat_hotspot_no_duplicate_clue
unknown_hotspot_rejected
complete_room_after_last_required_hotspot
incomplete_continue_rejected
continue_after_completed_room_accepted
prototype_complete_continue_terminal
```

## Acceptance criteria

```txt
Both side-panel and StageKit click paths create equivalent StoryCommandEnvelope records.
Repeated inspection is an explicit no_mutation result.
Unknown hotspot is an explicit rejected result.
Scene completion is event-record driven.
The browser receives a StoryBrowserAdapterPlan after each result.
```
