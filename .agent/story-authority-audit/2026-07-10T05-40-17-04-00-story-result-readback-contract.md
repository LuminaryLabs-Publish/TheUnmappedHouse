# Story Authority Audit: Story Result Readback Contract

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Goal

Move story truth out of browser side effects without changing visible behavior.

## Required records

```txt
StorySourceManifest
StorySourceFingerprint
StorySourceSnapshot
StoryStateSnapshot
StoryCommandEnvelope
StoryReasonCode
StoryPreflight
StoryCommandResult
StoryEventRecord
StoryReplayRow
StoryProjectionRecord
SaveIntentRecord
InterludeIntentRecord
TerminalRouteIntentRecord
StageLoadIntentRecord
BrowserAdapterPlan
BrowserAdapterReadback
GameHostStoryDiagnostics
```

## Stable command ids

```txt
inspect-hotspot
continue-scene
reset-save
load-initial-state
load-saved-state
project-ui
load-stage-scene
```

## Stable reasons

```txt
accepted
already_inspected
unknown_hotspot
scene_mismatch
scene_incomplete
scene_complete
no_next_scene
save_unavailable
stage_load_requested
```

## Compatibility rule

`src/game.js` can remain the browser adapter, but the mutation and decision facts should come from source-owned modules.

Existing DOM ids, localStorage key, scene ids, hotspot ids, and route copy should remain compatible.
