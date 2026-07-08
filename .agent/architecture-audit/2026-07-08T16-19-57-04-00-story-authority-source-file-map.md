# Story Authority Source File Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T16-19-57-04-00`

## Purpose

Map the next implementation so story authority moves out of `src/game.js` and into pure source-owned files before any new content, renderer extraction, or browser-only validation.

## Current architecture

```txt
index.html
  -> src/game.js
      -> imports StageKit and story-data
      -> loads localStorage state
      -> mutates module-level state/currentScene
      -> creates StageKit with inspectHotspot callback
      -> owns inspection, clue grants, completion, interlude, continuation, reset, save, UI, and debug projection
  -> src/stage-kit.js
      -> owns Three.js render surface, fixed 16:9 stage, materials, hotspots, picking, and animation
  -> src/story-data.js
      -> owns story source descriptors
```

## Target architecture

```txt
src/story-authority/story-source-snapshot.js
  -> validates story descriptors, scene ids, hotspot ids, grantable clues, completion requirements

src/story-authority/story-state-snapshot.js
  -> creates and normalizes state without localStorage coupling

src/story-authority/stage-scene-snapshot.js
  -> summarizes scene camera/layers/props/hotspots/post settings without Three.js

src/story-authority/story-command-envelope.js
  -> wraps UI/StageKit intents into typed commands

src/story-authority/story-command-reasons.js
  -> owns stable reason ids

src/story-authority/story-command-result.js
  -> owns accepted/rejected/no_mutation/terminal result shape

src/story-authority/story-event-record.js
  -> owns journal rows for clues, route, interlude, save, reset, and projection

src/story-authority/story-reducer.js
  -> applies inspect, continue, load, save, reset, validate, and snapshot commands

src/story-authority/story-projection.js
  -> projects title/text/hotspot buttons/notebook/debug state

src/story-authority/save-projection.js
  -> projects write/clear/noop persistence intent

src/story-authority/interlude-projection.js
  -> projects open/close/terminal interlude state

src/story-authority/gamehost-story-diagnostics.js
  -> exposes additive diagnostics for window.GameHost.getState()

src/story-authority/story-fixture-cases.js
  -> defines DOM-free rows for result, projection, and validation proof

scripts/validate-story-authority.mjs
  -> executes fixture rows in Node
```

## Domains identified

```txt
implemented:
  static-page-shell
  static-pages-deploy
  browser-app-runtime
  story-source
  story-state
  localstorage-save
  notebook-log
  route-state
  interlude-overlay
  stage-render-host
  fixed-aspect-frame
  fixed-camera-composition
  scene-descriptor
  stage-layer-descriptor
  stage-prop-descriptor
  stage-hotspot-volume
  hotspot-raycast-picking
  hover-label-projection
  anime-material-shader
  webgl-post-process
  debug-json-projection

next-cut:
  story-source-snapshot
  story-state-snapshot
  stage-scene-snapshot
  story-command-envelope
  story-command-validation
  story-command-reason-authority
  story-command-result-authority
  story-event-records
  story-result-reducer
  story-projection
  save-projection
  interlude-projection
  story-host-adapter
  GameHost-story-diagnostics
  fixture-replay
  fixture-result-summary
```

## Services identified

```txt
implemented:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, KeyR reset, computeAspectFrame, applyAspectFrame, StageKit renderer/camera/raycaster/lights/render-target setup, StageKit animeMaterial, StageKit loadScene, StageKit createLayer, StageKit createProp, StageKit createHotspot, StageKit handlePointer, StageKit pick, StageKit clickHotspot, StageKit resize, StageKit animate, story scene descriptors, package syntax check.

needed next:
  createStorySourceSnapshot, validateStorySourceSnapshot, createGrantableClueIndex, createSceneCompletionIndex, createInitialStoryState, normalizeLoadedStoryState, createStoryStateSnapshot, createStageSceneSnapshot, createStoryCommandEnvelope, validateStoryCommand, createStoryCommandReason, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, applyInspectionCommand, applyContinueSceneCommand, applySaveCommand, applyLoadCommand, applyResetCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectGameHostStoryDiagnostics, runStoryFixtureSequence, summarizeStoryFixtureResults.
```

## Kits identified

```txt
implemented or implied:
  unmapped-house-static-shell-kit, unmapped-house-static-pages-deploy-kit, unmapped-house-browser-runtime-kit, unmapped-house-story-data-kit, unmapped-house-story-runtime-kit, unmapped-house-story-state-save-kit, unmapped-house-localstorage-save-kit, unmapped-house-clue-ledger-kit, unmapped-house-scene-completion-kit, unmapped-house-interlude-overlay-kit, unmapped-house-route-state-kit, unmapped-house-notebook-debug-kit, unmapped-house-aspect-frame-kit, unmapped-house-stage-kit, unmapped-house-fixed-camera-diorama-kit, unmapped-house-stage-layer-kit, unmapped-house-stage-prop-kit, unmapped-house-stage-hotspot-volume-kit, unmapped-house-hotspot-raycast-kit, unmapped-house-hover-label-kit, unmapped-house-anime-material-shader-kit, unmapped-house-stage-postprocess-kit, unmapped-house-static-validation-kit.

next-cut:
  unmapped-house-story-source-snapshot-kit, unmapped-house-story-state-snapshot-kit, unmapped-house-stage-scene-snapshot-kit, unmapped-house-story-command-envelope-kit, unmapped-house-command-validation-kit, unmapped-house-story-command-result-kit, unmapped-house-story-command-reason-kit, unmapped-house-story-reducer-kit, unmapped-house-story-event-record-kit, unmapped-house-inspection-action-kit, unmapped-house-inspection-result-contract-kit, unmapped-house-clue-ledger-reducer-kit, unmapped-house-scene-completion-result-kit, unmapped-house-scene-transition-result-kit, unmapped-house-prototype-complete-result-kit, unmapped-house-save-result-kit, unmapped-house-save-projection-kit, unmapped-house-interlude-projection-kit, unmapped-house-route-state-journal-kit, unmapped-house-command-journal-kit, unmapped-house-story-ui-projection-kit, unmapped-house-gamehost-diagnostics-kit, unmapped-house-dom-free-fixture-kit.
```

## Implementation guard

Do not move StageKit visuals or story content. The source-file cutover must first prove story rules in pure modules and then adapt `src/game.js` as a consumer.