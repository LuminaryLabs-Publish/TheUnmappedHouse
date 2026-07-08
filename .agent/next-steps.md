# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T11-28-38-04-00`

## Next safe ledge

Build the story fixture replay contract and GameHost projection gate into source.

Do not expand story content first.

Do not rewrite the renderer first.

Do not change the route, localStorage key, scene copy, StageKit picking behavior, or Pages workflow unless validation proves it is required.

## Current ledge name

```txt
TheUnmappedHouse Story Fixture Replay Contract + GameHost Projection Gate
```

## Implementation checklist

- [ ] Add `src/story-authority/story-source-snapshot.js`.
- [ ] Export `createStorySourceSnapshot(scenes)`.
- [ ] Export `createSceneGrantIndex(scenes)`.
- [ ] Export `createSceneCompletionIndex(scenes)`.
- [ ] Export `validateStorySourceSnapshot(snapshot)`.
- [ ] Add `src/story-authority/story-state-snapshot.js`.
- [ ] Export `createInitialStoryState(sourceSnapshot)`.
- [ ] Export `normalizeLoadedStoryState(raw, sourceSnapshot)`.
- [ ] Export `createStoryStateSnapshot(state)`.
- [ ] Preserve compatibility with old persisted fields: `sceneId`, `clues`, `flags`, `inspected`, `route`, and `log`.
- [ ] Add `src/story-authority/stage-scene-snapshot.js`.
- [ ] Export `createStageSceneSnapshot(scene)` without importing Three.js.
- [ ] Add `src/story-authority/story-command-envelope.js`.
- [ ] Define `INSPECT_HOTSPOT`, `CONTINUE_SCENE`, `LOAD_SAVE`, `SAVE_STATE`, and `RESET_SAVE` envelopes.
- [ ] Add `src/story-authority/story-command-reasons.js`.
- [ ] Define stable reason codes: `OK`, `HOTSPOT_ALREADY_INSPECTED`, `UNKNOWN_SCENE`, `UNKNOWN_HOTSPOT`, `SCENE_INCOMPLETE`, `NO_NEXT_SCENE`, `PROTOTYPE_COMPLETE`, `MALFORMED_SAVE`, `DUPLICATE_SCENE_ID`, `DUPLICATE_HOTSPOT_ID`, and `UNGRANTABLE_REQUIRED_CLUE`.
- [ ] Add `src/story-authority/story-command-result.js`.
- [ ] Define `StoryCommandResult` with `id`, `commandId`, `type`, `accepted`, `reason`, `state`, `events`, `projection`, and `journalEntry` fields.
- [ ] Add `src/story-authority/story-reducer.js`.
- [ ] Export `applyStoryCommand(envelope, context)`.
- [ ] Export `applyInspectionCommand(envelope, context)`.
- [ ] Export `applyContinueSceneCommand(envelope, context)`.
- [ ] Export `applyLoadSaveCommand(envelope, context)`.
- [ ] Export `applySaveStateCommand(envelope, context)`.
- [ ] Export `applyResetSaveCommand(envelope, context)`.
- [ ] Add `src/story-authority/story-projection.js`.
- [ ] Export `projectUiState(result, sourceSnapshot)`.
- [ ] Export `projectNotebookDebug(stateSnapshot, sourceSnapshot, latestResult)`.
- [ ] Export `projectGameHostDiagnostics(sourceSnapshot, stateSnapshot, latestResult, stageSnapshot)`.
- [ ] Edit `src/game.js` so DOM handlers create envelopes and consume results.
- [ ] Keep `SAVE_KEY = "the-unmapped-house.stage-prototype.v1"`.
- [ ] Keep StageKit `onHotspot` callback shape stable.
- [ ] Keep story text and stage descriptors stable.
- [ ] Add additive `window.GameHost.getState()` diagnostics after pure projections exist.
- [ ] Add `scripts/validate-story-fixtures.mjs`.
- [ ] Add `npm run validate:story` or extend `npm run check` after the fixture script exists.
- [ ] Record validation output in `.agent/validation.md`.

## Required fixture rows

```txt
01_initial_state_has_first_scene
02_story_source_snapshot_lists_three_scenes
03_stage_scene_snapshot_lists_camera_layers_props_hotspots_post
04_known_hotspot_grants_expected_clue
05_repeat_hotspot_accepts_with_HOTSPOT_ALREADY_INSPECTED_and_no_duplicate_clue
06_unknown_hotspot_rejects_with_UNKNOWN_HOTSPOT
07_incomplete_scene_cannot_continue_with_SCENE_INCOMPLETE
08_complete_first_scene_emits_SCENE_COMPLETED_event
09_continue_after_completion_moves_to_repeating_hallway
10_complete_all_three_scenes_reaches_prototype_complete
11_save_load_roundtrip_preserves_scene_clues_route_and_inspection
12_reset_returns_initial_state_and_reset_save_result
13_duplicate_scene_ids_rejected
14_duplicate_hotspot_ids_rejected
15_ungrantable_required_clues_rejected
16_gamehost_projection_contains_latest_result_stage_summary_and_fixture_summary
```

## Domain split target

```txt
unmapped-house-domain
├─ story-source-domain
│  ├─ story-source-snapshot-kit
│  ├─ scene-descriptor-validation-kit
│  └─ stage-scene-snapshot-kit
├─ story-state-domain
│  ├─ story-state-snapshot-kit
│  ├─ clue-ledger-reducer-kit
│  ├─ route-journal-kit
│  └─ command-journal-kit
├─ story-command-domain
│  ├─ story-command-envelope-kit
│  ├─ command-validation-kit
│  ├─ story-command-reason-kit
│  ├─ story-command-result-kit
│  ├─ story-event-record-kit
│  ├─ inspection-action-kit
│  ├─ scene-completion-result-kit
│  ├─ scene-transition-result-kit
│  ├─ prototype-complete-result-kit
│  └─ save-result-kit
├─ renderer-consumer-domain
│  ├─ fixed-camera-diorama-kit
│  ├─ hotspot-raycast-kit
│  ├─ hover-label-kit
│  ├─ notebook-debug-projection-kit
│  └─ interlude-overlay-consumer-kit
├─ diagnostics-domain
│  ├─ gamehost-diagnostics-kit
│  ├─ story-result-projection-kit
│  └─ fixture-summary-projection-kit
└─ fixture-domain
   ├─ dom-free-fixture-kit
   ├─ hotspot-fixture-matrix-kit
   ├─ scene-completion-fixture-kit
   └─ save-load-fixture-kit
```

## What to avoid

- [ ] Do not put renderer setup inside story authority kits.
- [ ] Do not put DOM querying inside pure command services.
- [ ] Do not make localStorage the source of truth.
- [ ] Do not add new rooms until fixture replay proves existing progression.
- [ ] Do not make StageKit depend on story-specific clue names.
- [ ] Do not hide failed commands by silently no-oping.
- [ ] Do not use `setTimeout(showInterlude, 450)` as authority for scene completion.
- [ ] Do not let stale central summary language cause duplicate repo breakdown selection forever.
- [ ] Do not change the visual art pass before source-level story authority has fixtures.

## Success condition

A fixture script can replay story commands without DOM, Three.js, browser input, or localStorage and produce the same scene, clue, route, inspection, completion, transition, save, reset, and prototype-complete results that the live UI expects.

`window.GameHost.getState()` exists as an additive diagnostic projection with latest command result, current story snapshot, current stage snapshot, command journal summary, and fixture summary without replacing current UI behavior.
