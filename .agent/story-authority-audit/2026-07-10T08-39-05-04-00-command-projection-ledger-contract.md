# Story authority audit: command projection ledger contract

Timestamp: `2026-07-10T08-39-05-04-00`

## Contract goal

Move story truth out of browser side effects without changing visible behavior.

## Current owner

`src/game.js` currently owns:

```txt
initial state creation
localStorage merge
current scene resolution
hotspot inspection command handling
repeat inspection handling
clue grants
completion detection
interlude scheduling
continue route handling
terminal copy
StageKit scene load calls
DOM projection
save writes
reset handling
debug JSON projection
```

## Required source-owned contract

```txt
StorySourceManifest
  gameTitle
  scenes
  hotspot ids
  clue ids
  completion rows
  interlude rows
  stage descriptor fingerprints

StoryCommandEnvelope
  commandId
  commandType
  sceneId
  hotspotId when applicable
  issuedBy
  sourceTime/frame optional

StoryPreflight
  accepted/rejected
  reasonCode
  currentSceneId
  commandSceneId
  commandHotspotId

StoryCommandResult
  commandId
  resultId
  status accepted/rejected/no_mutation
  reasonCode
  stateBeforeFingerprint
  stateAfterFingerprint
  grantedClues
  completedScene
  nextRouteIntent

StoryProjectionRecord
  title
  bodyText
  hotspotRows
  debugRows
  notebookRows

StoryAdapterLedgerRow
  resultId
  projectionId
  saveIntentId
  interludeIntentId
  stageLoadIntentId
  terminalIntentId

BrowserAdapterReadback
  consumedResultId
  domProjectionApplied
  saveApplied
  stageLoadApplied
  interludeApplied
  terminalApplied
```

## Required reason catalog

```txt
inspect.accepted.first_seen
inspect.no_mutation.already_inspected
inspect.rejected.unknown_hotspot
inspect.rejected.scene_mismatch
continue.accepted.next_scene
continue.accepted.terminal
continue.rejected.scene_not_complete
save.accepted
stage_load.accepted
projection.accepted
reset.requested
```

## Compatibility rule

Keep current browser behavior and route. The first implementation should add source records plus a fixture, then adapt `src/game.js` to consume the records.

## Do not change first

```txt
scene content
stage art
camera composition
post shader values
StageKit renderer internals
localStorage key
visible interlude copy
```
