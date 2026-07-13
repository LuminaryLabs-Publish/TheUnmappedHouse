# Project breakdown: The Unmapped House hotspot input and picking authority

**Timestamp:** `2026-07-13T01-49-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Source revision reviewed:** `50f316e482082e6fafb02a8788882240f0b38fe7`

## Summary

This documentation-only pass isolates the boundary between browser pointer input, the visible camera pose, normalized canvas coordinates, raycast selection and the exact hotspot inspection command. Canvas clicks do not use the click event coordinates. They raycast with the last `mousemove` sample, or the default center sample when no mouse movement has occurred. Touch or stylus activation can therefore inspect the wrong hotspot, and a quick click can be resolved against a camera pose that does not match the pointer-driven frame the player sees.

## Plan ledger

**Goal:** make every canvas or side-panel inspection one exact, source-identified and frame-correlated hotspot command whose accepted target matches the user input and visible scene.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible central entry.
- [x] Trace mouse movement, canvas click, touch-compatible click, hover, camera parallax, raycast and side-panel inspection paths.
- [x] Preserve all 24 implemented kits and every offered service.
- [x] Define pointer sample, viewport, camera pose, hit result, command identity and visible-frame contracts.
- [x] Add the timestamped architecture and system audit family.
- [x] Change documentation only.
- [ ] Implement and execute browser pointer/picking fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

TheUnmappedHouse   2026-07-12T23-20-51-04-00 selected
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
IntoTheMeadow      2026-07-13T00-18-48-04-00
PhantomCommand     2026-07-13T00-40-00-04-00
PrehistoricRush    2026-07-13T00-58-50-04-00
HorrorCorridor     2026-07-13T01-08-28-04-00
ZombieOrchard      2026-07-13T01-18-20-04-00
MyCozyIsland       2026-07-13T01-40-00-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
boot
  -> create StageKit
  -> initialize pointer and mouse vectors at 0,0
  -> install canvas mousemove and click listeners
  -> install exact side-panel hotspot buttons
  -> load scene hotspot volumes
  -> start recursive RAF

mousemove
  -> read canvas bounding rect
  -> normalize event coordinates into clip space
  -> update pointer and camera-parallax mouse state
  -> raycast using the current camera object
  -> update hovered hotspot and hover label

RAF
  -> consume latest parallax mouse state
  -> move camera from the authored base pose
  -> render scene and post pass

canvas click
  -> discard click event coordinates
  -> raycast using the cached pointer sample
  -> use the camera pose currently stored on the camera
  -> dispatch the first intersected hotspot

side-panel button click
  -> bypass pointer normalization and raycast
  -> dispatch the descriptor hotspot directly

inspection
  -> mutate inspected facts, clues and log
  -> render UI
  -> save the whole story snapshot
```

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
scene routing, inspection, clues, logs and completion
browser persistence and destructive reset
completion timer, interlude and terminal projection
DOM mouse, click, keyboard and focus interaction
Three.js WebGL presentation
scene graph and resource allocation
procedural geometry and shader materials
hotspot volumes and raycast picking
camera parallax and hover projection
render target and post-processing
browser callback lifetime
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing input/picking authority:

```txt
pointer source and sample identity
click-coordinate capture
pointer-event unification for mouse, touch and stylus
viewport and canvas-rect revision
camera pose and rendered-frame revision
immutable pick command and candidate list
exact hit selection result and tie policy
stale sample and stale camera rejection
hover enter, move and leave lifecycle
source-equivalent canvas/button inspection result
duplicate inspection command rejection
first visible inspection-result frame acknowledgement
browser, mobile-emulation and Pages picking fixtures
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 × 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, cameras, materials and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve scene, inspect, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule delayed completion interludes. |
| `terminal-route-kit` | Project prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, shallow-merge, replace and delete one browser save value. |
| `stage-render-kit` | Create renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert descriptors into camera, geometry, materials, hotspots and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize cached mouse coordinates, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets during RAF. |
| `render-target-composition-kit` | Render the stage to an offscreen target and post pass to canvas. |
| `debug-json-projection-kit` | Serialize story fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over JavaScript sources. |
| `static-pages-deploy-kit` | Publish the repository root to GitHub Pages from `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

## Main findings

### Canvas clicks use stale coordinates

The canvas click listener ignores its event object. `clickHotspot()` calls `pick()`, and `pick()` reads `this.pointer`, which is updated only by `mousemove`. The first click can therefore raycast at clip-space center, and later clicks can use a previous mouse location.

### Touch and stylus are not authoritative input sources

Only `mousemove` updates the pick sample. A touch-generated click may arrive without a preceding mousemove, so canvas taps can repeatedly resolve from the default or stale pointer. The side-panel buttons remain usable, but the two inspection surfaces do not offer the same input contract.

### Pick and visible camera pose are not correlated

`mousemove` updates the parallax target immediately, while the camera consumes that target on the next RAF. A click between those operations can combine a new pointer sample with the previous camera pose. No frame or camera revision states which visible pose the raycast represents.

### Hover does not own exit state

No `pointerleave` or `mouseleave` handler clears `hovered` or hides the hover label. The label may remain visible after leaving the canvas until another move changes the hit result.

### No typed inspection command or result

Canvas raycast and side-panel buttons both call `inspectHotspot()` directly. Neither path carries source identity, sample identity, viewport revision, camera revision, command ID, hit evidence, duplicate status or a first-visible result-frame acknowledgement.

## Required parent domain

```txt
the-unmapped-house-hotspot-input-picking-authority-domain
```

Required transaction:

```txt
HotspotInspectionCommand
  -> capture exact event coordinates and pointer source
  -> bind runtime, scene, viewport, canvas rect and camera-frame revisions
  -> normalize coordinates once
  -> build immutable raycast candidates
  -> apply deterministic hit and tie policy
  -> reject stale, outside, duplicate or unavailable commands
  -> resolve one exact hotspot identity
  -> execute inspection once through the shared story command path
  -> publish HotspotInspectionResult with hit evidence
  -> project hover, story and Notebook feedback
  -> acknowledge the first matching visible frame
```

## Proof boundary

No runtime JavaScript, HTML, CSS, story content, rendering, dependencies, package scripts or deployment workflows were changed. No mouse-first-click, touch, stylus, pointer-leave, rapid-click, camera-parallax correlation or Pages fixture was executed.