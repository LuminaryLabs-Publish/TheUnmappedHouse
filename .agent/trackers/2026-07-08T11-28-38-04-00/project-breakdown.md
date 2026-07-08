# Project Breakdown: TheUnmappedHouse

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T11-28-38-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, refresh repo-local `.agent` docs, and log the result centrally.

**Checklist:**

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read source files for current loop and render seam.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped interaction audit.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated repo-local kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source was not changed.
- [ ] Local build/test/browser validation was not run.

## Publish repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked; root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked; root .agent observed
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent observed
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent observed
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback: story fixture replay contract
LuminaryLabs-Publish/ZombieOrchard       tracked; root .agent observed
```

## Selection reason

No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as an oldest observed eligible fallback follow-up because its story command authority remains the clearest source-backed blocker and its prior source wire map needed an acceptance-grade fixture replay contract.

The old central status-summary rollup gap is closed and is not used as the current selection reason.

## Source files read

```txt
src/game.js
src/stage-kit.js
src/story-data.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Source-backed findings

`src/game.js` owns mutable `state`, mutable `currentScene`, `SAVE_KEY`, `inspectHotspot`, `showInterlude`, `nextScene`, `renderUi`, and KeyR reset.

`inspectHotspot` directly mutates inspected state, grants clues, writes log text, checks scene completion, schedules interlude display, renders UI, and saves.

`nextScene` directly mutates `currentScene`, `state.sceneId`, `state.route`, interlude DOM, StageKit scene, UI, and save state.

`src/stage-kit.js` owns Three.js renderer setup, camera, raycaster, lights, render target, post pass, scene loading, hotspot volumes, hover label, click picking, resize, and animation.

`src/story-data.js` exports three scenes with camera, layers, props, hotspots, clue grants, completion requirements, and interlude text.

## Current interaction loop

```txt
open static route
  -> load saved state or create initial state
  -> load current scene into StageKit
  -> show story text and hotspot buttons
  -> hover/click hotspot in renderer or click side-panel button
  -> inspectHotspot(hotspot)
  -> mark hotspot inspected
  -> grant clue(s)
  -> write notebook log
  -> check scene completion
  -> if complete, show interlude
  -> continue to next scene
  -> save to localStorage
```

## Target interaction loop

```txt
UI event or StageKit callback
  -> StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> applyStoryCommand
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> command journal
  -> route journal
  -> UI projection
  -> save projection
  -> GameHost diagnostics
  -> DOM-free fixture replay
```

## Domains identified

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
story-command-validation
story-command-reason-authority
story-command-result-authority
story-event-records
inspection-action
scene-completion
scene-transition
prototype-complete-result
route-state
route-journal
notebook-debug-projection
runtime-diagnostics
GameHost-diagnostics
fixture-replay
fixture-result-summary
stage-descriptor-validation
stage-scene-snapshot
scene-descriptor-source
fixed-aspect-frame
fixed-camera-stage-renderer
Three.js-render-host
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
hover-label-projection
anime-material-shader
WebGL-post-processing
repo-local-agent-state
central-ledger-readback
```

## Services that kits offer

Implemented services:

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
StageKit constructor
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
static Pages deploy
```

Needed services:

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
applyStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applySaveStateCommand
applyLoadSaveCommand
applyResetSaveCommand
createStoryCommandResult
createStoryEventRecord
appendCommandJournalEntry
appendRouteJournalEntry
projectUiState
projectNotebookDebug
projectGameHostDiagnostics
runStoryFixtureSequence
summarizeStoryFixtureResults
```

## Kits identified

Implemented or implied:

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
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-save-load-fixture-kit
unmapped-house-stage-descriptor-validation-kit
unmapped-house-fixture-summary-projection-kit
```

## Files changed in publish repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T11-28-38-04-00-story-fixture-replay-dsk-breakdown.md
.agent/render-audit/2026-07-08T11-28-38-04-00-stage-gamehost-readback.md
.agent/interaction-audit/2026-07-08T11-28-38-04-00-story-fixture-replay-contract.md
.agent/trackers/2026-07-08T11-28-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-28-38-04-00.md
```

## Next safe ledge

```txt
TheUnmappedHouse Story Fixture Replay Contract + GameHost Projection Gate
```

Preserve current route, visuals, story copy, StageKit behavior, localStorage key, and Pages workflow.

Add pure story authority helpers, fixture replay, and additive GameHost diagnostics.

## Validation

Docs-only update.

No runtime source files were changed.

No local checkout, static server, browser smoke, Playwright run, syntax check, or GitHub Pages workflow inspection was run after these commits.
