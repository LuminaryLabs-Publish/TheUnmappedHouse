# Story Authority Audit — Central Sync Fixture Contract

**Timestamp:** `2026-07-09T08-02-33-04-00`

## Source authority problem

`src/game.js` currently owns all story authority.

It should become an adapter of source-owned records.

## Required source contracts

```txt
StorySourceManifest:
  productId
  routeId
  saveKey
  sourceVersion
  sceneIds
  commandTypes
  fixtureVersion
  centralLedgerPath

StoryCommandEnvelope:
  type
  sceneId
  targetId
  source
  timestampPolicy

StoryPreflight:
  status
  reason
  sceneValid
  targetValid
  stateValid
  sourceValid

StoryCommandResult:
  status
  reason
  stateBefore
  stateAfter
  events
  projections
  journals

CentralLedgerReadback:
  repo
  latestTracker
  latestTurnLedger
  latestAuditPaths
  sourceTimestamp
  resultStatus
```

## Browser adapter plan

The reducer should emit what the browser must do:

```txt
textContent patches
hotspot button labels
notebook log patches
save write or clear intent
interlude open/close intent
stage scene load intent
debug JSON projection
GameHost story diagnostics
central ledger readback row
```

## Acceptance gate

The next runtime source pass is not complete until a DOM-free fixture can replay the source route and emit a central-ledger snapshot row.

## Rejected shortcuts

```txt
No browser-only smoke as source proof.
No direct DOM mutation as gameplay authority.
No renderer extraction before story reducer proof.
No central ledger update without repo-local path/readback alignment.
```