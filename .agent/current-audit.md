# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-09T01-50-17-04-00`

## Summary

`TheUnmappedHouse` remains a compact fixed-camera anime point-and-click horror prototype.

The accessible `LuminaryLabs-Publish` repo list was compared against central `LuminaryLabs-Dev/LuminaryLabs` tracking and sampled repo-local `.agent/START_HERE.md` state. No checked non-Cavalry repo was fully new, absent from tracking, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`TheUnmappedHouse` was selected because the repo-local `.agent/START_HERE.md` had already advanced to `2026-07-09T01-40-49-04-00`, while the central ledger still showed `2026-07-08T23-19-33-04-00`. This pass preserves the story-adapter direction and makes the central-ledger readback row explicit.

## Full repo-list comparison result

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / repo-local latest 2026-07-09T01-40-49-04-00 newer than central 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T00-09-22-04-00
```

## Source read

```txt
package.json:
  exposes npm run serve and npm run check; check is syntax-only across src/aspect-frame.js, src/game.js, src/stage-kit.js, and src/story-data.js.

index.html:
  mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, #interlude, and imports ./src/game.js.

src/game.js:
  owns DOM bindings, SAVE_KEY, loadState, saveState, module-level state/currentScene, StageKit construction, inspection, clue grant, completion, interlude, next-scene routing, UI projection, debug JSON, reset, and save writes.

src/stage-kit.js:
  owns Three.js import, renderer, fixed 16:9 frame integration, render target, post-process pass, anime material, scene loading, layers, props, hotspot volumes, pointer/raycast picking, hover label, resize, and animation.

src/story-data.js:
  owns gameTitle, three ordered scene descriptors, camera descriptors, stage layers, props, post settings, hotspot ids, hotspot grants, completion requirements, and interlude text.
```

## Main finding

The render surface should remain stable. `StageKit` already owns the fixed 16:9 display, shader material, post-process, hotspot picking, and scene descriptor loading.

The source-authority issue is still in `src/game.js`: it is simultaneously command dispatcher, reducer, browser adapter, save adapter, route adapter, interlude scheduler, debug projector, and StageKit consumer.

The highest-value next pass is not a story expansion, visual rewrite, or renderer extraction. It is a pure story-authority layer with `StorySourceManifest`, command/result records, projection objects, browser-adapter plans, and readback diagnostics that make `src/game.js` a consumer instead of the source of truth.

## Current interaction loop

```txt
open index.html
  -> src/game.js loads story source and saved state
  -> StageKit loads the current fixed-camera scene
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, grants clues, writes text/log, checks scene completion, schedules interlude, renders UI, and saves
  -> continue button calls nextScene()
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
  -> KeyR clears localStorage and reloads
  -> debug panel emits an ad hoc JSON projection
```

## Target loop

```txt
UI event or StageKit callback
  -> create StorySourceManifest
  -> create StoryCommandEnvelope
  -> create StorySourceSnapshot
  -> create StoryStateSnapshot
  -> create StageSceneSnapshot
  -> run StoryPreflight
  -> applyStoryCommand
  -> return StoryCommandResult
  -> emit StoryEventRecord[]
  -> derive StoryProjection
  -> derive SaveProjection
  -> derive InterludeProjection
  -> derive StageProjection
  -> derive StoryBrowserAdapterPlan
  -> derive BrowserAdapterReadback
  -> project GameHostStoryDiagnostics
  -> emit CentralLedgerReadback
  -> verify DOM-free fixture rows
```

## Domains in use

```txt
implemented:
  static-page-shell, static-pages-deploy, browser-app-runtime, story-source, story-state, localstorage-save, notebook-log, route-state, interlude-overlay, stage-render-host, fixed-aspect-frame, fixed-camera-composition, scene-descriptor, stage-layer-descriptor, stage-prop-descriptor, stage-hotspot-volume, hotspot-raycast-picking, hover-label-projection, anime-material-shader, webgl-post-process, debug-json-projection.

missing-next:
  story-source-manifest, story-source-snapshot, story-source-preflight, story-state-snapshot, stage-scene-snapshot, story-command-envelope, story-command-validation, story-command-reason-authority, story-command-result-authority, story-event-records, story-result-reducer, story-projection, save-projection, interlude-projection, stage-projection, story-browser-adapter-plan, browser-adapter-readback, story-host-adapter, GameHost-story-diagnostics, central-ledger-readback, fixture-replay, fixture-result-summary.
```

## Services in use

```txt
implemented:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, KeyR reset, computeAspectFrame, applyAspectFrame, StageKit renderer/camera/raycaster/lights/render-target setup, StageKit animeMaterial, StageKit loadScene, StageKit createLayer, StageKit createProp, StageKit createHotspot, StageKit handlePointer, StageKit pick, StageKit clickHotspot, StageKit resize, StageKit animate, story scene descriptors, package syntax check.

needed next:
  createStorySourceManifest, createStorySourceSnapshot, validateStorySourceSnapshot, createGrantableClueIndex, createSceneCompletionIndex, createStoryPreflight, createInitialStoryState, normalizeLoadedStoryState, createStoryStateSnapshot, createStageSceneSnapshot, createStoryCommandEnvelope, validateStoryCommand, createStoryCommandReason, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, applyInspectionCommand, applyContinueSceneCommand, applySaveCommand, applyLoadCommand, applyResetCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectStageIntent, createStoryBrowserAdapterPlan, readBackBrowserAdapterPlan, projectGameHostStoryDiagnostics, createCentralLedgerReadback, runStoryFixtureSequence, summarizeStoryFixtureResults.
```

## Kits

```txt
implemented or implied:
  unmapped-house-static-shell-kit, unmapped-house-static-pages-deploy-kit, unmapped-house-browser-runtime-kit, unmapped-house-story-data-kit, unmapped-house-story-runtime-kit, unmapped-house-story-state-save-kit, unmapped-house-localstorage-save-kit, unmapped-house-clue-ledger-kit, unmapped-house-scene-completion-kit, unmapped-house-interlude-overlay-kit, unmapped-house-route-state-kit, unmapped-house-notebook-debug-kit, unmapped-house-aspect-frame-kit, unmapped-house-stage-kit, unmapped-house-fixed-camera-diorama-kit, unmapped-house-stage-layer-kit, unmapped-house-stage-prop-kit, unmapped-house-stage-hotspot-volume-kit, unmapped-house-hotspot-raycast-kit, unmapped-house-hover-label-kit, unmapped-house-anime-material-shader-kit, unmapped-house-stage-postprocess-kit, unmapped-house-static-validation-kit, unmapped-house-agent-state-kit.

next-cut:
  unmapped-house-story-source-manifest-kit, unmapped-house-story-source-snapshot-kit, unmapped-house-story-source-preflight-kit, unmapped-house-story-state-snapshot-kit, unmapped-house-stage-scene-snapshot-kit, unmapped-house-story-command-envelope-kit, unmapped-house-command-validation-kit, unmapped-house-story-command-result-kit, unmapped-house-story-command-reason-kit, unmapped-house-story-reducer-kit, unmapped-house-story-event-record-kit, unmapped-house-inspection-action-kit, unmapped-house-inspection-result-contract-kit, unmapped-house-clue-ledger-reducer-kit, unmapped-house-scene-completion-result-kit, unmapped-house-scene-transition-result-kit, unmapped-house-prototype-complete-result-kit, unmapped-house-save-result-kit, unmapped-house-save-projection-kit, unmapped-house-interlude-projection-kit, unmapped-house-stage-projection-kit, unmapped-house-browser-adapter-plan-kit, unmapped-house-browser-adapter-readback-kit, unmapped-house-route-state-journal-kit, unmapped-house-command-journal-kit, unmapped-house-story-ui-projection-kit, unmapped-house-gamehost-diagnostics-kit, unmapped-house-central-ledger-readback-kit, unmapped-house-dom-free-fixture-kit, unmapped-house-hotspot-fixture-matrix-kit, unmapped-house-scene-completion-fixture-kit, unmapped-house-save-load-fixture-kit, unmapped-house-stage-descriptor-validation-kit, unmapped-house-fixture-summary-projection-kit.
```

## Current next safe ledge

```txt
TheUnmappedHouse Story Adapter Central Readback + Fixture Freshness Gate
```

## Validation note

No runtime source files changed in this pass.

No local `npm run check`, browser smoke, static server, fixture script, or GitHub Pages validation was run.
