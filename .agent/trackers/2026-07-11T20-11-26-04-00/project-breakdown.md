# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

`TheUnmappedHouse` remains a compact fixed-camera point-and-click horror prototype with three scenes, nine authored hotspot volumes, side-panel inspection buttons, a Three.js raycast path, local persistence, and a fixed 16:9 render surface.

This breakdown isolates pointer observation and hotspot-pick authority. The canvas click handler discards the click event coordinates and raycasts with the last coordinates written by `mousemove`. The stored pointer can be uninitialized, stale after resize, stale after a scene/camera replacement, or unavailable for touch and pen input. A click can therefore select the center of the canvas or a hotspot unrelated to the actual activation location.

## Plan ledger

**Goal:** make every canvas hotspot activation derive from one current event sample and one committed stage, surface, camera, hotspot-set, and visible-frame revision before an inspection command can be admitted.

- [x] Compare the full ten-repository `LuminaryLabs-Publish` inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Skip `ZombieOrchard` because newer repo-local persistence-audit work was actively landing after its central timestamp.
- [x] Skip `PrehistoricRush` because active runtime changes were landing during selection.
- [x] Select only `TheUnmappedHouse` as the oldest stable eligible repository.
- [x] Trace mouse movement, click handling, normalized coordinates, raycasting, hover projection, camera parallax, scene replacement, resize, side-panel ingress, and inspection mutation.
- [x] Identify the interaction loop, all domains, all 24 implemented kit surfaces, and their services.
- [x] Define pointer samples, coordinate spaces, input modality, stage/surface/frame provenance, stale-pick rejection, typed pick results, parity evidence, and browser fixtures.
- [x] Add timestamped architecture, render, gameplay, interaction, pointer-picking, deploy, tracker, and turn-ledger records.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source.
- [x] Use `main` only and create no branch or pull request.
- [ ] Implement and execute the pointer/pick authority and fixture gate.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

ZombieOrchard      central 18:28, skipped because active persistence audit commits were landing
TheUnmappedHouse   central 18:38, selected as oldest stable eligible repository
AetherVale         central 18:48
IntoTheMeadow      central 19:01
PrehistoricRush    central 19:09, skipped because active runtime commits were landing
MyCozyIsland       central 19:20
TheOpenAbove       central 19:28
HorrorCorridor     central 19:38
PhantomCommand     central 19:48
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot
  -> load mutable story state
  -> create StageKit
  -> install mousemove listener
  -> install click listener that ignores the click event
  -> create current scene, camera and hotspot meshes
  -> render side-panel buttons and start RAF

mouse hover
  -> sample mousemove client coordinates
  -> normalize against current canvas rect
  -> mutate shared pointer and parallax state
  -> raycast current hotspot meshes
  -> show one hover label

canvas activation
  -> receive click event
  -> discard click coordinates and modality
  -> raycast with the last stored pointer
  -> dispatch the descriptor attached to the current hit mesh
  -> mutate inspection, clues, completion, UI and persistence

side-panel activation
  -> button closure dispatches a hotspot descriptor directly
  -> mutate the same story state without a pick observation
```

## Main source finding

`StageKit` initializes `this.pointer` to `(0, 0)`. Only `handlePointer(event)` updates it. The click listener is installed as:

```js
this.renderer.domElement.addEventListener("click", () => this.clickHotspot());
```

`clickHotspot()` then calls `pick()` without a fresh event sample. The click's own `clientX` and `clientY` never enter the pick transaction.

Concrete consequences:

```txt
click before first mousemove
  -> raycast canvas center

touch or pen activation without mousemove
  -> raycast default or stale mouse coordinates

resize after last mousemove
  -> stored normalized point has no surface revision

scene/camera replacement after last mousemove
  -> stale pointer is reinterpreted through a new camera and hotspot set

pointer leaves canvas
  -> hover and parallax state are not explicitly cleared
```

## Domains in use

```txt
browser shell and fixed 16:9 layout
story, scene, hotspot, clue and render descriptors
raw localStorage and mutable story state
scene route, inspection, clue, completion and interlude state
DOM side-panel and debug projection
Three.js renderer, scene, camera, lights and post target
hotspot volume construction
mouse coordinate observation
normalized-device-coordinate mutation
raycast hotspot picking
hover-label projection
pointer camera parallax
canvas click activation
side-panel button activation
resize and surface mutation
recursive RAF and visible rendering
runtime callbacks and resources
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical pointer-event observation
input modality and pointer identity
coordinate-space normalization result
stage epoch, surface revision and camera revision provenance
hotspot-set revision
visible-frame correlation
click-local coordinate sampling
stale observation and stale pick rejection
hover leave/cancel reset
side-panel and canvas semantic parity
typed pick and activation results
bounded pointer/pick journal
mouse, touch and pen browser proof
```

## Implemented kits and services

The repository retains 24 implemented kit responsibilities:

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Their services cover shell composition, story data, local persistence, inspection and completion mutation, scene transitions, Three.js rendering, fixed-aspect fitting, procedural materials, post processing, hotspot volume creation, mouse hover and click raycasting, camera parallax, diagnostics, validation, deployment, and audit tracking.

## Required parent domain

```txt
the-unmapped-house-pointer-pick-authority-domain
```

Candidate composition:

```txt
pointer-event-adapter-kit
pointer-sample-id-kit
pointer-modality-kit
pointer-coordinate-observation-kit
pointer-coordinate-normalization-kit
pointer-surface-revision-kit
pointer-stage-epoch-kit
pointer-camera-revision-kit
hotspot-set-revision-kit
hotspot-pick-plan-kit
hotspot-pick-result-kit
stale-pointer-observation-rejection-kit
stale-hotspot-pick-rejection-kit
hover-state-kit
pointer-leave-cancel-kit
canvas-activation-command-kit
side-panel-activation-command-kit
activation-parity-result-kit
pointer-pick-observation-kit
pointer-pick-journal-kit
pointer-pick-fixture-kit
browser-mouse-touch-pen-smoke-kit
```

## Required transaction

```txt
pointer or activation event
  -> capture event coordinates and modality immediately
  -> bind sample to session, stage epoch, surface revision and camera revision
  -> normalize coordinates against the admitted canvas rect
  -> bind the active hotspot-set revision and last committed frame
  -> prepare one pick plan
  -> reject stale or unsupported observations
  -> raycast once
  -> return a typed pick result with zero or one canonical hotspot id
  -> submit an id-only inspection command
  -> compare canvas and side-panel semantics through one activation result
  -> record a bounded detached observation
```

## Files for this run

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-11T20-11-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T20-11-26-04-00.md
.agent/architecture-audit/2026-07-11T20-11-26-04-00-pointer-pick-authority-dsk-map.md
.agent/render-audit/2026-07-11T20-11-26-04-00-stale-pointer-visible-hotspot-gap.md
.agent/gameplay-audit/2026-07-11T20-11-26-04-00-hover-click-inspect-loop.md
.agent/interaction-audit/2026-07-11T20-11-26-04-00-pointer-event-pick-result-map.md
.agent/pointer-picking-audit/2026-07-11T20-11-26-04-00-coordinate-provenance-parity-contract.md
.agent/deploy-audit/2026-07-11T20-11-26-04-00-pointer-pick-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run because the execution container could not resolve github.com
browser smoke: not run
pointer-coordinate fixture: unavailable
stale-pick fixture: unavailable
mouse/touch/pen parity fixture: unavailable
visible-frame pick fixture: unavailable
```

No canvas-pick correctness, touch support, stale-pick rejection, input-modality parity, or visible-frame correlation claim is made until the documented gate passes.
