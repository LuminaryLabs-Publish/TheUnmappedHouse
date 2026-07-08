# Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T01:50:19-04:00`

## Goal

Break down `TheUnmappedHouse` into its current loop, domains, services, kits, gaps, and next implementation ledge.

## Selection result

The full `LuminaryLabs-Publish` repo list was checked.

`TheCavalryOfRome` was excluded by standing rule.

`TheUnmappedHouse` was selected because it had central ledger references but no root `.agent/START_HERE.md` in the repo itself.

## Repo summary

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

It presents locked-camera Three.js diorama rooms, lets the player inspect hotspots, records clue state, shows interludes after all room clues are found, and persists progress in localStorage.

## Interaction loop

```txt
static page opens
  -> game state loads
  -> current scene descriptor loads
  -> StageKit renders fixed-camera diorama
  -> player inspects hotspots
  -> clues are granted
  -> room completion is checked
  -> interlude opens
  -> player continues
  -> route advances
  -> state persists
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
story-runtime
story-data-source
story-state-save
clue-ledger
scene-completion
interlude-transition
notebook-debug
fixed-camera-stage-renderer
scene-descriptor
stage-layer-descriptor
stage-prop-descriptor
hotspot-volume-descriptor
hotspot-raycast
hover-label
anime-material-shader
webgl-post-process
responsive-ui-style
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
StageKit renderer setup
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
Pages deploy workflow
```

## Kits in use

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
```

## Next kits to add

```txt
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-save-result-kit
unmapped-house-story-snapshot-projector-kit
unmapped-house-stage-snapshot-projector-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-stage-descriptor-validation-kit
```

## Current gap summary

```txt
The project is playable as a browser prototype, but state authority is not yet factored into pure command/result services. The renderer is also bundled into one StageKit class. Story authority extraction should happen before renderer extraction.
```

## Next safe implementation

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

## Validation status

```txt
Source inspection: complete
Runtime code changed: no
Agent docs added: yes
Local smoke run: no
Browser smoke run: no
```

## Changed files

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/stage-render-audit.md
.agent/interaction-audit/hotspot-loop-audit.md
.agent/turn-ledger/2026-07-08T01-50-19-04-00.md
.agent/trackers/2026-07-08T01-50-19-04-00/project-breakdown.md
```