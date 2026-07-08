# Gameplay Audit: Route Save Result Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T18-51-55-04-00`

## Current gameplay loop

```txt
start with sceneId = library-blank-map
  -> inspect each scene hotspot
  -> each first inspection grants clue(s)
  -> sceneComplete checks required clues
  -> completion logs "The map accepts the room."
  -> delayed interlude opens
  -> continue advances to next scene
  -> route records visited scenes
  -> after final scene, continue writes Prototype complete copy directly to interlude DOM
```

## Current save loop

```txt
loadState:
  JSON.parse(localStorage item) or createInitialState
  shallow-merge into initial state

saveState:
  JSON.stringify(state)
  localStorage.setItem(SAVE_KEY, serialized state)

reset:
  remove localStorage item
  location.reload()
```

## Main issue

Route, save, and completion behavior are not represented as command results.

The runtime can show the correct story, but it cannot explain these paths in a fixture-readable way:

```txt
loaded save normalized
loaded save rejected
route advanced
route not advanced
completion accepted
completion repeated
save requested
save skipped
save cleared
terminal prototype reached
```

## Target result loop

```txt
StoryCommandResult
  -> StoryEventRecord[]
  -> RouteJournalEntry[]
  -> SaveProjection
  -> InterludeProjection
  -> StoryProjection
  -> StageProjection
```

## Required route facts

```txt
currentSceneId
nextSceneId
routeBefore
routeAfter
routeDidChange
completionRequiredClues
completionSatisfiedClues
completionMissingClues
terminal
reason
```

## Required save facts

```txt
saveKey
saveVersion
writeIntent
clearIntent
serializedLength
normalizedLoadedState
loadReason
saveReason
```

## Next gameplay fixture rows

```txt
complete_library_scene:
  accepted inspection results in scene_completed event and interlude projection.

continue_to_hallway:
  accepted continuation changes sceneId and emits StageProjection.

scene_incomplete_continue:
  rejected continuation with missing clue facts.

complete_full_route:
  accepted route through all authored scenes.

prototype_complete_continue:
  terminal result with no StageProjection mutation.

load_malformed_state:
  rejected or normalized with explicit reason.

reset_save:
  accepted with clear-save intent, not direct reload-only authority.
```

## Defer

Do not add inventory, branching routes, audio, more rooms, enemy logic, or new notebook mechanics until this result loop is fixture-readable.
