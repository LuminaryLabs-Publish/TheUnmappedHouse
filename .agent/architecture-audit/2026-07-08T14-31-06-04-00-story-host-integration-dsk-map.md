# Story Host Integration DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T14-31-06-04-00`

## Goal

Define the exact DSK/domain boundary for moving story authority out of `src/game.js` without changing the public route, current visuals, story copy, StageKit behavior, `SAVE_KEY`, or Pages workflow.

## Current architecture

```txt
index.html
  -> src/game.js
    -> DOM query bindings
    -> loadState()
    -> mutable state/currentScene
    -> new StageKit({ onHotspot: inspectHotspot })
    -> inspectHotspot(hotspot)
    -> grantClues()
    -> sceneComplete()
    -> setTimeout(showInterlude, 450)
    -> nextScene()
    -> renderUi()
    -> saveState()
  -> src/stage-kit.js
    -> Three.js render host and hotspot picking
  -> src/story-data.js
    -> source scene descriptors
```

## Target DSK graph

```txt
story-source-domain
  -> story-source-snapshot-kit
  -> story-descriptor-validation-kit
  -> stage-scene-snapshot-kit

story-state-domain
  -> story-state-snapshot-kit
  -> save-state-normalization-kit
  -> route-state-journal-kit

story-command-domain
  -> story-command-envelope-kit
  -> story-command-validation-kit
  -> story-command-reason-kit
  -> story-command-result-kit
  -> story-event-record-kit
  -> story-result-reducer-kit

story-projection-domain
  -> story-ui-projection-kit
  -> save-projection-kit
  -> interlude-projection-kit
  -> GameHost-story-diagnostics-kit

fixture-domain
  -> story-fixture-case-kit
  -> story-fixture-runner-kit
  -> story-fixture-summary-kit
```

## Domain services

### story-source-domain

```txt
createStorySourceSnapshot(scenes, gameTitle)
validateStorySourceSnapshot(snapshot)
createGrantableClueIndex(snapshot)
createCompletionRequirementIndex(snapshot)
createStageSceneSnapshot(scene)
```

### story-state-domain

```txt
createInitialStoryState(snapshot)
normalizeLoadedStoryState(raw, snapshot)
createStoryStateSnapshot(state)
createRouteJournalEntry(result)
```

### story-command-domain

```txt
createStoryCommandEnvelope(type, payload, context)
validateStoryCommand(envelope, sourceSnapshot, stateSnapshot)
createStoryCommandReason(code, details)
createStoryCommandResult(status, reason, events, stateDelta, projections)
applyStoryCommand(envelope, sourceSnapshot, stateSnapshot)
```

### story-projection-domain

```txt
projectStoryUiState(result, sourceSnapshot, stateSnapshot)
projectSaveIntent(result, saveKey)
projectInterludeIntent(result, sourceSnapshot)
projectGameHostStoryDiagnostics(result, sourceSnapshot, stateSnapshot, fixtureSummary)
```

### fixture-domain

```txt
createStoryFixtureCases(sourceSnapshot)
runStoryFixtureSequence(cases)
summarizeStoryFixtureResults(results)
```

## Required command envelopes

```txt
story.inspect_hotspot
story.continue_scene
story.load_state
story.save_state
story.reset_save
story.project
```

## Required result status vocabulary

```txt
accepted
rejected
no_mutation
terminal
```

## Required reason vocabulary

```txt
initial_state_created
loaded_state_normalized
loaded_state_rejected
hotspot_inspected
hotspot_repeated
hotspot_unknown
scene_incomplete
scene_completed
scene_transitioned
prototype_complete
invalid_command
invalid_scene_id
duplicate_scene_id
duplicate_hotspot_id
ungrantable_required_clue
save_requested
reset_requested
projection_updated
```

## Source cutover rule

`src/game.js` should become a host adapter.

It may own DOM nodes, StageKit construction, event listeners, and browser persistence plumbing.

It must not own story rules after the cutover.

## Stop line

Stop when source-owned reducers and fixture rows exist and the browser host consumes projections.

Do not add new rooms, new art, audio, renderer extraction, inventory, or browser automation before the reducer fixture proves the command chain.
