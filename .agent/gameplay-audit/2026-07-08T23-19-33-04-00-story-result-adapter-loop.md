# Story Result Adapter Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Current gameplay loop

```txt
load or create state
  -> inspect hotspots in current scene
  -> collect required clues
  -> sceneComplete(currentScene)
  -> show interlude
  -> continue to next scene
  -> complete prototype after final scene
```

## Current state shape

```txt
sceneId
clues[]
flags{}
inspected{}
route[]
log[]
```

## Gameplay authority gap

The gameplay loop works, but result authority is implicit. The host does not produce durable result records for the core story actions.

Missing gameplay records:

```txt
InspectionResult
SceneCompletionResult
SceneTransitionResult
PrototypeCompleteResult
SaveResult
LoadResult
ResetResult
ProjectionResult
BrowserAdapterReadbackResult
```

## Required command/result loop

```txt
StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryStateSnapshot after
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
```

## Acceptance rows

```txt
inspect_first_hotspot:
  accepted, clue granted, log prepended, save requested

repeat_hotspot:
  no_mutation, text projection allowed, no duplicate clue

unknown_hotspot:
  rejected, no mutation, reason hotspot_unknown

complete_library_scene:
  accepted, all required clues present, scene_completed event, interlude requested

continue_to_hallway:
  accepted, route appended, stage projection requested

prototype_complete_continue:
  terminal, no next stage load, prototype complete projection requested
```

## Implementation rule

Do not put this authority back into DOM handlers. DOM handlers should dispatch commands and consume adapter plans.

No gameplay runtime source was changed in this pass.
