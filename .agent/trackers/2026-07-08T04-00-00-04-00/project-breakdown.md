# The Unmapped House Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T04-00-00-04-00`

## Selection result

`TheUnmappedHouse` was selected for this breakdown pass after comparing the accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` tracking state.

No currently checked non-excluded Publish repo was completely missing central ledger state or root `.agent/START_HERE.md` state. `TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` remains the least-normalized documented repo because repo-local `.agent` state exists and central `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md` exists, but the central machine-readable status rollup still omits it from the normal publish-game map.

## Publish repo list observed

```txt
AetherVale            tracked; root .agent observed
HorrorCorridor        tracked; root .agent observed
IntoTheMeadow         tracked; root .agent observed
MyCozyIsland          tracked; root .agent observed
PhantomCommand        tracked; root .agent observed
PrehistoricRush       tracked; root .agent observed
TheCavalryOfRome      excluded by standing rule
TheOpenAbove          tracked; root .agent observed
TheUnmappedHouse      selected: central rollup normalization gap
ZombieOrchard         tracked; root .agent observed
```

## Interaction loop

```txt
index.html
  -> loads src/game.js
  -> load localStorage state or create initial story state
  -> choose current scene from src/story-data.js
  -> StageKit loads fixed-camera scene descriptors
  -> player inspects hotspots through renderer raycast or side-panel buttons
  -> inspection marks hotspot seen
  -> clue grants are written into state.clues
  -> notebook log is updated
  -> sceneComplete checks required clues
  -> completed room opens interlude overlay
  -> continue button advances to next scene
  -> route, clues, inspected map, and log persist to localStorage
  -> KeyR clears localStorage and reloads
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
browser-story-host
story-source-descriptors
story-state-save-load
localstorage-save-adapter
hotspot-inspection
clue-ledger
scene-completion
interlude-transition
route-state
notebook-debug-projection
fixed-camera-stage-renderer
threejs-render-host
scene-layer-descriptor
scene-prop-descriptor
hotspot-volume-descriptor
pointer-raycast-picking
hover-label-projection
anime-material-shader
webgl-post-process
fixed-camera-parallax
stage-descriptor-validation
runtime-diagnostics
fixture-replay
repo-local-agent-state
central-ledger-readback
central-status-rollup-normalization
```

## Services offered by current kits

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
story scene descriptor exports
static GitHub Pages deploy
```

## Kits identified

Implemented or implied:

```txt
unmapped-house-static-shell-kit
unmapped-house-browser-story-host-kit
unmapped-house-story-data-kit
unmapped-house-story-runtime-kit
unmapped-house-story-state-save-kit
unmapped-house-localstorage-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-route-state-kit
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
unmapped-house-fixed-camera-parallax-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
unmapped-house-central-status-rollup-normalization-kit
```

Needed next-cut kits:

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
unmapped-house-route-journal-kit
unmapped-house-save-result-kit
unmapped-house-story-snapshot-projector-kit
unmapped-house-stage-snapshot-projector-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-command-journal-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-stage-descriptor-validation-kit
```

## Findings

The route is already understandable and compact.

The core product issue is not missing content. It is missing command authority. Story progression currently flows from DOM event handlers into direct mutable state and direct localStorage writes. That makes the loop hard to replay, validate, or lift into reusable story kits.

The central documentation issue remains separate from product code: `TheUnmappedHouse` should be added to the normal central status-summary publish-game rollup in `LuminaryLabs-Dev/LuminaryLabs` so future repo-selection passes stop treating it as an edge-case readback target.

## Files changed this pass

```txt
.agent/START_HERE.md
.agent/trackers/2026-07-08T04-00-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-00-00-04-00.md
```

Central log added:

```txt
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T04-00-00-04-00-the-unmapped-house-rollup-followup.md
```

## Validation result

```txt
Runtime code changed: no
Browser route checked: no
Build checked: no
Connector read/write checks: yes
Central status-summary JSON changed: no
```

## Next safe ledge

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Build the pure command/result story authority before expanding story content, adding new renderer features, or changing the public route.
