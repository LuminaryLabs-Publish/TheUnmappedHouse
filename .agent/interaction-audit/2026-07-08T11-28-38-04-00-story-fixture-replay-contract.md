# Story Fixture Replay Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T11-28-38-04-00`

## Purpose

This audit turns the prior story authority source wire map into an acceptance contract.

The next implementation should be source work, not another discovery pass.

## Current interaction authority

Current source flow:

```txt
StageKit click or side-panel button
  -> inspectHotspot(hotspot)
  -> mutate state.inspected[currentScene.id]
  -> grantClues(hotspot.grants)
  -> writeLog(...)
  -> sceneComplete(currentScene)
  -> maybe setTimeout(showInterlude, 450)
  -> renderUi()
  -> saveState()
```

Current continuation flow:

```txt
continueButton click
  -> nextScene()
  -> find next scene by current scene index
  -> mutate currentScene
  -> mutate state.sceneId
  -> append state.route
  -> hide interlude
  -> stage.loadScene(currentScene)
  -> renderUi()
  -> saveState()
```

Current reset flow:

```txt
KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Required command envelopes

```txt
INSPECT_HOTSPOT
CONTINUE_SCENE
LOAD_SAVE
SAVE_STATE
RESET_SAVE
```

## Required reason codes

```txt
OK
HOTSPOT_ALREADY_INSPECTED
UNKNOWN_SCENE
UNKNOWN_HOTSPOT
SCENE_INCOMPLETE
NO_NEXT_SCENE
PROTOTYPE_COMPLETE
MALFORMED_SAVE
DUPLICATE_SCENE_ID
DUPLICATE_HOTSPOT_ID
UNGRANTABLE_REQUIRED_CLUE
```

## Required result shape

```txt
StoryCommandResult
  id
  commandId
  type
  accepted
  reason
  state
  events
  projection
  journalEntry
```

## Required events

```txt
HOTSPOT_INSPECTED
HOTSPOT_REINSPECTED
CLUE_GRANTED
SCENE_COMPLETED
SCENE_TRANSITIONED
PROTOTYPE_COMPLETED
SAVE_LOADED
SAVE_WRITTEN
SAVE_RESET
COMMAND_REJECTED
```

## Fixture rows

```txt
01_initial_state_has_first_scene
  command: create initial state
  expected: sceneId = library-blank-map, route = [library-blank-map], clues = []

02_story_source_snapshot_lists_three_scenes
  command: create source snapshot
  expected: scene count = 3 and scene ids are stable

03_stage_scene_snapshot_lists_camera_layers_props_hotspots_post
  command: create stage snapshot for library-blank-map
  expected: camera, layers, props, hotspots, post are present

04_known_hotspot_grants_expected_clue
  command: INSPECT_HOTSPOT scene=library-blank-map hotspot=map
  expected: accepted OK, clue:blank-square granted, HOTSPOT_INSPECTED event

05_repeat_hotspot_accepts_with_HOTSPOT_ALREADY_INSPECTED_and_no_duplicate_clue
  command: INSPECT_HOTSPOT scene=library-blank-map hotspot=map again
  expected: accepted HOTSPOT_ALREADY_INSPECTED, no duplicate clue

06_unknown_hotspot_rejects_with_UNKNOWN_HOTSPOT
  command: INSPECT_HOTSPOT scene=library-blank-map hotspot=nope
  expected: rejected UNKNOWN_HOTSPOT, no state mutation

07_incomplete_scene_cannot_continue_with_SCENE_INCOMPLETE
  command: CONTINUE_SCENE before all required clues
  expected: rejected SCENE_INCOMPLETE, no route mutation

08_complete_first_scene_emits_SCENE_COMPLETED_event
  command: inspect map, window, shelf-gap
  expected: accepted results, all required clues, SCENE_COMPLETED event

09_continue_after_completion_moves_to_repeating_hallway
  command: CONTINUE_SCENE after first scene complete
  expected: accepted OK, sceneId = repeating-hallway, route includes repeating-hallway

10_complete_all_three_scenes_reaches_prototype_complete
  command: inspect all required hotspots and continue through final scene
  expected: accepted PROTOTYPE_COMPLETE terminal result

11_save_load_roundtrip_preserves_scene_clues_route_and_inspection
  command: SAVE_STATE then LOAD_SAVE
  expected: equivalent story state snapshot

12_reset_returns_initial_state_and_reset_save_result
  command: RESET_SAVE
  expected: accepted OK, state equals initial state, SAVE_RESET event

13_duplicate_scene_ids_rejected
  command: validate malformed source snapshot
  expected: rejected DUPLICATE_SCENE_ID

14_duplicate_hotspot_ids_rejected
  command: validate malformed source snapshot
  expected: rejected DUPLICATE_HOTSPOT_ID

15_ungrantable_required_clues_rejected
  command: validate malformed source snapshot
  expected: rejected UNGRANTABLE_REQUIRED_CLUE

16_gamehost_projection_contains_latest_result_stage_summary_and_fixture_summary
  command: project GameHost diagnostics
  expected: latestResult, story snapshot, stage snapshot, command journal summary, fixture summary
```

## Integration boundary

`src/game.js` should become a consumer of story authority results.

It may keep DOM lookup and projection, but it should not decide command legality.

`src/stage-kit.js` should continue sending the hotspot descriptor through `onHotspot`.

`src/story-data.js` should remain the canonical story source.

## Stop line

Stop the implementation when fixture replay and GameHost projection are proven.

Do not add rooms, inventory, audio, route branching, StageKit extraction, or renderer changes in the same pass.
