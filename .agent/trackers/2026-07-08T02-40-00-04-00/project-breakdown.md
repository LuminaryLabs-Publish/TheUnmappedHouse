# Project Breakdown Tracker

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T02:40:00-04:00`

**Pass type:** follow-up repo-list versus central-ledger comparison

## Plan Ledger

**Goal:** Keep `TheUnmappedHouse` repo-local `.agent` state aligned with central `LuminaryLabs-Dev/LuminaryLabs` tracking after the breakdown selector compared the full `LuminaryLabs-Publish` repo list against the central ledger.

**Checklist**

- [x] Use `LuminaryLabs-Publish/TheUnmappedHouse` on `main` only.
- [x] Do not create a branch.
- [x] Do not work on `TheCavalryOfRome`.
- [x] Compare the current `LuminaryLabs-Publish` repo list against central tracking state.
- [x] Confirm the chosen repo has root `.agent` state.
- [x] Identify interaction loop.
- [x] Identify domains in use.
- [x] Identify services that kits offer.
- [x] Identify implemented/implied kits.
- [x] Identify next-cut kits.
- [x] Add a timestamped tracker entry.
- [x] Add a timestamped turn-ledger entry.
- [x] Add a central-ledger audit folder/file.
- [x] Update core `.agent` docs.
- [x] Record the central rollup gap for future cleanup.
- [x] Do not modify runtime files.

## Selection

`TheUnmappedHouse` was selected for a follow-up pass because the full Publish repo list has no newly observed non-excluded repo that is entirely absent from central tracking, while `TheUnmappedHouse` remains partially normalized: central repo-ledger state exists, but central latest summary still treats it as direct readback context rather than normal status-summary publish-game rollup inclusion.

## Full Publish repo comparison

```txt
AetherVale        central readback present
HorrorCorridor    central readback present
IntoTheMeadow     central readback present
MyCozyIsland      central readback present
PhantomCommand    central readback present
PrehistoricRush   central readback present
TheCavalryOfRome  excluded
TheOpenAbove      central readback present
TheUnmappedHouse  selected; repo-ledger present, rollup inclusion pending
ZombieOrchard     central readback present
```

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
static page shell
static Pages deploy
fixed-camera story runtime
scene descriptor source
story state save/load
story clue ledger
hotspot inspection
scene completion
interlude transition
notebook/debug projection
fixed-camera stage renderer
Three.js render host
stage layer descriptors
stage prop descriptors
hotspot volume descriptors
pointer raycast picking
hover label projection
anime shader material
WebGL post-processing
responsive story panel styling
central ledger readback
repo-local agent state
```

## Services offered by current kits/modules

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
```

## Kits identified

Implemented or implied:

```txt
unmapped-house-static-shell-kit
unmapped-house-story-runtime-kit
unmapped-house-story-data-kit
unmapped-house-story-state-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-notebook-debug-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-hover-label-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
```

Next-cut:

```txt
unmapped-house-story-source-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-save-result-kit
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-stage-descriptor-validation-kit
```

## Findings

The product loop is coherent but host-centric.

`src/game.js` currently owns story authority directly through UI handlers and localStorage writes.

`src/stage-kit.js` is useful but broad: renderer, camera, picking, hotspot mesh creation, shader materials, post-processing, animation, and resize are all in one class.

The current next implementation objective remains story authority extraction before more content, more rooms, or renderer expansion.

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/central-ledger-audit/publish-ledger-comparison.md
.agent/trackers/2026-07-08T02-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-40-00-04-00.md
```

Central repo updates:

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T02-40-00-04-00-the-unmapped-house-central-ledger-readback-breakdown.md
```

## Validation

```txt
Runtime source files changed: no
Local build run: no
Browser smoke run: no
Connector readback / source inspection: yes
Central ledger comparison: yes
```

## Next safe ledge

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Do that before expanding story content or splitting StageKit renderer internals.