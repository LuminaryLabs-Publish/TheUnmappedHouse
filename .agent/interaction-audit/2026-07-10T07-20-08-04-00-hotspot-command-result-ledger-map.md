# Interaction audit — Hotspot command result ledger map

Timestamp: `2026-07-10T07-20-08-04-00`

## Current interaction route

```txt
side-panel button or StageKit raycast click
  -> inspectHotspot(hotspot)
  -> repeat check via state.inspected[currentScene.id][hotspot.id]
  -> first inspection mutates inspected state
  -> grantClues(hotspot.grants)
  -> write text and log
  -> sceneComplete(currentScene)
  -> optional setTimeout(showInterlude)
  -> renderUi()
  -> saveState()
```

## Current gap

The interaction behaves correctly for the prototype, but it has no command ledger.

Missing rows:

```txt
accepted first inspection
repeat no_mutation inspection
unknown hotspot rejection
stale hotspot rejection
scene mismatch rejection
completion result
interlude intent
projection record
save intent
```

## Command ledger target

```txt
StoryCommandEnvelope
  commandId
  type: inspect_hotspot | continue_scene | reset
  sceneId
  hotspotId
  timestamp/frame optional

StoryCommandResult
  status: accepted | rejected | no_mutation
  reasonCode
  beforeSnapshot
  afterSnapshot
  grantedClues
  projectionRecord
  saveIntent
  interludeIntent
  stageLoadIntent
```

## Adapter target

`src/game.js` should become a browser adapter that consumes source-owned result records instead of owning the story decision itself.
