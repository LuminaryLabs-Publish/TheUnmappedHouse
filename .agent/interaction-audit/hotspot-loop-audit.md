# Interaction Audit: Hotspot Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T01:50:19-04:00`

## Current loop

```txt
player opens page
  -> state loads from localStorage or initial state
  -> current scene loads into StageKit
  -> side panel renders hotspot buttons
  -> pointer hover uses raycaster against invisible hotspot meshes
  -> click or button invokes inspectHotspot(hotspot)
  -> inspected map updates
  -> clue list updates
  -> notebook log updates
  -> sceneComplete checks required clues
  -> completed scene opens interlude
  -> continue button moves to next scene
  -> route and state persist
```

## Interaction inputs

```txt
renderer pointer movement
renderer pointer click
side-panel hotspot button click
continue button click
KeyR reset
saved localStorage payload
```

## Interaction outputs

```txt
scene text update
hotspot button checkmark
notebook debug JSON
hover label
interlude overlay
scene transition
localStorage write
```

## Current authority problem

The same host script currently does all of this:

```txt
reads DOM
receives input
mutates story state
awards clues
checks completion
triggers interlude
moves to next scene
writes localStorage
projects debug UI
```

That makes the loop hard to validate outside the browser.

## Desired command shape

### Inspect hotspot

```txt
command:
  type: inspect_hotspot
  sceneId: current scene id
  hotspotId: target hotspot id
  source: renderer_click | side_panel_button | fixture

result:
  status: accepted | rejected
  reason: ok | unknown_hotspot | wrong_scene | malformed_command
  grantedClues[]
  alreadyInspected: boolean
  sceneComplete: boolean
  text
  logEntry
  nextUiHint
```

### Continue scene

```txt
command:
  type: continue_scene
  sceneId: current scene id

result:
  status: accepted | rejected
  reason: ok | scene_incomplete | no_next_scene | malformed_command
  previousSceneId
  nextSceneId
  route[]
  interludeClosed: boolean
```

### Reset save

```txt
command:
  type: reset_save

result:
  status: accepted
  reason: ok
  stateSnapshot
  saveIntent: clear
```

## Required fixture matrix

```txt
inspect first hotspot once
inspect first hotspot twice
inspect all first-room hotspots
attempt unknown hotspot
attempt continue before complete
continue after complete
run full scene route
load malformed save
load valid save
reset save
```

## UI safety rule

The UI may decide how to display the result.

The UI should not decide whether a command is valid or which story state mutation happens.