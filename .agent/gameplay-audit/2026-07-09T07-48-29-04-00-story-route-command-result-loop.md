# Gameplay Audit: Story Route Command Result Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

The gameplay loop is a three-scene clue-collection route. Each scene completes when all required clue ids are granted by hotspot inspection, then an interlude opens, and the continue button advances to the next scene.

The loop works as a browser prototype, but it is not yet fixture-safe because route progression and terminal behavior are hidden inside `src/game.js` mutations.

## Current gameplay loop

```txt
scene starts
  -> opening text displays
  -> hotspot buttons render
  -> player inspects each hotspot
  -> hotspot grants clue ids
  -> sceneComplete(currentScene) checks every required clue
  -> completion writes notebook entry
  -> showInterlude is scheduled after 450ms
  -> continue advances to next scene
  -> route array is updated
  -> StageKit loads next scene
  -> after final scene, terminal prototype text is written
```

## Current scenes

```txt
library-blank-map
  title: The Blank Square
  required clues: clue:blank-square, clue:house-door, clue:deep-shelf
  hotspots: map, window, shelf-gap

repeating-hallway
  title: The Hallway That Repeats
  required clues: clue:home-address, clue:wallpaper, clue:unfinished-family
  hotspots: wrong-door, class-number, unfinished-photo

closet-weather
  title: The Closet With Weather Inside
  required clues: clue:stored-rain, clue:wet-shadow, clue:west-wing
  hotspots: bucket-storm, wet-shadow, closet-map
```

## Gameplay domains

```txt
scene route
scene completion
hotspot inspection
clue grants
repeat inspection
notebook log
interlude title/text
continue scene
terminal prototype state
save/load persistence
reset
```

## Gameplay services

```txt
createInitialState()
loadState()
saveState()
hasClue(clue)
grantClues(clues)
writeLog(entry)
sceneComplete(scene)
inspectHotspot(hotspot)
showInterlude(scene)
nextScene()
renderUi()
```

## Missing source-owned gameplay facts

```txt
StorySourceManifest with scene ordering and save key
StorySourceSnapshot with scene/hotspot/clue facts
StoryPreflight for duplicate ids and ungrantable required clues
StoryCommandResult for each inspect/continue/reset/load/save command
StoryEventRecord list for clue/log/scene completion/stage load events
RouteProjection for next scene or terminal route
InterludeProjection for completion state
SaveProjection for write/clear intent
StageProjection for which scene should be loaded
BrowserAdapterReadback for consumed projection facts
```

## Next fixture rows

```txt
initial_state_created
source_preflight_passes
inspect_library_map
inspect_library_window
inspect_library_shelf_gap
library_scene_completed
continue_to_repeating_hallway
repeat_hotspot_no_mutation
unknown_hotspot_rejected
continue_incomplete_rejected
complete_all_scenes
prototype_terminal_result
save_projection_created
stage_projection_created
browser_adapter_readback_created
central_ledger_snapshot_created
```

## Do not expand first

```txt
new rooms
new character systems
inventory
audio
new puzzle verbs
renderer rewrite
new route names
save-key changes
```

Gameplay should become easier to prove before it becomes larger.
