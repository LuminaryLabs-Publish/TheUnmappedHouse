# Gameplay Audit: Story Fixture Replay Loop

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Player-facing loop

```txt
read room text
  -> hover or select hotspots
  -> inspect clues
  -> notebook log updates
  -> all required clues complete current scene
  -> interlude opens
  -> continue advances to next scene
  -> repeat until prototype complete
```

## Current story content

```txt
scene 1: library-blank-map
  required clues: clue:blank-square, clue:house-door, clue:deep-shelf

scene 2: repeating-hallway
  required clues: clue:home-address, clue:wallpaper, clue:unfinished-family

scene 3: closet-weather
  required clues: clue:stored-rain, clue:wet-shadow, clue:west-wing
```

## Gameplay authority issue

The game already has a clear story loop, but the loop is not replayable without the browser because the reducer and adapter are fused in `src/game.js`.

Current state changes happen through direct mutation:

```txt
state.inspected[currentScene.id][hotspot.id] = true
state.clues.push(clue)
state.log.unshift(entry)
state.sceneId = currentScene.id
state.route.push(currentScene.id)
localStorage.setItem(SAVE_KEY, JSON.stringify(state))
```

## Required fixture replay loop

```txt
createStorySourceManifest()
  -> createStorySourceSnapshot(scenes)
  -> validateStorySourceSnapshot(snapshot)
  -> createInitialStoryState()
  -> dispatch story.inspect_hotspot rows
  -> dispatch story.continue_scene rows
  -> dispatch save/load/reset rows
  -> derive StoryProjection after each result
  -> derive SaveProjection / InterludeProjection / StageProjection
  -> derive StoryBrowserAdapterPlan
  -> derive BrowserAdapterReadback using a fake browser host
  -> derive GameHostStoryDiagnostics
  -> derive CentralLedgerReadback
  -> summarize fixture results
```

## Required gameplay fixture rows

```txt
source_manifest_created
source_snapshot_created
initial_state
load_empty_state
load_malformed_state
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_state
load_state
reset_save
stage_scene_snapshot
story_projection
save_projection
interlude_projection
stage_projection
browser_adapter_plan
browser_adapter_readback
GameHost_projection
central_ledger_snapshot
```

## Acceptance requirement

The next runtime pass should prove that the same visible gameplay decisions can be explained without DOM, Three.js, localStorage, timers, or real browser clicks.

Only after these rows exist should the project add more rooms, inventory, audio, or broader horror mechanics.
