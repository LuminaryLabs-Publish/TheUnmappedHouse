# Story Authority Audit - Command Result Adapter Ledger Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-58-52-04-00`

## Authority problem

`src/game.js` owns command execution, state mutation, browser projection, save writes, interlude timing, route switching, StageKit consumption, reset, and debug output in one browser module.

This prevents deterministic source-level proof of story behavior.

## Source-owned contract to add

```txt
StorySourceManifest
StorySourceSnapshot
StoryStateSnapshot
StageSceneSnapshot
StoryCommandEnvelope
StoryPreflight
StoryCommandResult
StoryEventRecord
StoryProjection
SaveProjection
InterludeProjection
StageProjection
StoryBrowserAdapterPlan
BrowserAdapterReadback
GameHostStoryDiagnostics
RepoLocalLedgerReadback
CentralLedgerReadback
```

## Command result minimum fields

```txt
id
command
status
reason
accepted
mutated
sceneBefore
sceneAfter
stateBefore
stateAfter
events
uiProjection
saveProjection
interludeProjection
stageProjection
debugProjection
adapterPlan
readbackExpectation
```

## Browser adapter contract

The browser adapter should consume source-owned projection rows and perform side effects only after the reducer returns a result.

```txt
result -> apply text/title/hotspot buttons
result -> write or clear localStorage only through saveProjection
result -> open/close interlude only through interludeProjection
result -> call StageKit.loadScene only through stageProjection
result -> write debug JSON only through debugProjection
result -> expose additive UnmappedHouseHost.getState diagnostics
```

## Ledger readback contract

The fixture should include readback rows proving:

```txt
root .agent START_HERE points to latest tracker and audits
kit-registry latest paths exist
turn-ledger latest path exists
central repo-ledger points to the same latest tracker/audits
central internal change-log path exists
```

## Do not do next

```txt
Do not add rooms.
Do not add inventory.
Do not add audio.
Do not rewrite StageKit.
Do not convert the app to a framework.
Do not change SAVE_KEY.
Do not change existing story copy.
```

## Do next

Add pure story authority modules and fixture rows first, then adapt `src/game.js` as a browser consumer.
