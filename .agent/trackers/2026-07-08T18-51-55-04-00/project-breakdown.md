# Project Breakdown: 2026-07-08T18-51-55-04-00

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Goal

Refresh repo-local internal docs for one eligible `LuminaryLabs-Publish` repo, compare the publish org list against central ledger state, identify interaction loop/domains/services/kits, and record the next safe implementation ledge.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repositories against central `LuminaryLabs-Dev/LuminaryLabs` repo ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read source anchors: `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/aspect-frame.js`, `package.json`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented and next-cut kits.
- [x] Added architecture, render, interaction, gameplay, and story-authority audits.
- [x] Updated required root `.agent` files.
- [x] Updated kit registry.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Logged central repo-ledger and internal change-log updates.
- [x] Pushed to `main`.

## Selection comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central alignment 2026-07-08T17-49-51-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central alignment 2026-07-08T16-20-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / oldest eligible alignment 2026-07-08T16-19-57-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central alignment 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central alignment 2026-07-08T18-29-21-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central alignment 2026-07-08T16-51-11-04-00
```

## Current route

```txt
index.html
  -> src/game.js
  -> StageKit in src/stage-kit.js
  -> scene descriptors in src/story-data.js
```

## Interaction loop

```txt
open index.html
  -> load saved state or create initial state
  -> find current scene
  -> StageKit.loadScene(currentScene)
  -> player clicks side-panel hotspot button or renderer hotspot volume
  -> inspectHotspot(hotspot) mutates inspected/clues/log/text
  -> sceneComplete checks required clues
  -> completed room schedules interlude
  -> renderUi rebuilds buttons/debug
  -> saveState writes localStorage
  -> continue button calls nextScene()
  -> nextScene mutates scene/route/interlude/stage/UI/save
  -> KeyR reset removes save and reloads
```

## Domains in use

```txt
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
story-source-preflight (missing next)
story-command-authority (missing next)
story-result-reducer (missing next)
host-projection-adapter (missing next)
fixture-replay (missing next)
```

## Services

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
  computeAspectFrame
  applyAspectFrame
  StageKit.loadScene
  StageKit.createLayer
  StageKit.createProp
  StageKit.createHotspot
  StageKit.handlePointer
  StageKit.pick
  StageKit.clickHotspot
  StageKit.resize
  StageKit.animate

next services:
  createStorySourceSnapshot
  validateStorySourceSnapshot
  createStoryPreflight
  createStoryStateSnapshot
  createStageSceneSnapshot
  createStoryCommandEnvelope
  validateStoryCommand
  createStoryCommandResult
  createStoryEventRecord
  applyStoryCommand
  projectStoryUiState
  projectSaveIntent
  projectInterludeIntent
  projectStageIntent
  projectGameHostStoryDiagnostics
  runStoryFixtureSequence
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
  unmapped-house-stage-hotspot-volume-kit
  unmapped-house-hotspot-raycast-kit
  unmapped-house-hover-label-kit
  unmapped-house-anime-material-shader-kit
  unmapped-house-stage-postprocess-kit
  unmapped-house-static-validation-kit

next-cut:
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
  unmapped-house-save-projection-kit
  unmapped-house-interlude-projection-kit
  unmapped-house-stage-projection-kit
  unmapped-house-gamehost-diagnostics-kit
  unmapped-house-dom-free-fixture-kit
```

## Changed files

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T18-51-55-04-00-story-preflight-dsk-map.md
.agent/render-audit/2026-07-08T18-51-55-04-00-stage-projection-readback-contract.md
.agent/interaction-audit/2026-07-08T18-51-55-04-00-hotspot-command-preflight-map.md
.agent/gameplay-audit/2026-07-08T18-51-55-04-00-route-save-result-loop.md
.agent/story-authority-audit/2026-07-08T18-51-55-04-00-preflight-result-fixture-contract.md
.agent/trackers/2026-07-08T18-51-55-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-51-55-04-00.md
```

## Main finding

`TheUnmappedHouse` should not start its next pass by expanding content or rewriting `StageKit`.

The next high-value improvement is a pure story preflight/result fixture contract plus stage projection readback. That gives every inspect, repeat, unknown, incomplete, completion, continuation, prototype-terminal, save, load, reset, and stage-load path a stable reasoned record before the browser host consumes it.

## Next safe ledge

```txt
TheUnmappedHouse Story Preflight Result Fixture Contract + Stage Projection Readback Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
connector read/write validation: yes
pushed to main: yes
```
