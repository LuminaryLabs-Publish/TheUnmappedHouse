# Architecture Audit: Story Result Reducer Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T12-59-11-04-00`

## Current architecture

`TheUnmappedHouse` currently keeps product, story state, UI projection, StageKit hookup, localStorage persistence, and reset behavior inside `src/game.js`.

The rendering layer is reusable enough to leave alone for the next pass. The story authority is not yet reusable because commands do not produce typed result rows.

## Current loop

```txt
src/game.js
  -> create/load state
  -> select currentScene
  -> StageKit({ onHotspot: inspectHotspot })
  -> inspectHotspot mutates story state
  -> sceneComplete checks current clues
  -> showInterlude mutates DOM
  -> nextScene mutates route/currentScene/StageKit/UI/save
  -> renderUi projects DOM and debug JSON
  -> KeyR reset deletes save and reloads page
```

## Target story authority shape

Add a pure source layer under:

```txt
src/story-authority/
```

Recommended files:

```txt
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Command types

```txt
inspect_hotspot
continue_scene
save_state
load_state
reset_save
project_state
```

## Result statuses

```txt
accepted
rejected
no_mutation
complete
prototype_complete
saved
loaded
reset
projection
```

## Reason codes

```txt
initial_state_created
loaded_state_normalized
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_complete
next_scene_available
prototype_complete
save_requested
load_requested
reset_requested
missing_scene
duplicate_scene_id
duplicate_hotspot_id
required_clue_ungrantable
invalid_command_type
invalid_command_payload
projection_requested
```

## Reducer contract

```txt
applyStoryCommand({ source, state, command }) -> StoryCommandResult
```

Each result should include:

```txt
commandId
commandType
status
reason
accepted
mutated
before
state
events
projection
saveProjection
diagnostics
```

## Fixture rows

```txt
initial_state
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
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
stage_scene_snapshot
story_projection
GameHost_projection
```

## Domains

```txt
story-source-snapshot
story-state-snapshot
stage-scene-snapshot
story-command-envelope
story-command-validation
story-command-reason-catalog
story-command-result
story-event-record
story-reducer
story-projection
save-projection
route-journal
command-journal
fixture-replay
GameHost-diagnostics
```

## DSK breakdown

```txt
unmapped-house-story-source-snapshot-kit:
  owns normalized scene ids, hotspot ids, clue grants, completion requirements, and interlude descriptors.

unmapped-house-story-state-snapshot-kit:
  owns normalized state shape, route, inspected map, clue ledger, flags, and log.

unmapped-house-stage-scene-snapshot-kit:
  owns render-readable scene facts without touching Three.js.

unmapped-house-story-command-envelope-kit:
  owns command identity, type, payload, source, and timestamp-free fixture determinism.

unmapped-house-story-command-result-kit:
  owns accepted/rejected/no-mutation result shape.

unmapped-house-story-reducer-kit:
  owns pure mutation for inspect, continue, save, load, reset, and projection commands.

unmapped-house-story-projection-kit:
  owns UI/debug/GameHost-readable state projection.

unmapped-house-dom-free-fixture-kit:
  owns deterministic replay and acceptance rows.
```

## Stop condition

Stop this implementation ledge before touching `StageKit` internals unless a fixture proves the renderer descriptor data itself is invalid.
