# Project Breakdown: TheUnmappedHouse

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch policy:** only `main`; no new branch.

## Selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against central ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent/START_HERE.md`, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected because its repo-local `.agent/START_HERE.md` already read `2026-07-09T02-02-03-04-00`, while the central ledger readback still pointed at `2026-07-09T01-50-17-04-00`. This run refreshes the repo-local and central docs around the exact next implementation ledge instead of starting a second project.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / repo-local latest 2026-07-09T02-02-03-04-00 newer than central 2026-07-09T01-50-17-04-00
```

## Product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

Current route:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes `npm run serve` and a syntax-only `npm run check` across `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Interaction loop

```txt
open index.html
  -> src/game.js imports StageKit plus story data
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene is resolved from scenes or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads the current scene descriptors
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, clue state, text, log, completion, interlude timer, UI, and save
  -> continue button calls nextScene()
  -> nextScene mutates currentScene, sceneId, route, interlude DOM, StageKit scene, UI, and save
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
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
  browser-adapter-readback
  story-host-adapter
  GameHost-story-diagnostics
  central-ledger-readback
  fixture-replay
  fixture-result-summary
```

## Kit services

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
  readBackBrowserAdapterPlan
  projectGameHostStoryDiagnostics
  createCentralLedgerReadback
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
  unmapped-house-browser-adapter-readback-kit
  unmapped-house-route-state-journal-kit
  unmapped-house-command-journal-kit
  unmapped-house-story-ui-projection-kit
  unmapped-house-gamehost-diagnostics-kit
  unmapped-house-central-ledger-readback-row-kit
  unmapped-house-dom-free-fixture-kit
  unmapped-house-hotspot-fixture-matrix-kit
  unmapped-house-scene-completion-fixture-kit
  unmapped-house-save-load-fixture-kit
  unmapped-house-stage-descriptor-validation-kit
  unmapped-house-fixture-summary-projection-kit
```

## Main finding

`TheUnmappedHouse` should not expand content, audio, inventory, rooms, or renderer internals next. The active blocker is story authority proof: `src/game.js` still owns command dispatch, mutation, save intent, interlude timing, stage transition, UI projection, debug JSON, and source fallback in one browser-bound module.

The next implementation should add pure story-authority modules and a DOM-free fixture before changing StageKit behavior.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Consumer Freeze + DOM-free Fixture Gate
```

## Validation status

Documentation-only run. No runtime source changed. No package command, static server, browser smoke, GitHub Pages check, or fixture script was run.
