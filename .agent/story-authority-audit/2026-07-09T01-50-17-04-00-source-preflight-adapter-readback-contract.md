# Story Source Preflight Adapter Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Contract goal

Move source and story authority out of `src/game.js` without changing the public route, current story copy, StageKit behavior, save key, or static deployment.

## Required source contracts

```txt
StorySourceManifest:
  productId
  routeId
  publicEntry
  saveKey
  sourceVersion
  commandTypes
  reasonCatalog
  sceneIds

StorySourceSnapshot:
  scenes
  grantableClues
  requiredClues
  duplicateSceneIds
  duplicateHotspotIds
  descriptorHashes

StageSceneSnapshot:
  camera
  layers
  props
  hotspots
  post
  validation

StoryStateSnapshot:
  sceneId
  clues
  flags
  inspected
  route
  log
  normalized
  sourceVersion
```

## Required preflight checks

```txt
duplicate scene ids rejected
duplicate hotspot ids rejected per scene
required clues must be grantable
loaded state shape normalized or rejected
current scene must exist
target hotspot must exist
continue requires complete scene unless terminal
reset returns clear-save intent
```

## Required adapter/readback records

```txt
StoryBrowserAdapterPlan:
  text updates
  hotspot button updates
  notebook/debug updates
  save projection
  interlude projection
  stage projection
  host diagnostics projection

BrowserAdapterReadback:
  consumedText
  consumedHotspots
  consumedNotebook
  consumedSave
  consumedInterlude
  consumedStageProjection
  consumedGameHostDiagnostics
  skippedFields
  warnings

CentralLedgerReadback:
  repo
  timestamp
  latestTracker
  latestAudits
  latestTurnLedger
  centralLedgerPath
  centralChangeLogPath
  status
```

## Acceptance boundary

The first implementation should pass DOM-free fixtures before browser adapters are trusted.

`src/game.js` should become the host adapter that consumes plans and reports readback.
