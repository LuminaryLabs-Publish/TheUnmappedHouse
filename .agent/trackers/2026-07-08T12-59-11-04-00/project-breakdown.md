# Project Breakdown: TheUnmappedHouse

**Timestamp:** `2026-07-08T12-59-11-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch:** `main`

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repo was fully new, central-ledger absent, undocumented, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest observed eligible fallback because its current story fixture replay contract is useful, but the exact reducer module map, result rows, projection rows, and GameHost diagnostics fields still needed to be made implementation-ready.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T12:29:17-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T12:01:23-04:00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central update 2026-07-08T11:49:04-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T12:41:31-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T12:09:27-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T12:51:50-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central update 2026-07-08T12:21:20-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T11:40:00-04:00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / latest central update 2026-07-08T11:28:38-04:00
```

## Current interaction loop

```txt
open index.html
  -> browser loads src/game.js
  -> import StageKit and story-data scenes
  -> load localStorage state or create initial story state
  -> choose current scene by state.sceneId
  -> StageKit loads the fixed-camera scene descriptor
  -> UI renders story text, hotspot buttons, and debug JSON
  -> player clicks StageKit hotspot or side-panel hotspot button
  -> inspectHotspot mutates inspected map and clue ledger
  -> text/log/save UI update immediately
  -> sceneComplete checks required clue strings
  -> if complete, setTimeout opens interlude
  -> Continue calls nextScene
  -> nextScene mutates currentScene, route, log, StageKit scene, UI, and localStorage
  -> KeyR deletes the save and reloads the page
```

## Target implementation loop

```txt
StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> StoryCommandEnvelope
  -> validateStoryCommand
  -> applyStoryCommand
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> SceneCompletionResult / SceneTransitionResult / SaveResult
  -> StoryProjection
  -> GameHostStoryDiagnostics
  -> DOM-free fixture rows
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
browser-app-runtime
fixed-camera-story-runtime
story-source
story-source-snapshot
story-state
story-state-snapshot
story-save-load
story-command-authority
story-command-envelope
story-command-validation
story-command-reason-authority
story-command-result-authority
story-result-reducer
story-event-records
inspection-action
inspection-result
clue-ledger-reducer
scene-completion
scene-completion-result
scene-transition
scene-transition-result
prototype-complete-result
save-result
reset-result
route-state
route-journal
command-journal
notebook-debug
story-projection
GameHost-story-diagnostics
fixture-replay
fixture-result-summary
stage-descriptor-validation
stage-scene-snapshot
fixed-aspect-frame
stage-render-host
fixed-camera-composition
fixed-camera-parallax
anime-material-shader
webgl-post-process
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
hover-label-projection
```

## Services the kits offer

Current services:

```txt
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
static Pages deployment
```

Needed next services:

```txt
createStorySourceSnapshot
createSceneGrantIndex
createSceneCompletionIndex
validateStorySourceSnapshot
createInitialStoryState
normalizeLoadedStoryState
createStoryStateSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
createStoryCommandReason
applyStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applySaveCommand
applyLoadCommand
applyResetCommand
createStoryCommandResult
createStoryEventRecord
createInspectionResult
createSceneCompletionResult
createSceneTransitionResult
createPrototypeCompleteResult
createSaveResult
appendRouteJournalEntry
appendCommandJournalEntry
projectStoryUiState
projectNotebookDebug
projectGameHostDiagnostics
runStoryFixtureSequence
summarizeStoryFixtureResults
```

## Kits identified

Implemented or implied kits:

```txt
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
```

Next-cut kits:

```txt
unmapped-house-story-source-snapshot-kit
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

## Source-backed findings

```txt
README.md confirms this is a fixed-camera anime point-and-click horror prototype using StageKit, hotspots, story state, shader materials, and post-processing.
package.json exposes npm run check but no DOM-free story fixture script yet.
src/game.js confirms story state and currentScene are module-level mutable state.
src/game.js confirms inspectHotspot directly mutates inspected/clue/log state and writes localStorage.
src/game.js confirms nextScene directly mutates sceneId, route, StageKit scene, UI, and localStorage.
src/game.js confirms KeyR reset deletes localStorage and reloads without returning a reset result.
src/stage-kit.js confirms StageKit owns Three.js renderer, render target, post-process shader, hotspot raycast volumes, picking, and animation.
src/story-data.js confirms three authored scenes with stage descriptors, hotspots, clue grants, completion requirements, and interlude copy.
```

## Main implementation gap

The previous fixture replay contract describes what to prove, but the next coder still needs exact pure-source files and result row fields.

The new ledge should add the pure `src/story-authority/` layer, keep existing UI as a consumer, and make `window.GameHost.getState()` additive after the pure reducer is fixture-proven.

## Next safe ledge

```txt
TheUnmappedHouse Story Result Reducer Implementation Map + Fixture Rows
```

Stop when `npm run check` and a new DOM-free story fixture can prove initial state, first inspect, repeated inspect, unknown hotspot rejection, incomplete continue rejection, scene completion, scene transition, prototype complete, save/load, reset, duplicate descriptor rejection, ungrantable clue rejection, StageSceneSnapshot readback, StoryProjection, and GameHost diagnostics projection.

## Validation status

```txt
runtime source changed: no
.agent docs changed: yes
central ledger changed: yes
local npm run check: not run
browser smoke: not run
fixture script: not created or run
branch created: no
pull request created: no
pushed to main: yes
```
