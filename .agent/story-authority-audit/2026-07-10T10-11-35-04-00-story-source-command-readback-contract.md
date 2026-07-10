# Story authority audit — Source command readback contract

## Contract goal

Move story authority out of browser side effects without changing the current visible route.

## Source records

```txt
StorySourceManifest
StorySourceFingerprint
StorySourceSnapshot
SceneSourceRow
HotspotSourceRow
CompletionRequirementRow
InterludeSourceRow
StageDescriptorSourceRow
PostDescriptorSourceRow
```

## Command records

```txt
StoryCommandEnvelope
StoryPreflight
StoryReasonCode
StoryCommandResult
StoryStateSnapshot
StoryProjectionRecord
StoryReplayRow
```

## Adapter records

```txt
SaveIntentRecord
InterludeIntentRecord
TerminalRouteIntentRecord
StageLoadIntentRecord
StageLoadReadback
StagePickReadback
StoryAdapterLedgerRow
BrowserAdapterReadback
GameHostStoryDiagnostics
```

## Current blocker

`src/game.js` owns both authority and effects. It mutates state, writes saves, schedules interludes, loads StageKit scenes, projects DOM, and writes debug JSON in the same command path.

## Next proof requirement

The DOM-free fixture should prove accepted, rejected, repeated/no-mutation, completion, continue, terminal, save, projection, adapter, and StageKit readback rows before any new rooms, inventory, audio, or visual work.
