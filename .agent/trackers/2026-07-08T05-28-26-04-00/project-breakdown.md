# Project Breakdown — TheUnmappedHouse

**Timestamp:** `2026-07-08T05:28:26-04:00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch:** `main`

## Selected objective

Refresh repo-local and central internal documentation after confirming that the old central status-summary rollup gap is no longer open.

## Repo-selection comparison

Full accessible `LuminaryLabs-Publish` repo list observed:

```txt
AetherVale            tracked; root .agent state observed
HorrorCorridor        tracked; root .agent state observed
IntoTheMeadow         tracked; root .agent state observed
MyCozyIsland          tracked; root .agent state observed
PhantomCommand        tracked; root .agent state observed
PrehistoricRush       tracked; root .agent state observed
TheCavalryOfRome      excluded by standing rule
TheOpenAbove          tracked; root .agent state observed
TheUnmappedHouse      selected for stale central-rollup-gap cleanup
ZombieOrchard         tracked; root .agent state observed
```

No checked non-excluded repo was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`TheUnmappedHouse` was selected because the repo-local `.agent` docs and central direct ledger still described `status-summary.json` rollup inclusion as pending, while the current central `status-summary.json` schema `1.18.0` now includes this repo in `known_repos`, `active_products`, and `publish_game_map_from_direct_ledgers`.

## Interaction loop

```txt
open static route
  -> load saved state or create initial state
  -> load current scene into StageKit
  -> show story text and hotspot buttons
  -> hover/click hotspot in renderer or click side-panel button
  -> mark hotspot inspected
  -> grant clue(s)
  -> write notebook log
  -> check scene completion
  -> if complete, show interlude
  -> continue to next scene
  -> persist route, clues, inspected map, and log to localStorage
  -> KeyR clears save and reloads
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
app-runtime
story-source
scene-descriptor
story-state-save-load
clue-ledger
hotspot-inspection
inspection-result-authority
scene-completion
interlude-transition
route-state
save-state
notebook-debug
stage-render-host
fixed-camera-composition
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
hover-label-projection
anime-material-shader
webgl-post-process
runtime-diagnostics
fixture-replay
repo-local-agent-state
central-repo-ledger-readback
central-status-summary-rollup-membership
```

## Services in use

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
central repo-ledger readback
central status-summary rollup readback
```

Needed next services:

```txt
createStorySourceSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applyResetSaveCommand
createInspectionResult
createSceneCompletionResult
createSceneTransitionResult
createSaveResult
appendRouteJournalEntry
appendCommandJournalEntry
projectGameHostDiagnostics
runStoryFixtureSequence
validateSceneDescriptor
```

## Kits identified

Implemented or implied kits:

```txt
unmapped-house-static-shell-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-hover-label-kit
unmapped-house-story-data-kit
unmapped-house-story-state-save-kit
unmapped-house-localstorage-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-notebook-debug-kit
unmapped-house-route-state-kit
unmapped-house-stage-descriptor-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-fixed-camera-parallax-kit
unmapped-house-postprocess-memory-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-static-validation-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
unmapped-house-central-status-summary-rollup-membership-kit
```

Next-cut kits:

```txt
unmapped-house-story-source-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-inspection-rejection-reason-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-route-state-journal-kit
unmapped-house-save-result-kit
unmapped-house-story-snapshot-projector-kit
unmapped-house-stage-snapshot-projector-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-command-journal-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-stage-descriptor-validation-kit
```

## Main finding

The current product bottleneck is still story command authority, not repo tracking.

The prior central rollup blocker is closed. The next useful product move is to extract pure command/result contracts around hotspot inspection, scene completion, scene transition, route journaling, save/load/reset, diagnostics, and DOM-free fixture replay.

## Files updated in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/central-ledger-audit/publish-ledger-comparison.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-08T05-28-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-28-26-04-00.md
```

## Validation

```txt
Runtime source files changed: no
.agent docs changed: yes
Central ledger changed: yes
Local build/smoke run: no, connector-only documentation pass
Browser smoke run: no
Central status-summary read: yes
```

## Next safe ledge

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Keep the existing static route, visuals, scene copy, StageKit behavior, localStorage key, and Pages workflow stable while adding pure command envelopes, result records, stable reason codes, journals, diagnostics, and DOM-free fixtures.
