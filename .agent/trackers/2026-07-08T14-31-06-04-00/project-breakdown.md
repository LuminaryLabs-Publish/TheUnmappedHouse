# Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T14-31-06-04-00`

## Plan ledger

**Goal:** Compare the current accessible `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, refresh repo-local `.agent` docs, and log a source-safe implementation ledge in `LuminaryLabs-Dev/LuminaryLabs`.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared checked repos against central ledger state in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected exactly one repo: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified all services that current and planned kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture, render, interaction, gameplay, tracker, and turn-ledger entries.
- [x] Updated repo-local `kit-registry.json`.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source was not changed.
- [ ] Build/browser/fixture validation was not run.

## Repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T13:39:15-04:00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central update 2026-07-08T13:31:29-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T14:08:24-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T13:18:13-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T14:18:45-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central update 2026-07-08T13:50:37-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T13:11:07-04:00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / previous central review 2026-07-08T12:59:11-04:00
```

## Selection result

`TheUnmappedHouse` was selected because no checked non-Cavalry repo was new, central-ledger absent, root-agent missing, or recently added but undocumented.

After recent `PhantomCommand` and `ZombieOrchard` updates, `TheUnmappedHouse` was the oldest observed eligible fallback with an unresolved source-backed blocker.

## Current interaction loop

```txt
open static page
  -> load saved state or create initial state
  -> load current scene into StageKit
  -> show story text and hotspot buttons
  -> hover/click hotspot in renderer or click side-panel button
  -> mark hotspot inspected
  -> grant clue(s)
  -> write notebook log
  -> check scene completion
  -> if complete, show interlude after timer
  -> continue to next scene
  -> persist route, clues, inspected map, and log to localStorage
  -> KeyR clears save and reloads
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
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> GameHostStoryDiagnostics
  -> DOM-free fixture replay
```

## Domains identified

```txt
implemented:
  static-page-shell
  static-pages-deploy
  browser-app-runtime
  fixed-camera-story-runtime
  story-source
  story-state
  story-save-load
  localstorage-save
  notebook-log
  scene-completion
  scene-transition
  fixed-aspect-frame
  stage-render-host
  fixed-camera-composition
  anime-material-shader
  webgl-post-process
  stage-layer-descriptor
  stage-prop-descriptor
  stage-hotspot-volume
  hotspot-picking
  hover-label-projection

next-cut:
  story-source-snapshot
  story-state-snapshot
  stage-scene-snapshot
  story-command-envelope
  story-command-validation
  story-command-reason-authority
  story-command-result-authority
  story-result-reducer
  story-event-records
  story-projection
  save-projection
  interlude-projection
  GameHost-story-diagnostics
  fixture-replay
  fixture-result-summary
```

## Services identified

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
validateStorySourceSnapshot
createGrantableClueIndex
createSceneCompletionIndex
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
projectGameHostStoryDiagnostics
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
unmapped-house-save-projection-kit
unmapped-house-interlude-projection-kit
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

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T14-31-06-04-00-story-host-integration-dsk-map.md
.agent/render-audit/2026-07-08T14-31-06-04-00-stage-gamehost-projection-readback.md
.agent/interaction-audit/2026-07-08T14-31-06-04-00-story-command-host-wire-map.md
.agent/gameplay-audit/2026-07-08T14-31-06-04-00-room-progress-result-loop.md
.agent/trackers/2026-07-08T14-31-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T14-31-06-04-00.md
```

## Next safe ledge

```txt
TheUnmappedHouse Story Reducer Host Integration Wire Map + Fixture Gate
```

## Validation

Docs-only update.

No runtime source files were changed.

No local checkout, static server, browser smoke, Playwright run, syntax check, GitHub Actions inspection, or fixture validation was performed.
