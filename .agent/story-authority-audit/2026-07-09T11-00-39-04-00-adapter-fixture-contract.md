# Adapter Fixture Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T11-00-39-04-00`

## Contract to add in source

```txt
StorySourceManifest
  productId
  routeId
  sourceVersion
  saveKey
  sceneIds
  commandIds
  publicEntryRoute
  repoLocalLedgerExpectations
  centralLedgerExpectations

StoryCommandResult
  commandId
  status
  reason
  events
  nextState
  storyProjection
  saveProjection
  interludeProjection
  stageProjection
  browserAdapterPlan

RepoLocalLedgerReadback
  timestamp
  rootStartPath
  currentAuditPath
  nextStepsPath
  knownGapsPath
  validationPath
  kitRegistryPath
  trackerPath
  turnLedgerPath
  auditPaths
  pathsExist
  timestampConsistent
  status
  reason

CentralLedgerReadback
  centralRepo
  ledgerPath
  latestReviewed
  latestTracker
  latestTurnLedger
  latestAuditPointers
  internalChangeLog
  matchesRepoLocal
  status
  reason
```

## Acceptance

A future fixture should fail when root `.agent` docs point to a timestamped path that does not exist, when central ledger points to stale repo-local paths, or when browser adapters mutate story state without consuming a source-owned command result.
