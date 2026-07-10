# Story authority audit — Source command adapter contract

Timestamp: `2026-07-10T07-20-08-04-00`

## Authority status

Story descriptors are source-owned in `src/story-data.js`, but story command authority is still browser-owned in `src/game.js`.

## Contract to add

```txt
StorySourceManifest
  gameTitle
  sceneIds
  hotspotIdsByScene
  completionRequirements
  interludeIds

StoryStateSnapshot
  sceneId
  clues
  inspected
  route
  logHead

StoryCommandEnvelope
  commandId
  type
  sceneId
  hotspotId optional

StoryPreflight
  accepted
  reasonCode
  currentSceneId
  commandSceneId

StoryCommandResult
  status
  reasonCode
  before
  after
  grantedClues
  completion
  projectionRecord
  saveIntent
  interludeIntent
  terminalRouteIntent
  stageLoadIntent

BrowserAdapterReadback
  commandId
  resultId
  domProjection
  saveWrite
  interludeMutation
  stageLoad
  debugProjection
```

## Required reason codes

```txt
accepted
already_inspected
unknown_hotspot
scene_mismatch
missing_scene
not_complete
next_scene
terminal_route
reset_requested
```

## Fixture contract

A DOM-free fixture should prove:

```txt
initial state resolves first scene
first hotspot inspect accepts and grants clue
repeat hotspot inspect returns no_mutation
unknown hotspot rejects
scene-mismatched hotspot rejects
all required clues complete scene
continue loads next scene
final continue returns terminal route
save/interlude/stage-load/projection intents are serializable
legacy visible route can consume the records
```
