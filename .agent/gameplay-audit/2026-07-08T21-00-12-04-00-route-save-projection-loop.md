# Route Save Projection Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T21-00-12-04-00`

## Current gameplay loop

```txt
inspect all required hotspots
  -> sceneComplete(currentScene) becomes true
  -> writeLog("The map accepts the room.")
  -> setTimeout(showInterlude(currentScene), 450)
  -> continue button calls nextScene()
  -> currentScene = next
  -> state.sceneId = next.id
  -> state.route push next.id
  -> interlude DOM closes
  -> StageKit.loadScene(currentScene)
  -> renderUi()
  -> saveState()
```

## Current save/reset loop

```txt
loadState:
  localStorage JSON shallow-merged into initial state

saveState:
  localStorage.setItem(SAVE_KEY, JSON.stringify(state))

KeyR:
  localStorage.removeItem(SAVE_KEY)
  location.reload()
```

## Missing result/projection records

```txt
SceneCompletionResult
SceneTransitionResult
PrototypeCompleteResult
SaveProjection
LoadProjection
ResetProjection
RouteJournalEntry
InterludeProjection
StageProjection
StoryBrowserAdapterPlan
```

## Fixture rows

```txt
scene_incomplete_continue -> rejected / scene_incomplete
complete_library_scene -> accepted / scene_completed
continue_to_hallway -> accepted / scene_transitioned
complete_full_route -> accepted / full_route_completed
prototype_complete_continue -> terminal / prototype_complete
save_state -> accepted / save_requested
load_state -> accepted / loaded_state_normalized
load_malformed_state -> rejected or normalized / loaded_state_rejected
reset_save -> accepted / reset_requested
```

## Stop condition

Do not move route, save, reset, or interlude logic deeper into browser handlers. Move it into source-owned result and projection records, then let `src/game.js` apply those projections.
