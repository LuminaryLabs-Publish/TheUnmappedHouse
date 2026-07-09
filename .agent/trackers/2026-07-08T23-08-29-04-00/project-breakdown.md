# TheUnmappedHouse Project Breakdown

**Timestamp:** `2026-07-08T23-08-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, recently added but undocumented, missing sampled root `.agent/START_HERE.md` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest eligible fallback in the current sampled set. Its prior root alignment was `2026-07-08T21-00-12-04-00`, older than the other currently sampled non-excluded repos.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / oldest eligible sampled alignment 2026-07-08T21-00-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T21-40-45-04-00 / central readback previously recorded 2026-07-08T21-50-56-04-00
```

## Current product read

`TheUnmappedHouse` is a compact fixed-camera anime point-and-click horror prototype.

It boots through:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes `serve` and a syntax-only `check` script across `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit plus story data
  -> module-scope DOM nodes are captured
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene is resolved from scenes or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as callback
  -> StageKit loads the active scene descriptor
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, clues, text, log, completion, interlude timer, UI, and save
  -> continue button calls nextScene()
  -> nextScene mutates currentScene, sceneId, route, interlude DOM, StageKit scene, UI, and save
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Target authority loop

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
  -> GameHostStoryDiagnostics
  -> DOM-free fixture rows
  -> browser adapter consumes records without owning story rules
```

## Domains in use

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

missing-next:
  story-source-manifest
  story-source-snapshot
  story-source-preflight
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
  stage-projection
  story-browser-adapter-plan
  story-host-adapter
  GameHost-story-diagnostics
  fixture-replay
  fixture-result-summary
```

## Services the kits offer

```txt
implemented services:
  createInitialState
  loadState
  saveState
  hasClue
  grantClues
  writeLog
  sceneComplete
  inspectHotspot
  showInterlude
  nextScene
  renderUi
  KeyR reset
  computeAspectFrame
  applyAspectFrame
  StageKit renderer/camera/raycaster/lights/render-target setup
  StageKit animeMaterial
  StageKit loadScene
  StageKit createLayer
  StageKit createProp
  StageKit createHotspot
  StageKit handlePointer
  StageKit pick
  StageKit clickHotspot
  StageKit resize
  StageKit animate
  story scene descriptors
  package syntax check

needed next services:
  createStorySourceManifest
  createStorySourceSnapshot
  validateStorySourceSnapshot
  createGrantableClueIndex
  createSceneCompletionIndex
  createStoryPreflight
  createInitialStoryState
  normalizeLoadedStoryState
  createStoryStateSnapshot
  createStageSceneSnapshot
  createStoryCommandEnvelope
  validateStoryCommand
  createStoryCommandReason
  createStoryCommandResult
  createStoryEventRecord
  applyStoryCommand
  applyInspectionCommand
  applyContinueSceneCommand
  applySaveCommand
  applyLoadCommand
  applyResetCommand
  projectStoryUiState
  projectSaveIntent
  projectInterludeIntent
  projectStageIntent
  createStoryBrowserAdapterPlan
  projectGameHostStoryDiagnostics
  runStoryFixtureSequence
  summarizeStoryFixtureResults
```

## Kits

```txt
implemented or implied:
  unmapped-house-static-shell-kit
  unmapped-house-static-pages-deploy-kit
  unmapped-house-browser-runtime-kit
  unmapped-house-story-data-kit
  unmapped-house-story-runtime-kit
  unmapped-house-story-state-save-kit
  unmapped-house-localstorage-save-kit
  unmapped-house-clue-ledger-kit
  unmapped-house-scene-completion-kit
  unmapped-house-interlude-overlay-kit
  unmapped-house-route-state-kit
  unmapped-house-notebook-debug-kit
  unmapped-house-aspect-frame-kit
  unmapped-house-stage-kit
  unmapped-house-fixed-camera-diorama-kit
  unmapped-house-stage-layer-kit
  unmapped-house-stage-prop-kit
  unmapped-house-stage-hotspot-volume-kit
  unmapped-house-hotspot-raycast-kit
  unmapped-house-hover-label-kit
  unmapped-house-anime-material-shader-kit
  unmapped-house-stage-postprocess-kit
  unmapped-house-static-validation-kit
  unmapped-house-agent-state-kit
  unmapped-house-central-ledger-readback-kit

next-cut:
  unmapped-house-story-source-manifest-kit
  unmapped-house-story-source-snapshot-kit
  unmapped-house-story-source-preflight-kit
  unmapped-house-story-state-snapshot-kit
  unmapped-house-stage-scene-snapshot-kit
  unmapped-house-story-command-envelope-kit
  unmapped-house-command-validation-kit
  unmapped-house-story-command-result-kit
  unmapped-house-story-command-reason-kit
  unmapped-house-story-reducer-kit
  unmapped-house-story-event-record-kit
  unmapped-house-inspection-action-kit
  unmapped-house-inspection-result-contract-kit
  unmapped-house-clue-ledger-reducer-kit
  unmapped-house-scene-completion-result-kit
  unmapped-house-scene-transition-result-kit
  unmapped-house-prototype-complete-result-kit
  unmapped-house-save-result-kit
  unmapped-house-save-projection-kit
  unmapped-house-interlude-projection-kit
  unmapped-house-stage-projection-kit
  unmapped-house-browser-adapter-plan-kit
  unmapped-house-route-state-journal-kit
  unmapped-house-command-journal-kit
  unmapped-house-story-ui-projection-kit
  unmapped-house-gamehost-diagnostics-kit
  unmapped-house-dom-free-fixture-kit
  unmapped-house-hotspot-fixture-matrix-kit
  unmapped-house-scene-completion-fixture-kit
  unmapped-house-save-load-fixture-kit
  unmapped-house-stage-descriptor-validation-kit
  unmapped-house-fixture-summary-projection-kit
```

## Main finding

The runtime should not expand story content or rewrite StageKit next.

The active blocker is proofability at the story/adapter seam: `src/game.js` still owns source validation fallback, command dispatch, mutation, save intent, interlude timing, stage transition, reset, UI projection, and debug output in one browser module.

The next implementation should create a pure `StorySourceManifest` and fixture-backed command/result/projection layer first, then make `src/game.js` consume adapter plans.

## Next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Adapter Consumer Fixture Gate
```

Stop after fixture rows prove source validation, first inspect, repeat inspect, unknown hotspot, incomplete continue, scene completion, scene transition, prototype complete, save/load, reset, stage snapshot, story/save/interlude/stage projections, browser adapter plan, and additive GameHost diagnostics without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.
