# Project Breakdown - TheUnmappedHouse

**Timestamp:** `2026-07-08T21-00-12-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

## Selection

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was new, absent from the central ledger, recently added but undocumented, missing root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest eligible fallback. Its previous sampled root alignment was `2026-07-08T18-51-55-04-00`.

## Repo list comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / oldest sampled alignment 2026-07-08T18-51-55-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T20-01-23-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T19-30-31-04-00
```

## Current route and interaction loop

```txt
index.html
  -> src/game.js
  -> imports StageKit and story data
  -> DOM nodes captured at module scope
  -> create/load state from localStorage
  -> StageKit loads the current scene
  -> side-panel hotspot button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected map, grants clues, writes text/log, checks scene completion, schedules interlude, renders UI, saves
  -> continue button calls nextScene()
  -> nextScene mutates currentScene, route, interlude DOM, StageKit scene, UI, save
  -> KeyR clears save and reloads
  -> debug panel emits ad hoc JSON
```

## Current domains

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
```

## Missing next domains

```txt
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

## Services currently offered

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
package syntax check
```

## Services needed next

```txt
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

## Implemented or implied kits

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

## Next-cut kits

```txt
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

The prototype already has a clean small visual route. The unresolved risk is authority location: `src/game.js` owns story rules, save behavior, interlude timing, StageKit scene changes, and debug projection.

The next source pass should create pure story authority modules and make `src/game.js` consume a `StoryBrowserAdapterPlan` instead of embedding the rules in DOM handlers.

## Next safe ledge

```txt
TheUnmappedHouse Story Browser Adapter Projection Map + Fixture Contract
```

## Validation performed

```txt
GitHub connector repo-list read
GitHub connector central-ledger read
GitHub connector repo-local .agent read
GitHub connector source reads
GitHub connector writes to main
```

## Validation not performed

```txt
local checkout
npm install
npm run check
static server
browser smoke
GitHub Pages live check
runtime source edit
fixture script run
```
