# Project breakdown: The Unmapped House WebGL context and stage recovery

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `webgl-context-stage-recovery-authority-audited`

## Summary

`TheUnmappedHouse` owns one application-lifetime Three.js renderer, one offscreen render target, one post-processing graph, scene geometry, shader materials, hotspot volumes and a recursive animation loop. The browser application has no explicit WebGL context-loss or restoration policy, no presentation-readiness state, no DOM fallback, no resource-generation manifest and no acknowledgement proving that a restored context has produced a visible stage frame.

This is a documentation-only breakdown. Runtime JavaScript, HTML, CSS, story data, dependencies and deployment were not changed.

## Plan ledger

**Goal:** make WebGL context loss a bounded presentation transition that preserves story truth, suspends unsafe stage interaction, rebuilds one complete stage-resource generation and proves the first recovered visible frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Compare all nine repository heads with the recorded repo-local documentation heads.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing or locally ahead.
- [x] Select only `LuminaryLabs-Publish/TheUnmappedHouse` by the oldest eligible central timestamp.
- [x] Inspect browser boot, renderer construction, stage loading, pointer interaction, render targets, RAF scheduling and package validation.
- [x] Preserve all 24 implemented kit surfaces and their offered services.
- [x] Define the WebGL context and stage-recovery authority family.
- [x] Add timestamped architecture, render, gameplay, interaction, WebGL-lifecycle, deploy and central-sync audits.
- [x] Refresh the required root `.agent` documents and machine registry.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement the recovery authority and execute real-browser context-loss fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
locally-ahead eligible repositories: 0

TheUnmappedHouse   2026-07-13T19-58-19-04-00 selected
AetherVale         2026-07-13T20-40-15-04-00
PhantomCommand     2026-07-13T21-02-54-04-00
PrehistoricRush    2026-07-13T21-38-52-04-00
IntoTheMeadow      2026-07-13T22-40-52-04-00
TheOpenAbove       2026-07-13T22-58-22-04-00
HorrorCorridor     2026-07-13T23-38-39-04-00
MyCozyIsland       2026-07-13T23-58-48-04-00
ZombieOrchard      2026-07-14T00-38-19-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` was modified in the Publish organization.

## Complete interaction loop

```txt
browser boot
  -> index.html creates stage, story panel, hotspot list, Notebook and interlude
  -> game.js loads browser state and resolves currentScene
  -> StageKit creates WebGLRenderer, Scene, Camera and lights
  -> StageKit creates WebGLRenderTarget and post-processing scene
  -> StageKit installs resize, mousemove and click listeners
  -> StageKit starts recursive requestAnimationFrame
  -> game.js loads the current scene and enables story controls

normal frame
  -> update camera parallax
  -> update stage and post-process time uniforms
  -> render stage scene into offscreen target
  -> render post scene to the canvas

interaction
  -> mousemove updates normalized pointer and hover state
  -> raycaster intersects hotspot volumes
  -> click dispatches the authored hotspot to game.js
  -> story state, UI and save mutate independently from presentation readiness

WebGL context loss
  -> no application-owned webglcontextlost event handler
  -> no preventDefault restoration policy
  -> no context generation or render-submission lease is retired
  -> recursive RAF remains application-owned
  -> DOM hotspot buttons and story commands remain admitted
  -> no visible fallback or readiness downgrade is published

context restoration
  -> no application-owned recovery command or resource manifest
  -> no explicit renderer, target, shader, geometry or hotspot rebuild receipt
  -> no atomic stage-generation adoption
  -> no first recovered visible-frame acknowledgement
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Static stage shell, story panel, hotspot controls, Notebook, hover label and interlude. |
| `src/game.js` | Story state, scene resolution, hotspot effects, progression, UI, save and reset. |
| `src/story-data.js` | Three authored scene descriptors, nine hotspots, clue grants, cameras, materials and post settings. |
| `src/stage-kit.js` | Three.js provider import, renderer, render target, stage resources, pointer picking, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed-aspect frame calculation and application. |
| `package.json` | Syntax-only JavaScript validation and local static serving. |
| `.github/workflows/deploy-pages.yml` | Static GitHub Pages deployment from `main`. |

## Domains in use

```txt
browser document, fixed-aspect shell and lifecycle
story state, scenes, clues, inspection and progression
localStorage persistence and reset
DOM buttons, keyboard, pointer and hover interaction
Three.js provider and WebGL renderer
WebGL context lifecycle and generation identity
scene, camera, lighting and descriptor consumption
procedural anime shader materials
render-target allocation and post-processing
hotspot volumes, raycasting and dispatch
camera parallax and fixed-camera presentation
recursive RAF and render-submission ownership
presentation readiness, fallback and interaction admission
GPU resource reconstruction and atomic stage adoption
first recovered visible-frame evidence
syntax validation, static serving and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

```txt
implemented source-backed kit surfaces: 24
planned WebGL recovery coordinating surfaces: 22
```

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed design aspect, window-fit calculation and DOM frame placement. |
| `story-data-kit` | Scene descriptors, hotspots, clue grants, completion rules, camera, materials and post descriptors. |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, continue, reset, UI projection and persistence calls. |
| `scene-route-kit` | Scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and query. |
| `notebook-log-kit` | Narrative log mutation and bounded retention. |
| `interlude-timer-kit` | Delayed completion interlude. |
| `terminal-route-kit` | Prototype-complete projection. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post-process construction. |
| `anime-material-kit` | Procedural shader materials and time-uniform updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | Coordinate normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass, post pass and target sizing. |
| `debug-json-projection-kit` | Story-field serialization and Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks over local JavaScript. |
| `static-pages-deploy-kit` | Repository-root artifact upload and Pages deployment on `main`. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Central selection mirror and findings history. |

## Main findings

### One application-lifetime presentation graph

`StageKit` constructs one renderer, one scene, one camera, one offscreen render target, one post material and one recursive frame loop. The application has no explicit presentation generation or rebuild boundary.

### Context events are not owned

No `webglcontextlost` or `webglcontextrestored` listener exists. There is no application policy for preventing default loss handling, freezing submissions, showing a fallback or beginning recovery.

### Story interaction can outlive stage presentation

DOM inspection buttons remain active independently from WebGL readiness. A player can continue mutating story state and durable save state while the stage is unavailable or unverified.

### Recovery participants are not declared

A complete recovery would need to account for the renderer, canvas context, render target, post scene, post material, scene geometry, shader materials, hotspot volumes, camera state, lights, viewport and render loop. No manifest or participant receipt exists.

### Restored visibility is not proven

There is no context-recovery result, recovered stage revision or first recovered visible-frame acknowledgement. The application cannot distinguish a restored context from a visibly correct reconstructed scene.

### Validation is syntax-only

`npm run check` executes `node --check` and cannot create a browser WebGL context, force context loss, verify fallback state, restore resources or correlate a recovered frame.

## Required parent domain

```txt
the-unmapped-house-webgl-context-stage-recovery-authority-domain
```

## Required transaction

```txt
WebGLContextLifecycleEvent
  -> bind SurfaceId, ContextGeneration and StageGeneration
  -> classify Lost, Restoring, Restored or Failed
  -> retire the predecessor render-submission lease
  -> downgrade presentation readiness and suspend stage-dependent input
  -> preserve story truth and expose a DOM-only fallback
  -> collect the complete stage-resource manifest
  -> prepare renderer, target, shader, geometry, hotspot and camera candidates
  -> validate capabilities, viewport and descriptor compatibility
  -> submit one detached recovery probe frame
  -> atomically adopt every participant or preserve the failed state
  -> publish WebGLStageRecoveryResult
  -> resume admitted interaction and render submission
  -> publish FirstRecoveredStageFrameAck
```

## Planned coordinating kits

```txt
the-unmapped-house-webgl-context-stage-recovery-authority-domain
webgl-context-generation-kit
webgl-context-event-admission-kit
render-submission-lease-kit
presentation-readiness-kit
stage-interaction-admission-kit
webgl-independent-fallback-kit
stage-resource-manifest-kit
renderer-recovery-candidate-kit
render-target-recovery-candidate-kit
shader-material-recovery-candidate-kit
scene-geometry-recovery-candidate-kit
hotspot-volume-recovery-candidate-kit
camera-light-recovery-candidate-kit
viewport-recovery-candidate-kit
stage-recovery-probe-kit
stage-recovery-adoption-kit
stage-recovery-rollback-kit
webgl-stage-recovery-result-kit
recovery-diagnostics-kit
first-recovered-stage-frame-ack-kit
webgl-context-recovery-fixture-matrix-kit
```

## Required results

```txt
LossAccepted
LossDuplicate
LossStale
FallbackVisible
RecoveryPrepared
RecoveryProbePassed
RecoveryAdopted
RecoveryRejected
RecoveryFailed
RollbackPreserved
InteractionSuspended
InteractionResumed
FirstRecoveredFrameAcknowledged
Cancelled
```

## Repo-local output

Added:

```txt
.agent/trackers/2026-07-14T01-00-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T01-00-28-04-00.md
.agent/architecture-audit/2026-07-14T01-00-28-04-00-webgl-context-stage-recovery-dsk-map.md
.agent/render-audit/2026-07-14T01-00-28-04-00-context-loss-visible-stage-recovery-gap.md
.agent/gameplay-audit/2026-07-14T01-00-28-04-00-presentation-loss-interaction-liveness-loop.md
.agent/interaction-audit/2026-07-14T01-00-28-04-00-context-event-recovery-result-map.md
.agent/webgl-lifecycle-audit/2026-07-14T01-00-28-04-00-context-generation-resource-recovery-contract.md
.agent/deploy-audit/2026-07-14T01-00-28-04-00-webgl-context-recovery-fixture-gate.md
.agent/central-sync-audit/2026-07-14T01-00-28-04-00-repo-ledger-webgl-recovery-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
story data changed: no
WebGL behavior changed: no
package scripts or dependencies changed: no
workflow or deployment changed: no
branch created: no
pull request created: no

npm run check: not run
browser WebGL context-loss fixture: unavailable
fallback and interaction-admission fixture: unavailable
resource reconstruction fixture: unavailable
first recovered-frame fixture: unavailable
built-output and Pages recovery smokes: not run
```

No claim is made that context-loss handling, fallback presentation, interaction suspension, resource reconstruction, atomic adoption, recovered-frame proof or production readiness is implemented.