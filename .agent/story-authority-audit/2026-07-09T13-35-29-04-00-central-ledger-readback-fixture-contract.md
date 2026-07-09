# Story Authority Audit - Central Ledger Readback Fixture Contract

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Why this audit exists

The repo-local `.agent` state had advanced beyond the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

That drift is the exact kind of state the next source-owned fixture should detect.

## Current source authority problem

`src/game.js` owns the story authority inside browser functions.

```txt
loadState()
saveState()
hasClue()
grantClues()
writeLog()
sceneComplete()
inspectHotspot()
showInterlude()
nextScene()
renderUi()
keydown reset
```

These functions do the right visible work, but they do not emit reusable result facts.

## Required source-owned readback facts

```txt
StorySourceManifest:
  productId: the-unmapped-house
  routeId: fixed-camera-stage-prototype
  sourceVersion
  saveKey
  publicEntry: index.html
  storyModule: src/story-data.js
  runtimeModule: src/game.js
  renderModule: src/stage-kit.js

RepoLocalLedgerReadback:
  startHerePath
  currentAuditPath
  knownGapsPath
  nextStepsPath
  validationPath
  kitRegistryPath
  latestTrackerPath
  latestTurnLedgerPath
  latestArchitectureAuditPath
  latestRenderAuditPath
  latestInteractionAuditPath
  latestGameplayAuditPath
  latestStoryAuthorityAuditPath
  latestDeployAuditPath

CentralLedgerReadback:
  centralRepo: LuminaryLabs-Dev/LuminaryLabs
  ledgerPath: repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
  internalChangeLogPath
  latestReviewedTimestamp
  selectedRepo
  status
  pointerParity
```

## Source fixture should fail when

```txt
repo-local START_HERE points to a missing tracker
kit-registry latestTracker does not match START_HERE
central ledger latest tracker does not match repo-local latest tracker
central ledger timestamp is older than repo-local timestamp after a breakdown pass
fixture rows omit central ledger readback
browser diagnostics omit ledger readback
```

## Result statuses needed

```txt
repo_local_sync
central_sync
readback
accepted
rejected
no_mutation
terminal
```

## Main story authority finding

The next source pass should not treat ledger parity as documentation only.

It should make repo-local and central ledger parity part of the same fixture row set that proves story command behavior.
