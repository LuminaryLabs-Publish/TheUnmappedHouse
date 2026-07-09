# Story Authority Audit: Adapter Readback Fixture Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Contract goal

Make story authority source-owned before any visual or content expansion.

## Required source contracts

```txt
StorySourceManifest:
  productId
  routeId
  saveKey
  sourceVersion
  sceneIds
  commandIds
  diagnosticsVersion
  repoLocalLedgerPaths
  centralLedgerPath

StorySourceSnapshot:
  sceneCount
  sceneIds
  hotspotIdsByScene
  requiredCluesByScene
  clueGrantsByHotspot
  interludeByScene
  cameraByScene
  stageDescriptorHashByScene

StoryStateSnapshot:
  sceneId
  clues
  flags
  inspected
  route
  log
  normalized
  normalizationReasons

StoryCommandEnvelope:
  commandId
  targetSceneId
  targetHotspotId
  sourceVersion
  requestedAt
  adapter

StoryPreflight:
  accepted
  reasons
  sourceValid
  stateValid
  commandValid
  sceneValid
  hotspotValid
  routeValid

StoryCommandResult:
  status: accepted | rejected | no_mutation
  reason
  before
  after
  events
  projections
  saveIntent
  interludeIntent
  stageIntent

StoryBrowserAdapterPlan:
  textUpdate
  titleUpdate
  hotspotListUpdate
  debugUpdate
  interludeUpdate
  stageLoad
  saveWrite
  clearSave

BrowserAdapterReadback:
  textApplied
  titleApplied
  hotspotListApplied
  debugApplied
  interludeApplied
  stageSceneApplied
  saveApplied
```

## GameHost diagnostic target

```txt
window.GameHost.getState().story = {
  sourceManifest,
  sourceSnapshot,
  latestCommand,
  latestPreflight,
  latestResult,
  latestProjection,
  latestAdapterPlan,
  latestAdapterReadback,
  saveProjection,
  interludeProjection,
  stageProjection,
  fixtureSummary,
  repoLocalLedger,
  centralLedger
}
```

## Fixture pass criteria

```txt
all command rows are deterministic
accepted rows include after-state and adapter plan
rejected rows include unchanged state and reason
no_mutation rows include unchanged state and explicit reason
save writes are represented as intents
interlude timing is represented as intent, not hidden timeout state
stage scene loads are represented as projection/readback
repo-local and central ledger pointers match this timestamp
```
