# Story Authority DSK Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T10-01-57-04-00`

## Purpose

This audit turns the current point-and-click story loop into an implementation-facing DSK breakdown.

The goal is not a full rewrite.

The goal is to make story progression replayable and explainable while keeping the current route, StageKit visuals, localStorage key, and scene copy stable.

## Current composition

```txt
index.html
  -> src/game.js
     -> StageKit
     -> gameTitle/scenes
     -> localStorage save state
     -> DOM story panel
     -> DOM hotspot list
     -> DOM notebook/debug output
     -> DOM interlude overlay
```

## Current authority issue

```txt
UI event
  -> direct state mutation
  -> direct DOM projection
  -> direct localStorage write
```

This makes accepted, repeated, rejected, saved, reset, completed, transitioned, and prototype-complete outcomes hard to fixture-test.

## Target DSK tree

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

## Domain boundaries

### story-source-domain

Owns immutable source facts from `src/story-data.js`.

Services:

```txt
createStorySourceSnapshot(scenes)
createSceneGrantIndex(scenes)
createSceneCompletionIndex(scenes)
validateSceneDescriptors(scenes)
createStageSceneSnapshot(scene)
```

Does not own DOM, localStorage, renderer instances, or live mutation.

### story-state-domain

Owns normalized state snapshots and state deltas.

Services:

```txt
createInitialStoryState(scenes)
normalizeLoadedStoryState(raw, sourceSnapshot)
createStoryStateSnapshot(state)
applyClueDelta(state, clues)
appendRouteJournalEntry(state, entry)
appendCommandJournalEntry(state, entry)
```

Does not own save I/O or UI text assignment.

### story-command-domain

Owns all story actions and result contracts.

Services:

```txt
createStoryCommandEnvelope(input)
validateStoryCommand(envelope, sourceSnapshot, stateSnapshot)
applyStoryCommand(envelope, sourceSnapshot, stateSnapshot)
applyInspectionCommand(envelope, sourceSnapshot, stateSnapshot)
applyContinueSceneCommand(envelope, sourceSnapshot, stateSnapshot)
applyResetSaveCommand(envelope, sourceSnapshot)
applyLoadSaveCommand(envelope, sourceSnapshot)
createStoryCommandResult(result)
```

Result kinds:

```txt
INSPECTION_ACCEPTED
INSPECTION_REPEAT
INSPECTION_REJECTED
SCENE_COMPLETED
CONTINUE_ACCEPTED
CONTINUE_REJECTED
PROTOTYPE_COMPLETE
SAVE_LOADED
SAVE_REJECTED
SAVE_WRITTEN
SAVE_RESET
```

Reason codes:

```txt
OK
HOTSPOT_ALREADY_INSPECTED
UNKNOWN_SCENE
UNKNOWN_HOTSPOT
SCENE_INCOMPLETE
NO_NEXT_SCENE
MALFORMED_SAVE
DUPLICATE_HOTSPOT_ID
UNGRANTABLE_REQUIRED_CLUE
```

### renderer-consumer-domain

Consumes results and descriptors.

Services:

```txt
renderStoryProjection(resultProjection)
renderHotspotButtons(sceneSnapshot, stateSnapshot)
renderNotebookDiagnostics(diagnosticsSnapshot)
showInterludeFromResult(sceneTransitionResult)
```

Does not own command acceptance.

### diagnostics-domain

Owns additive state readback.

Services:

```txt
projectNotebookDebug(stateSnapshot, latestResult)
projectGameHostDiagnostics(sourceSnapshot, stateSnapshot, latestResult, fixtureSummary)
```

Target browser surface:

```txt
window.GameHost.getState()
```

### fixture-domain

Owns DOM-free replay.

Services:

```txt
runStoryFixtureSequence(cases)
assertStoryResult(actual, expected)
assertNoMutationOnRejectedCommand(before, after)
assertSceneDescriptorValidation(sourceSnapshot)
```

## Source file map

Recommended additive files:

```txt
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
scripts/validate-story-fixtures.mjs
```

Recommended existing-file edits:

```txt
src/game.js
  -> import story-authority helpers
  -> keep DOM lookups and StageKit wiring
  -> replace direct inspection mutation with result consumption
  -> replace direct continue mutation with result consumption
  -> keep SAVE_KEY unchanged
  -> add additive window.GameHost.getState diagnostics

package.json
  -> add validate:story after fixture script exists
  -> optionally extend check to run validate:story
```

## Stop condition

The next source implementation should stop when `npm run check` and `node scripts/validate-story-fixtures.mjs` can prove the current story loop without a DOM, WebGL, or localStorage dependency.
