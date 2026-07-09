# TheUnmappedHouse Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent/START_HERE.md`, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected because repo-local `.agent` state had already advanced to `2026-07-09T01-50-17-04-00`, while the central ledger readback still pointed at `2026-07-08T23-19-33-04-00` before this run. This pass catches central tracking up and narrows the same next ledge into a central-ledger splice/readback contract.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / repo-local latest 2026-07-09T01-50-17-04-00 newer than central 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T00-09-22-04-00
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

Current public route:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes `npm run serve` and `npm run check`; the check is syntax-only across `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit plus story data
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene is resolved from scenes or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads current scene descriptors
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot directly mutates inspected state, clue state, story text, notebook log, completion state, interlude timer, UI, and save
  -> continue button calls nextScene()
  -> nextScene directly mutates currentScene, sceneId, route, interlude DOM, StageKit scene, UI, and save
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Target authority/readback loop

```txt
UI event or StageKit callback
  -> StorySourceManifest
  -> StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> CentralLedgerReadback
  -> DOM-free fixture rows
```

## Domains in use

```txt
implemented:
  static-page-shell, static-pages-deploy, browser-app-runtime, story-source, story-state, localstorage-save, notebook-log, route-state, interlude-overlay, stage-render-host, fixed-aspect-frame, fixed-camera-composition, scene-descriptor, stage-layer-descriptor, stage-prop-descriptor, stage-hotspot-volume, hotspot-raycast-picking, hover-label-projection, anime-material-shader, webgl-post-process, debug-json-projection

missing-next:
  story-source-manifest, story-source-snapshot, story-source-preflight, story-state-snapshot, stage-scene-snapshot, story-command-envelope, story-command-validation, story-command-reason-authority, story-command-result-authority, story-event-records, story-result-reducer, story-projection, save-projection, interlude-projection, stage-projection, story-browser-adapter-plan, browser-adapter-readback, story-host-adapter, GameHost-story-diagnostics, central-ledger-readback, fixture-replay, fixture-result-summary
```

## Services the kits offer

```txt
implemented:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, KeyR reset, computeAspectFrame, applyAspectFrame, StageKit renderer/camera/raycaster/lights/render-target setup, StageKit animeMaterial, StageKit loadScene, StageKit createLayer, StageKit createProp, StageKit createHotspot, StageKit handlePointer, StageKit pick, StageKit clickHotspot, StageKit resize, StageKit animate, story scene descriptors, package syntax check

needed next:
  createStorySourceManifest, createStorySourceSnapshot, validateStorySourceSnapshot, createGrantableClueIndex, createSceneCompletionIndex, createStoryPreflight, createInitialStoryState, normalizeLoadedStoryState, createStoryStateSnapshot, createStageSceneSnapshot, createStoryCommandEnvelope, validateStoryCommand, createStoryCommandReason, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, applyInspectionCommand, applyContinueSceneCommand, applySaveCommand, applyLoadCommand, applyResetCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectStageIntent, createStoryBrowserAdapterPlan, readBackBrowserAdapterPlan, projectGameHostStoryDiagnostics, createCentralLedgerReadback, runStoryFixtureSequence, summarizeStoryFixtureResults
```

## Kits

```txt
implemented or implied:
  unmapped-house-static-shell-kit, unmapped-house-static-pages-deploy-kit, unmapped-house-browser-runtime-kit, unmapped-house-story-data-kit, unmapped-house-story-runtime-kit, unmapped-house-story-state-save-kit, unmapped-house-localstorage-save-kit, unmapped-house-clue-ledger-kit, unmapped-house-scene-completion-kit, unmapped-house-interlude-overlay-kit, unmapped-house-route-state-kit, unmapped-house-notebook-debug-kit, unmapped-house-aspect-frame-kit, unmapped-house-stage-kit, unmapped-house-fixed-camera-diorama-kit, unmapped-house-stage-layer-kit, unmapped-house-stage-prop-kit, unmapped-house-stage-hotspot-volume-kit, unmapped-house-hotspot-raycast-kit, unmapped-house-hover-label-kit, unmapped-house-anime-material-shader-kit, unmapped-house-stage-postprocess-kit, unmapped-house-static-validation-kit, unmapped-house-agent-state-kit, unmapped-house-central-ledger-readback-kit

next-cut:
  unmapped-house-story-source-manifest-kit, unmapped-house-story-source-snapshot-kit, unmapped-house-story-source-preflight-kit, unmapped-house-story-state-snapshot-kit, unmapped-house-stage-scene-snapshot-kit, unmapped-house-story-command-envelope-kit, unmapped-house-command-validation-kit, unmapped-house-story-command-result-kit, unmapped-house-story-command-reason-kit, unmapped-house-story-reducer-kit, unmapped-house-story-event-record-kit, unmapped-house-inspection-action-kit, unmapped-house-inspection-result-contract-kit, unmapped-house-clue-ledger-reducer-kit, unmapped-house-scene-completion-result-kit, unmapped-house-scene-transition-result-kit, unmapped-house-prototype-complete-result-kit, unmapped-house-save-result-kit, unmapped-house-save-projection-kit, unmapped-house-interlude-projection-kit, unmapped-house-stage-projection-kit, unmapped-house-browser-adapter-plan-kit, unmapped-house-browser-adapter-readback-kit, unmapped-house-route-state-journal-kit, unmapped-house-command-journal-kit, unmapped-house-story-ui-projection-kit, unmapped-house-gamehost-diagnostics-kit, unmapped-house-central-ledger-readback-row-kit, unmapped-house-dom-free-fixture-kit, unmapped-house-hotspot-fixture-matrix-kit, unmapped-house-scene-completion-fixture-kit, unmapped-house-save-load-fixture-kit, unmapped-house-stage-descriptor-validation-kit, unmapped-house-fixture-summary-projection-kit
```

## Main finding

`TheUnmappedHouse` should not receive story expansion, renderer extraction, new art, audio, inventory, or browser automation next.

The highest-value cut is to move story authority out of `src/game.js` into pure source/reducer/projection/readback modules, then let the browser host consume `StoryBrowserAdapterPlan` records and expose additive `window.GameHost.getState().story` diagnostics.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Central Ledger Splice + Browser Adapter Readback Fixture Gate
```

## Validation

```txt
runtime source changed: no
agent docs changed: yes
central ledger changed: yes
local npm run check: no
browser smoke: no
fixture script run: no
branch created: no
pull request created: no
pushed to main: yes
```