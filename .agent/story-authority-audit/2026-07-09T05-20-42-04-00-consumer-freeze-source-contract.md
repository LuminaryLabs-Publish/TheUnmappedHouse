# Story Authority Audit: Consumer Freeze Source Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Problem statement

The repo already has a coherent story source and a coherent render consumer, but the browser host still owns source authority.

`src/game.js` should become a consumer of source-owned records rather than the place where command rules, save behavior, interlude behavior, and debug facts are invented.

## Source contract to add

```txt
StorySourceManifest:
  productId
  routeId
  sourceVersion
  publicEntry
  saveKey
  sceneIds
  commandTypes
  diagnosticFields
  centralLedgerExpectations

StorySourceSnapshot:
  sceneCount
  hotspotCount
  clueGrantSet
  completionRequirementSet
  interludeCount
  descriptorHash

StoryPreflight:
  status
  reason
  sceneValid
  hotspotValid
  commandValid
  stateValid
  saveValid
  stageDescriptorValid
```

## Command/result contract

```txt
StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
```

Every current branch in `inspectHotspot`, `nextScene`, `loadState`, `saveState`, and reset handling should return a result record before the browser mutates DOM or localStorage.

## Projection contract

```txt
StoryProjection:
  title
  bodyText
  hotspotButtonRows
  debugSummary
  route
  latestLog

SaveProjection:
  shouldWrite
  shouldClear
  saveKey
  value
  reason

InterludeProjection:
  open
  title
  text
  delayMs
  reason

StageProjection:
  shouldLoadScene
  sceneId
  reason
  expectedHotspots
```

## Adapter readback contract

```txt
StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> CentralLedgerReadback
```

The adapter plan is what the DOM host should do.

The readback is what the DOM host says it actually consumed.

The diagnostics surface should be additive and not remove the existing visible debug panel.

## Consumer freeze

Before moving behavior, freeze current browser-consumed facts:

```txt
SAVE_KEY
gameTitle
scene ids
hotspot ids
required clues
interlude titles/text
opening text
route order
repeat-inspection behavior
terminal prototype-complete copy
StageKit scene load timing
```

## Next source files

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-preflight.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/central-ledger-readback.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```
