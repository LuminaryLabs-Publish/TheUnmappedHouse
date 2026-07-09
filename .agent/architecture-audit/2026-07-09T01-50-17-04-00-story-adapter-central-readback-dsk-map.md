# TheUnmappedHouse Story Adapter Central Readback DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Purpose

Map the current DSK/domain boundary for `TheUnmappedHouse` and freeze the next implementation around source-owned story authority plus central-ledger readback.

## Current route

```txt
index.html
  -> src/game.js
  -> StageKit
  -> story-data descriptors
```

## Current interaction loop

```txt
open static page
  -> src/game.js binds DOM and loads saved state
  -> StageKit loads current scene descriptors
  -> side-panel button or raycast hotspot triggers inspectHotspot
  -> inspectHotspot mutates state, clue ledger, text, log, completion, interlude, UI, and save
  -> continue button triggers nextScene
  -> nextScene mutates route, stage scene, interlude, UI, and save
  -> debug panel renders ad hoc JSON
```

## Domains in use

```txt
static-shell:
  index.html, 16:9 frame, stage mount, story panel, hotspot list, notebook, hover label, interlude overlay.

browser-runtime:
  module entry, DOM node binding, initial state, localStorage load/save, KeyR reset, UI rendering.

story-source:
  gameTitle, scenes[], scene ids, titles, opening text, cameras, stage layers, props, post settings, hotspots, clue grants, completion requirements, interlude copy.

story-state:
  sceneId, clues, flags, inspected, route, log.

stage-render:
  Three renderer, perspective camera, lighting, render target, post pass, shader material, scene load, props/layers/hotspots, pointer/raycast, hover label, animation.

interaction:
  hotspot side-panel buttons, StageKit clickHotspot, inspectHotspot callback, continue button, KeyR reset.

missing story authority:
  manifest, source snapshot, state snapshot, stage snapshot, preflight, command envelope, reason catalog, command result, event records, reducer, projections, browser adapter plan, readback, GameHost diagnostics, central-ledger readback, fixtures.
```

## Services the kits offer

```txt
implemented:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, reset save, computeAspectFrame, applyAspectFrame, StageKit loadScene, StageKit pick, StageKit clickHotspot, StageKit animate.

needed:
  createStorySourceManifest, createStorySourceSnapshot, createStoryStateSnapshot, createStageSceneSnapshot, createStoryCommandEnvelope, createStoryPreflight, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectStageIntent, createStoryBrowserAdapterPlan, readBackBrowserAdapterPlan, projectGameHostStoryDiagnostics, createCentralLedgerReadback, runStoryFixtureSequence.
```

## Kits

```txt
implemented:
  static-shell-kit, browser-runtime-kit, story-data-kit, story-runtime-kit, story-state-save-kit, localstorage-save-kit, clue-ledger-kit, scene-completion-kit, interlude-overlay-kit, route-state-kit, notebook-debug-kit, aspect-frame-kit, stage-kit, fixed-camera-diorama-kit, stage-layer-kit, stage-prop-kit, stage-hotspot-volume-kit, hotspot-raycast-kit, hover-label-kit, anime-material-shader-kit, stage-postprocess-kit, static-validation-kit, agent-state-kit.

next-cut:
  story-source-manifest-kit, story-source-snapshot-kit, story-source-preflight-kit, story-state-snapshot-kit, stage-scene-snapshot-kit, story-command-envelope-kit, command-validation-kit, story-command-result-kit, story-command-reason-kit, story-reducer-kit, story-event-record-kit, inspection-action-kit, inspection-result-contract-kit, clue-ledger-reducer-kit, scene-completion-result-kit, scene-transition-result-kit, prototype-complete-result-kit, save-result-kit, save-projection-kit, interlude-projection-kit, stage-projection-kit, browser-adapter-plan-kit, browser-adapter-readback-kit, route-state-journal-kit, command-journal-kit, story-ui-projection-kit, gamehost-diagnostics-kit, central-ledger-readback-kit, dom-free-fixture-kit.
```

## Next implementation decision

Do not split StageKit first.

Cut source-owned story authority first, then make `src/game.js` a consumer of results and adapter plans.
