# Project breakdown: completion timer authority central sync

**Timestamp:** `2026-07-12T08-18-23-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`

## Summary

This pass selected `TheUnmappedHouse` because its repository-local completion-timer audit advanced to `2026-07-12T08-10-36-04-00` while the central `LuminaryLabs-Dev/LuminaryLabs` ledger still described the older modal-focus audit from `2026-07-12T06-30-34-04-00`.

The repo-local audit is complete and source-backed. The remaining task for this run is to preserve that breakdown, add a new timestamped synchronization record, and align the central ledger and internal change log without changing runtime behavior.

## Plan ledger

**Goal:** synchronize the completed completion-timer breakdown into central tracking while preserving one-project scope, direct-main policy, and the exact repo-local audit evidence.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with central ledger entries.
- [x] Verify every eligible repository has a root `.agent/START_HERE.md`.
- [x] Detect that `TheUnmappedHouse` has a newer repo-local audit than its central ledger.
- [x] Select only `TheUnmappedHouse`.
- [x] Read the current repo-local entrypoint, current audit and `src/game.js`.
- [x] Preserve the 24 implemented-kit inventory and service map.
- [x] Preserve the completion-timer authority DSK, render, gameplay, interaction, timer-system and deploy audits.
- [x] Add a new timestamped tracker, turn-ledger entry and central-sync audit.
- [x] Change documentation only.
- [ ] Runtime timer authority and browser event-order fixtures remain future work.

## Full repository comparison

```txt
accessible Publish repositories: 10
eligible repositories: 9
excluded: TheCavalryOfRome
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

central timestamp order observed before selection:
TheUnmappedHouse   2026-07-12T06-30-34-04-00, repo-local advanced to 08-10-36
AetherVale         2026-07-12T06-41-32-04-00
TheOpenAbove       2026-07-12T07-00-48-04-00
PrehistoricRush    2026-07-12T07-09-49-04-00
IntoTheMeadow      2026-07-12T07-19-47-04-00
PhantomCommand     2026-07-12T07-29-32-04-00
HorrorCorridor     2026-07-12T07-41-06-04-00
ZombieOrchard      2026-07-12T07-51-04-04-00
MyCozyIsland       2026-07-12T08-00-16-04-00
```

## Interaction loop

```txt
boot
  -> load one mutable localStorage snapshot
  -> resolve currentScene
  -> construct StageKit
  -> load scene, project UI and save

inspection
  -> canvas or side-panel activation calls inspectHotspot()
  -> mutate inspected, clues, log and narrative
  -> when sceneComplete(currentScene) becomes true
     schedule setTimeout(() => showInterlude(currentScene), 450)
  -> discard the timeout handle
  -> render UI and save

transition during delay
  -> nextScene() may mutate currentScene
  -> hide interlude
  -> replace stage resources
  -> render and persist successor state

delayed callback
  -> resolve mutable currentScene at fire time
  -> write that scene's interlude copy
  -> open the interlude without timer, scene, proof or transition admission
```

## Domains in use

```txt
browser shell and fixed 16:9 composition
authored story, scene, hotspot and render descriptors
mutable story snapshot and raw localStorage effects
scene route, inspection, clues, flags and notebook log
scene-completion derivation
unretained 450 ms completion timeout
interlude, terminal and debug projection
modal visibility, native focus and Continue activation
Three.js CDN runtime
WebGL renderer, target, stage and post-processing passes
live scene replacement and procedural resource allocation
hotspot volumes, raycasting and camera parallax
resize, pointer, keyboard, timeout and recursive RAF callbacks
syntax validation, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
static-page-shell-kit
  stage, story panel, hotspot list, hover label, debug panel, interlude shell

aspect-frame-kit
  fixed 1920 x 1080 composition and viewport fitting

story-data-kit
  scene, hotspot, clue, camera, material, post and interlude descriptors

browser-story-runtime-kit
  loading, inspection, completion, Continue, reset, projection and persistence

scene-route-kit
  current-scene and route mutation

inspection-ledger-kit
  scene-keyed hotspot inspection state

clue-ledger-kit
  global clue grant and query

notebook-log-kit
  prepend and bound story log rows

interlude-timer-kit
  unretained 450 ms delayed interlude callback

terminal-route-kit
  final prototype copy without terminal state or timer barrier

localstorage-save-kit
  raw read, shallow merge, write and clear effects

stage-render-kit
  renderer, camera, lights, render target, canvas, listeners and recursive RAF

scene-descriptor-consumer-kit
  scene descriptor to live Three.js resource graph

anime-material-kit
  procedural shader materials and animated uniforms

post-process-kit
  grain, vignette, chromatic, distortion, memory and scan-line effects

hotspot-volume-kit
  invisible pick volumes with hotspot descriptors

hotspot-picking-kit
  hover/click raycasting and descriptor dispatch

camera-parallax-kit
  pointer-driven fixed-camera offsets

render-target-composition-kit
  stage-target and post-process pass submission

debug-json-projection-kit
  aggregate story-state projection

package-syntax-check-kit
  JavaScript syntax checks

static-pages-deploy-kit
  static route deployment from main

repo-local-agent-ledger-kit
  root pointers and timestamped audits

central-ledger-sync-kit
  central selection and findings history
```

## Main source finding

`src/game.js` schedules `setTimeout(() => showInterlude(currentScene), 450)` when a scene becomes complete. The timeout handle is not retained, and the arrow callback reads the mutable `currentScene` binding when it fires.

`nextScene()` can change `currentScene`, hide the interlude, replace live stage resources and persist successor state without cancelling or invalidating the pending callback. On the final scene, terminal copy can also be overwritten by delayed normal-interlude copy.

## Required authority

```txt
the-unmapped-house-completion-timer-generation-authority-domain
```

Required services:

```txt
timer identity and generation
immutable callback context
timeout lease ownership and cancellation
scene-transition, reset, terminal-route and runtime-stop barriers
stale callback rejection
typed schedule, cancel and fire results
interlude-open intent admission
detached timer observations and bounded journal
transition-before-delay and terminal-before-delay fixtures
production browser timer-order smoke
```

## Existing required audit family verified

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-12T08-10-36-04-00.md
.agent/architecture-audit/2026-07-12T08-10-36-04-00-completion-timer-generation-dsk-map.md
.agent/render-audit/2026-07-12T08-10-36-04-00-stale-delay-interlude-visible-scene-gap.md
.agent/gameplay-audit/2026-07-12T08-10-36-04-00-complete-transition-delayed-open-loop.md
.agent/interaction-audit/2026-07-12T08-10-36-04-00-completion-schedule-cancel-fire-result-map.md
.agent/timer-system-audit/2026-07-12T08-10-36-04-00-generation-lease-transition-barrier-contract.md
.agent/deploy-audit/2026-07-12T08-10-36-04-00-completion-timer-order-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
story content changed: no
timer behavior changed: no
modal or transition behavior changed: no
rendering changed: no
package scripts or dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
```

No executable proof currently validates timer identity, cancellation, stale-callback rejection, transition barriers, terminal-copy stability or browser event-loop ordering.