# Current audit: The Unmapped House

**Timestamp:** `2026-07-13T01-49-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `hotspot-input-picking-authority-audited`

## Summary

This documentation-only audit isolates the boundary between browser pointer events, canvas coordinate normalization, the visible camera pose, hotspot raycast selection and story inspection mutation.

The canvas click listener discards its event coordinates. `clickHotspot()` raycasts using `this.pointer`, which is updated only by `mousemove`. The first click can therefore use the default center sample, and touch/stylus compatibility clicks can reuse default or stale coordinates. Camera parallax consumes pointer state on RAF, so pick evidence is not tied to the visible camera frame. Canvas and side-panel controls then call the story mutation directly without one typed inspection command or result.

## Plan ledger

**Goal:** make every inspection one exact, source-identified and frame-correlated command whose target and visible result are provable.

- [x] Compare the full Publish inventory with central tracking.
- [x] Verify all nine eligible repositories remain centrally tracked and root-documented.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by oldest current central timestamp.
- [x] Inspect browser input, camera, raycast, hover, exact-control and story mutation paths.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define commands, revisions, results, rejection states and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Complete interaction loop

```txt
boot
  -> create default or loaded story state
  -> construct StageKit
  -> initialize pointer and mouse vectors at 0,0
  -> install mousemove and click listeners on canvas
  -> install exact side-panel inspection buttons
  -> load scene descriptors and hotspot volumes
  -> start recursive RAF

mousemove
  -> measure canvas rect
  -> normalize event coordinates
  -> mutate cached pointer and parallax state
  -> raycast for hover using current camera
  -> project hover label

RAF
  -> consume cached parallax state
  -> mutate camera pose
  -> animate materials
  -> render stage and post pass

canvas click
  -> ignore click coordinates
  -> raycast with cached pointer and current camera
  -> dispatch selected hotspot directly

side-panel button
  -> bypass pointer and raycast evidence
  -> dispatch exact hotspot directly

inspection
  -> mutate inspected facts, clues and log
  -> optionally schedule interlude
  -> render UI
  -> write story snapshot
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scene descriptors, nine hotspots, completion requirements, interlude copy and render settings. |
| `src/game.js` | Story aggregate, localStorage, inspection, Continue, timer, UI, reset and boot. |
| `src/stage-kit.js` | Three.js stage, pointer cache, mouse hover, click picking, camera parallax, render target and RAF. |
| `src/styles.css` | Fixed shell, controls, Notebook, hover label and interlude presentation. |
| `src/aspect-frame.js` | Fixed 16:9 viewport calculation and application. |
| `index.html` | Stage, story, Notebook, hover and interlude surfaces. |
| `package.json` | Syntax-only validation and local serving. |
| `.github/workflows/deploy.yml` | Static Pages deployment from `main`. |

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
browser persistence and destructive reset
scene routing, inspection, clues, logs and completion
completion timeout and interlude projection
terminal copy projection
DOM mouse, click, keyboard and focus interaction
Three.js CDN runtime and WebGL presentation
scene graph and resource allocation
procedural geometry and shader materials
hotspot volumes and raycast picking
camera parallax and hover projection
render target and post-processing
resize, pointer, click, timeout and recursive RAF callbacks
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing hotspot input/picking authority:

```txt
input session and command identity
pointer source, pointer ID and sample identity
activation-event coordinate capture
mouse/touch/stylus pointer unification
scene and hotspot-set revision
viewport and canvas-rect revision
camera pose and rendered-frame revision
immutable raycast candidate result
deterministic hit and tie policy
stale sample, scene, viewport and camera rejection
outside-canvas and accepted-miss results
canvas/button source equivalence
duplicate inspection rejection
hover enter/move/leave lifecycle
first visible inspection-result frame acknowledgement
browser and Pages pointer/picking fixtures
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 × 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve scene, inspect, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule the delayed completion interlude. |
| `terminal-route-kit` | Project prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, shallow-merge, replace and delete one browser save value. |
| `stage-render-kit` | Create renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert descriptors into camera, geometry, materials, hotspots and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize cached mouse coordinates, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Render stage to an offscreen target and post pass to canvas. |
| `debug-json-projection-kit` | Serialize story fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over JavaScript sources. |
| `static-pages-deploy-kit` | Publish repository root to GitHub Pages after pushes to `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

## Concrete source findings

### Activation coordinates are not event-bound

The canvas registers `click` with a callback that takes no event argument. `clickHotspot()` calls `pick()`, and `pick()` reads `this.pointer`. Only `handlePointer(event)` updates that vector.

### First click can use the center sample

`this.pointer` is created as a new `THREE.Vector2()`, so it begins at `0,0`. A click before any mouse movement raycasts through clip-space center regardless of where the click occurred.

### Touch and stylus can use stale samples

The runtime has no `pointermove`, `pointerdown` or `pointerup` path. A compatibility click may arrive without a preceding `mousemove`, leaving the activation tied to default or previous mouse coordinates.

### Camera and pick frames can diverge

Pointer movement updates `this.mouse` immediately, but the camera consumes it during RAF. A click before the successor RAF can combine current pointer coordinates with the previous camera pose. No revision identifies the frame used for selection.

### Hover can remain after exit

No leave/cancel handler clears `this.hovered` or hides the label. Hover state retires only when another movement produces no hit.

### Story mutation has no inspection result envelope

Canvas and side-panel paths call `inspectHotspot()` directly. There is no source identity, command ID, exact target admission, stale-revision rejection, duplicate result or visible-frame acknowledgement.

## Required parent domain

```txt
the-unmapped-house-hotspot-input-picking-authority-domain
```

Candidate kits:

```txt
hotspot-input-session-id-kit
pointer-source-id-kit
pointer-sample-id-kit
pointer-event-normalization-kit
canvas-rect-revision-kit
viewport-revision-kit
camera-pose-revision-kit
rendered-frame-revision-kit
hotspot-set-revision-kit
hotspot-pick-command-kit
hotspot-pick-admission-kit
raycast-candidate-result-kit
hotspot-hit-selection-kit
hotspot-hit-tie-policy-kit
stale-pointer-sample-rejection-kit
stale-camera-frame-rejection-kit
outside-canvas-rejection-kit
hotspot-inspection-command-kit
hotspot-inspection-result-kit
inspection-source-equivalence-kit
duplicate-inspection-rejection-kit
hover-state-command-kit
hover-state-result-kit
pointer-leave-retirement-kit
first-visible-inspection-frame-ack-kit
pointer-observation-kit
pointer-journal-kit
mouse-first-click-fixture-kit
touch-tap-fixture-kit
stylus-tap-fixture-kit
parallax-click-correlation-fixture-kit
pointer-leave-fixture-kit
canvas-button-equivalence-fixture-kit
browser-hotspot-input-smoke-kit
pages-hotspot-input-smoke-kit
```

## Required transaction

```txt
HotspotInspectionCommand
  -> capture the submitting event or exact-control identity
  -> bind runtime, scene, hotspot-set, viewport and camera-frame revisions
  -> normalize event coordinates once
  -> produce immutable raycast candidates
  -> apply deterministic hit selection
  -> reject outside, stale, duplicate or unavailable commands
  -> commit one exact hotspot inspection result
  -> project story, hover and Notebook feedback
  -> acknowledge the first matching visible frame
```

## Retained independent gaps

```txt
browser save commit/reset convergence
story manifest and snapshot admission
scene-progression and interlude authority
stage resource disposal and runtime stop
render-surface budgeting and WebGL context recovery
committed-frame diagnostics
```

## Proof boundary

Source inspection proves the current pointer/camera ordering and missing authority only. It does not prove runtime target correctness, touch behavior, exact source equivalence, stale-command rejection or visible-frame parity.