# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T08:21:49-04:00`

## Next safe ledge

Build the story command/result acceptance ledger into source.

Do not expand story content first.

Do not rewrite the renderer first.

Do not change the route, localStorage key, scene copy, or Pages workflow unless required by validation.

## Current ledge name

```txt
TheUnmappedHouse Story Command Result Acceptance Ledger
```

## Build checklist

- [ ] Add `src/story-authority/story-snapshot.js`.
- [ ] Export `createStorySourceSnapshot(scenes)`.
- [ ] Export `createStoryStateSnapshot(state, currentSceneId)`.
- [ ] Export `createStageSceneSnapshot(scene)`.
- [ ] Add `src/story-authority/story-commands.js`.
- [ ] Define `StoryCommandEnvelope` shapes for `inspect_hotspot`, `continue_scene`, `load_save`, and `reset_save`.
- [ ] Define `StoryCommandResult` with `accepted`, `kind`, `reason`, `state`, `events`, `journalEntry`, and `projection` fields.
- [ ] Add stable `StoryCommandReason` values.
- [ ] Add `UNKNOWN_SCENE` rejection.
- [ ] Add `UNKNOWN_HOTSPOT` rejection.
- [ ] Add `HOTSPOT_ALREADY_INSPECTED` accepted-repeat result.
- [ ] Add `SCENE_INCOMPLETE` rejection for premature continue.
- [ ] Add `NO_NEXT_SCENE` accepted prototype-complete result.
- [ ] Add `MALFORMED_SAVE` fallback/load result.
- [ ] Move hotspot inspection mutation into pure `applyInspectionCommand`.
- [ ] Move scene continuation mutation into pure `applyContinueSceneCommand`.
- [ ] Move reset/load logic into result-returning save helpers.
- [ ] Emit `InspectionResult` for first and repeat inspection.
- [ ] Emit `SceneCompletionResult` when all required clues are present.
- [ ] Emit `SceneTransitionResult` when continuing after completion.
- [ ] Emit `SaveResult` for load, save, and reset.
- [ ] Emit `RouteJournalEntry` and `CommandJournalEntry` records.
- [ ] Keep `src/game.js` as the UI consumer of results.
- [ ] Preserve `SAVE_KEY = "the-unmapped-house.stage-prototype.v1"`.
- [ ] Preserve current story text and stage descriptors.
- [ ] Add additive `window.GameHost.getState()` diagnostics after pure projections exist.
- [ ] Add `scripts/validate-story-fixtures.mjs`.
- [ ] Add fixture cases for initial state, first-room completion, duplicate inspection, unknown hotspot, premature continue, transition, full route, save/load, reset, duplicate hotspot ids, and ungrantable required clues.
- [ ] Add `npm run validate:story` or extend `npm run check` to include the fixture script.
- [ ] Record validation output in `.agent/validation.md`.

## Domain split target

```txt
unmapped-house
├─ story-authority
│  ├─ story-source-snapshot-kit
│  ├─ story-state-snapshot-kit
│  ├─ story-command-envelope-kit
│  ├─ story-command-result-kit
│  ├─ story-command-reason-kit
│  ├─ command-validation-kit
│  ├─ inspection-action-kit
│  ├─ inspection-result-contract-kit
│  ├─ scene-completion-result-kit
│  └─ scene-transition-result-kit
├─ state-and-save
│  ├─ route-journal-kit
│  ├─ command-journal-kit
│  ├─ save-result-kit
│  └─ localstorage-save-adapter-kit
├─ stage-descriptor
│  ├─ stage-scene-snapshot-kit
│  ├─ stage-layer-descriptor-kit
│  ├─ stage-prop-descriptor-kit
│  ├─ stage-hotspot-volume-kit
│  └─ stage-descriptor-validation-kit
├─ renderer-host
│  ├─ fixed-camera-diorama-kit
│  ├─ anime-material-shader-kit
│  ├─ stage-postprocess-kit
│  ├─ hotspot-raycast-kit
│  └─ hover-label-kit
├─ diagnostics
│  ├─ gamehost-diagnostics-kit
│  ├─ notebook-debug-projection-kit
│  └─ fixture-summary-projection-kit
└─ fixtures
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

A fixture script can replay story commands without DOM, Three.js, browser input, or localStorage and produce the same scene, clue, route, inspection, completion, and prototype-complete results that the live UI expects.

The central ledger state no longer claims `TheUnmappedHouse` is missing from the normal publish-game rollup, and the next work item is no longer discovery. It is implementation.