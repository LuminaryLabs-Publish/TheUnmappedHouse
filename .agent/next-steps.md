# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T10-01-57-04-00`

## Next safe ledge

Build the story authority source wire map into source.

Do not expand story content first.

Do not rewrite the renderer first.

Do not change the route, localStorage key, scene copy, or Pages workflow unless required by validation.

## Current ledge name

```txt
TheUnmappedHouse Story Authority Source Wire Map
```

## Build checklist

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
- [ ] Define `INSPECT_HOTSPOT`, `CONTINUE_SCENE`, `LOAD_SAVE`, `SAVE_STATE`, and `RESET_SAVE` command envelopes.
- [ ] Add `src/story-authority/story-command-reasons.js`.
- [ ] Define stable reason codes: `OK`, `HOTSPOT_ALREADY_INSPECTED`, `UNKNOWN_SCENE`, `UNKNOWN_HOTSPOT`, `SCENE_INCOMPLETE`, `NO_NEXT_SCENE`, `MALFORMED_SAVE`, `DUPLICATE_SCENE_ID`, `DUPLICATE_HOTSPOT_ID`, and `UNGRANTABLE_REQUIRED_CLUE`.
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
- [ ] Add fixture cases for initial state, known hotspot, repeat inspection, unknown hotspot, premature continue, scene completion, transition, prototype complete, save/load, reset, duplicate hotspot ids, ungrantable required clues, stage snapshot, and GameHost projection.
- [ ] Add `npm run validate:story` or extend `npm run check` after the fixture script exists.
- [ ] Record validation output in `.agent/validation.md`.

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
│  ├─ inspection-action-kit
│  ├─ scene-completion-result-kit
│  ├─ scene-transition-result-kit
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
- [ ] Do not let stale central summary language cause duplicate repo breakdown selection forever.
- [ ] Do not change the visual art pass before source-level story authority has fixtures.

## Success condition

A fixture script can replay story commands without DOM, Three.js, browser input, or localStorage and produce the same scene, clue, route, inspection, completion, transition, save, reset, and prototype-complete results that the live UI expects.

The central ledger state no longer claims `TheUnmappedHouse` is missing from the normal publish-game rollup, and the next work item is no longer discovery. It is implementation.
