# Story Authority Source Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T10-01-57-04-00`

## Purpose

This map translates the existing story command/result acceptance ledger into exact source files, contracts, and fixture gates.

The next implementation should be additive and small.

Keep the current story, route, StageKit visuals, localStorage key, and Pages workflow stable.

## Current source seams

```txt
src/game.js
  -> module-level state/currentScene
  -> localStorage load/save
  -> inspectHotspot direct mutation
  -> grantClues direct mutation
  -> sceneComplete inline check
  -> setTimeout(showInterlude, 450)
  -> nextScene direct route mutation
  -> renderUi direct DOM projection
  -> KeyR localStorage reset and reload

src/stage-kit.js
  -> renderer and raycast click source
  -> dispatches hotspot object to onHotspot

src/story-data.js
  -> canonical scene and hotspot source data
```

## New source folder

Add:

```txt
src/story-authority/
```

Do not move StageKit into this folder.

Do not move DOM lookups into this folder.

## File 1: story-source-snapshot.js

Exports:

```txt
createStorySourceSnapshot(scenes)
createSceneGrantIndex(scenes)
createSceneCompletionIndex(scenes)
validateStorySourceSnapshot(snapshot)
```

Snapshot shape:

```txt
{
  sceneCount,
  sceneIds,
  firstSceneId,
  finalSceneId,
  scenes: [{ id, title, hotspotIds, grantableClues, requiresToComplete, interludeTitle }],
  validation: { ok, errors }
}
```

Validation errors:

```txt
DUPLICATE_SCENE_ID
DUPLICATE_HOTSPOT_ID
UNGRANTABLE_REQUIRED_CLUE
MISSING_FIRST_SCENE
```

## File 2: story-state-snapshot.js

Exports:

```txt
createInitialStoryState(sourceSnapshot)
normalizeLoadedStoryState(raw, sourceSnapshot)
createStoryStateSnapshot(state)
cloneStoryState(state)
```

State snapshot shape:

```txt
{
  sceneId,
  clues,
  flags,
  inspected,
  route,
  log,
  commandJournal,
  routeJournal
}
```

Keep compatibility with the current persisted fields:

```txt
sceneId
clues
flags
inspected
route
log
```

`commandJournal` and `routeJournal` can default to empty arrays when old saves load.

## File 3: stage-scene-snapshot.js

Exports:

```txt
createStageSceneSnapshot(scene)
```

Snapshot shape:

```txt
{
  sceneId,
  title,
  camera,
  backgroundColor,
  fog,
  layers,
  props,
  hotspots,
  post,
  counts: { layers, props, hotspots }
}
```

This is for diagnostics and fixtures only.

It must not instantiate Three.js.

## File 4: story-command-envelope.js

Exports:

```txt
createStoryCommandEnvelope(type, payload, meta)
```

Command types:

```txt
INSPECT_HOTSPOT
CONTINUE_SCENE
LOAD_SAVE
SAVE_STATE
RESET_SAVE
```

Envelope shape:

```txt
{
  id,
  type,
  payload,
  meta: { source, timestamp, sceneId },
  schemaVersion: 1
}
```

## File 5: story-command-reasons.js

Exports stable reason constants:

```txt
OK
HOTSPOT_ALREADY_INSPECTED
UNKNOWN_SCENE
UNKNOWN_HOTSPOT
SCENE_INCOMPLETE
NO_NEXT_SCENE
MALFORMED_SAVE
DUPLICATE_SCENE_ID
DUPLICATE_HOTSPOT_ID
UNGRANTABLE_REQUIRED_CLUE
```

These must be strings, not thrown errors.

## File 6: story-command-result.js

Exports:

```txt
createStoryCommandResult(input)
createInspectionResult(input)
createSceneCompletionResult(input)
createSceneTransitionResult(input)
createSaveResult(input)
```

Result shape:

```txt
{
  id,
  commandId,
  type,
  accepted,
  reason,
  state,
  events,
  projection,
  journalEntry
}
```

## File 7: story-reducer.js

Exports:

```txt
applyStoryCommand(envelope, context)
applyInspectionCommand(envelope, context)
applyContinueSceneCommand(envelope, context)
applyLoadSaveCommand(envelope, context)
applySaveStateCommand(envelope, context)
applyResetSaveCommand(envelope, context)
```

Context shape:

```txt
{
  sourceSnapshot,
  stateSnapshot,
  rawSave,
  saveAdapter
}
```

Important reducer rules:

```txt
Rejected commands must not mutate source state.
Repeat hotspot inspection is accepted with HOTSPOT_ALREADY_INSPECTED and must not duplicate clues.
Continue before completion is rejected with SCENE_INCOMPLETE.
Continue at the last scene is accepted with NO_NEXT_SCENE and PROTOTYPE_COMPLETE projection.
Malformed saves fall back to initial state with MALFORMED_SAVE result metadata.
```

## File 8: story-projection.js

Exports:

```txt
projectUiState(result, sourceSnapshot)
projectNotebookDebug(stateSnapshot, sourceSnapshot, latestResult)
projectGameHostDiagnostics(sourceSnapshot, stateSnapshot, latestResult, stageSnapshot)
```

`src/game.js` should consume these projections instead of deriving every output inline.

## Script: validate-story-fixtures.mjs

Add:

```txt
scripts/validate-story-fixtures.mjs
```

Fixture rows:

```txt
01_initial_state_has_first_scene
02_known_hotspot_grants_expected_clue
03_duplicate_hotspot_is_accepted_repeat_and_does_not_duplicate_clue
04_unknown_hotspot_rejected_with_UNKNOWN_HOTSPOT
05_incomplete_scene_cannot_continue_with_SCENE_INCOMPLETE
06_complete_first_scene_emits_SCENE_COMPLETED
07_continue_after_completion_moves_to_next_scene
08_continue_at_final_scene_emits_PROTOTYPE_COMPLETE
09_save_load_roundtrip_preserves_scene_clues_route_and_inspection
10_reset_restores_initial_state
11_duplicate_hotspot_ids_rejected_by_source_snapshot
12_ungrantable_required_clues_rejected_by_source_snapshot
13_stage_scene_snapshot_lists_camera_layers_props_hotspots_post
14_gamehost_projection_contains_latest_result_and_stage_summary
```

## Existing file edit: src/game.js

Minimal cutover plan:

```txt
1. Import source/story/reducer/projection helpers.
2. Build sourceSnapshot once from scenes.
3. Replace createInitialState with createInitialStoryState(sourceSnapshot), or delegate to it.
4. Replace loadState internals with normalizeLoadedStoryState.
5. Keep SAVE_KEY exactly the same.
6. Replace inspectHotspot body with create envelope -> applyStoryCommand -> consume result.
7. Replace nextScene body with create envelope -> applyStoryCommand -> consume result.
8. Keep StageKit onHotspot callback shape stable.
9. Keep renderUi responsible for DOM writes only.
10. Add window.GameHost.getState as additive diagnostics.
```

## Existing file edit: package.json

After the fixture script exists:

```json
{
  "scripts": {
    "validate:story": "node scripts/validate-story-fixtures.mjs",
    "check": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js && node scripts/validate-story-fixtures.mjs"
  }
}
```

## Acceptance gate

The implementation is done only when this command passes:

```bash
npm run check
```

And when the fixture script reports all listed fixture rows as passing.

## Explicit non-goals

```txt
Do not add more rooms.
Do not rewrite StageKit.
Do not change story text.
Do not change SAVE_KEY.
Do not introduce routing.
Do not make localStorage the command authority.
Do not make DOM text the command result source.
Do not promote kits out of this repo until local fixtures prove the seam.
```
