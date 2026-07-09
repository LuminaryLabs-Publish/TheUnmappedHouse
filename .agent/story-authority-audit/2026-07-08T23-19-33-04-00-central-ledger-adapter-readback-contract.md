# Central Ledger Adapter Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Why this audit exists

Repo-local `.agent` state had advanced beyond the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger. This pass records a catch-up and keeps the implementation queue focused on story authority and browser-adapter readback.

## Source of truth problem

`src/game.js` currently owns story authority and browser adapter behavior in the same functions.

```txt
loadState: save fallback and shallow merge
inspectHotspot: inspection, clue grant, completion, text/log/UI/save
nextScene: route mutation, interlude close, StageKit load, UI/save
renderUi: visible projection and debug JSON
KeyR handler: save deletion and browser reload
```

## Required source-owned contracts

```txt
StorySourceManifest
StorySourceSnapshot
StoryStateSnapshot
StageSceneSnapshot
StoryCommandEnvelope
StoryPreflight
StoryCommandReason
StoryCommandResult
StoryEventRecord
StoryReducer
StoryProjection
SaveProjection
InterludeProjection
StageProjection
StoryBrowserAdapterPlan
BrowserAdapterReadback
GameHostStoryDiagnostics
CentralLedgerSnapshot
```

## Central ledger contract

After each run, central tracking must include:

```txt
latest tracker path
previous tracker path
latest turn-ledger path
latest architecture audit path
latest render audit path
latest interaction audit path
latest gameplay audit path
latest story-authority audit path
latest deploy audit path
latest kit registry path
latest internal change-log path
selection reason
repo-list comparison
main finding
next safe ledge
validation boundary
```

## Implementation acceptance

The runtime source pass is not complete until fixtures prove:

```txt
story source preflight accepts current descriptors
invalid descriptors are rejected without browser boot
inspection command emits accepted/no_mutation/rejected result rows
continue command emits transition/terminal rows
save/load/reset emit projection rows
StageProjection is consumed by the browser host
BrowserAdapterReadback reports consumed projection facts
GameHost diagnostics are additive and read-only
```

No source implementation changed in this pass.
