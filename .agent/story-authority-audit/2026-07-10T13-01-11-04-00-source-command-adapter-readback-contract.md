# Story authority audit: Source Command Adapter Readback Contract

Timestamp: `2026-07-10T13-01-11-04-00`

## Contract goal

Keep the visible prototype stable while extracting proof rows from the existing story loop.

## Required source-owned records

```txt
StorySourceManifest
StorySourceFingerprint
StorySourceSnapshot
StoryCommandEnvelope
StoryReasonCode
StoryPreflight
StoryCommandResult
StoryStateSnapshot
StoryProjectionRecord
SaveIntentRecord
InterludeIntentRecord
TerminalRouteIntentRecord
StageLoadIntentRecord
StageLoadReadback
StagePickReadback
StoryReplayRow
StoryAdapterLedgerRow
BrowserAdapterReadback
GameHostStoryDiagnostics
```

## Minimum command contract

```txt
{
  commandId,
  type: "inspect_hotspot" | "continue" | "reset",
  sceneId,
  hotspotId,
  issuedBy: "side-panel" | "stage-pick" | "keyboard" | "fixture",
  frame
}
```

## Minimum result contract

```txt
{
  resultId,
  commandId,
  accepted,
  status: "accepted" | "rejected" | "no_mutation",
  reason,
  stateDelta,
  projectionId,
  adapterIntentIds,
  stageReadbackId
}
```

## Main finding

The next implementation should add this contract additively. `src/game.js` can remain the browser adapter, but it should consume source-owned results instead of owning authority inline.
