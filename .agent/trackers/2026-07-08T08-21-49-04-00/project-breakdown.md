# Project Breakdown Tracker

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T08:21:49-04:00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, select one eligible repo, update its root `.agent/` docs, and log the pass centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared the repo list against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Checked root `.agent/START_HERE.md` state for eligible repos.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read `README.md`.
- [x] Read `package.json`.
- [x] Read `src/game.js`.
- [x] Read `src/stage-kit.js`.
- [x] Read `src/story-data.js`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified kits.
- [x] Updated required root `.agent/` docs.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped interaction/story authority audit.
- [x] Added timestamped turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local `npm run check`.
- [ ] Did not run browser/GitHub Pages validation.

## Selection result

```txt
Selected: LuminaryLabs-Publish/TheUnmappedHouse
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
Branch: main
Runtime source changed: no
Documentation changed: yes
Central ledger changed: yes
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as the oldest eligible documented fallback with an unresolved source-backed story authority seam.

The old central rollup gap is closed and should not be used as the reason to select this repo again.

## Publish repos observed

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent
```

## Interaction loop identified

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
story-authority
state-save
stage-render-host
fixed-camera-composition
anime-material-shader
webgl-post-process
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
hover-label-projection
inspection-action
clue-ledger
scene-completion
interlude-transition
route-state
save-state
reset-state
notebook-debug
runtime-diagnostics
fixture-replay
stage-descriptor-validation
repo-local-agent-state
central-ledger-readback
```

## Services identified

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
```

Needed next services:

```txt
createStorySourceSnapshot
createStoryStateSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
applyStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applyResetSaveCommand
applyLoadSaveCommand
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
unmapped-house-story-runtime-kit
unmapped-house-story-state-save-kit
unmapped-house-localstorage-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-notebook-debug-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-static-validation-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
unmapped-house-central-status-summary-rollup-membership-kit
```

Needed next-cut kits:

```txt
unmapped-house-story-source-snapshot-kit
unmapped-house-story-state-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-story-command-result-kit
unmapped-house-story-command-reason-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-save-result-kit
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-save-load-fixture-kit
unmapped-house-stage-descriptor-validation-kit
```

## Files changed in publish repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T08-21-49-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T08-21-49-04-00-stage-render-readback.md
.agent/interaction-audit/2026-07-08T08-21-49-04-00-story-command-result-acceptance-ledger.md
.agent/trackers/2026-07-08T08-21-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-21-49-04-00.md
```

## Files changed in central repo

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T08-21-49-04-00-the-unmapped-house-story-command-result-ledger.md
```

## Main finding

`TheUnmappedHouse` already has the needed product loop and visual proof surface.

The blocker is source authority: inspection, clue grants, room completion, scene transitions, route updates, local save writes, reset, and debug projection are still controlled directly by DOM/UI handlers instead of command/result services.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Result Acceptance Ledger
```

Implement the command/result fixture gate before new rooms, renderer extraction, inventory, audio, route graph work, or save slots.

## Validation

Performed:

```txt
GitHub repo list read
central ledger/source readback
repo-local source readback
repo-local .agent read/write
central ledger write
central change-log write
```

Not performed:

```txt
local checkout
npm run check
local static server
browser smoke
GitHub Pages smoke
GitHub Actions rerun
runtime source edit
```