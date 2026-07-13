# Project breakdown: The Unmapped House render-surface viewport authority

**Timestamp:** `2026-07-13T14-58-07-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

The repository remains a three-scene, nine-hotspot fixed-camera horror prototype with browser persistence and a descriptor-driven Three.js stage. The current audit isolates render-surface viewport ownership. The page has two aspect-frame authorities, CSS and imperative JavaScript, while `StageKit.resize()` samples `innerWidth`, `innerHeight`, and DPR and then mutates the DOM frame, WebGL drawing buffer, offscreen target, and camera sequentially without a shared revision or terminal result.

## Plan ledger

**Goal:** synchronize one complete viewport audit from repository selection through host measurement, aspect fitting, DPR and pixel policy, participant adoption, pointer mapping, visible-frame proof and central publication.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with central ledger state.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing or locally ahead.
- [x] Select and modify only `LuminaryLabs-Publish/TheUnmappedHouse` by the oldest central timestamp.
- [x] Inspect `index.html`, `src/styles.css`, `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, package scripts, deployment and existing `.agent` state.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 24 implemented kit surfaces and offered services.
- [x] Define the 26-kit viewport authority family.
- [x] Add the `2026-07-13T14-58-07-04-00` tracker and audit family.
- [x] Refresh all required root `.agent` documents and machine state.
- [x] Change documentation only.
- [ ] Implement and execute the viewport authority and fixture matrix.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
locally-ahead repositories: 0

TheUnmappedHouse   2026-07-13T09-03-20-04-00 selected
AetherVale         2026-07-13T10-05-15-04-00
IntoTheMeadow      2026-07-13T10-59-22-04-00
PhantomCommand     2026-07-13T11-41-10-04-00
HorrorCorridor     2026-07-13T11-58-45-04-00
ZombieOrchard      2026-07-13T13-01-03-04-00
TheOpenAbove       2026-07-13T13-39-10-04-00
PrehistoricRush    2026-07-13T13-58-35-04-00
MyCozyIsland       2026-07-13T14-39-40-04-00
TheCavalryOfRome  excluded
```

Only `TheUnmappedHouse` is in scope for this Publish update.

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, story panel, Notebook, hover label and interlude. |
| `src/styles.css` | Window-fitted 16:9 CSS frame, canvas positioning and responsive story panel. |
| `src/aspect-frame.js` | 1920x1080 constants, window-fit calculation and DOM frame mutation. |
| `src/game.js` | Story state, inspection, progression, UI, persistence and reset. |
| `src/stage-kit.js` | Three.js provider, renderer, camera, target, scene resources, resize, picking, parallax and RAF. |
| `src/story-data.js` | Three scenes, nine hotspots, completion rules and render descriptors. |
| `package.json` | Static serving and syntax checks. |
| `.github/workflows/deploy.yml` | Repository-root Pages deployment from `main`. |

## Complete interaction loop

```txt
boot
  -> index.html creates #app, #aspect-frame, #stage, story UI and interlude
  -> game.js constructs StageKit
  -> StageKit creates WebGL renderer, scene, camera and offscreen target
  -> resize() samples window dimensions and DPR
  -> applyAspectFrame() mutates the DOM frame
  -> renderer and render target sizes mutate independently
  -> loadScene() builds the authored scene
  -> recursive RAF renders stage then post pass

window resize
  -> anonymous window listener calls resize()
  -> computeAspectFrame(innerWidth, innerHeight)
  -> clamp dimensions to at least 1
  -> write left, top, width and height to #aspect-frame
  -> update renderer pixel ratio and drawing buffer
  -> resize offscreen target
  -> update camera projection
  -> publish no ViewportCommitResult

pointer interaction
  -> read canvas.getBoundingClientRect()
  -> normalize pointer against whichever canvas box is currently visible
  -> raycast with current camera
  -> dispatch hotspot or hover label

observation
  -> Notebook reports story state only
  -> no viewport revision, drawing-buffer size, render-target size, measurement source or first matching frame acknowledgement
```

## Domains in use

```txt
browser document, fixed shell and CSS layout
authored story, scene, hotspot and render descriptors
inspection, clue, route and Notebook ledgers
completion, interlude and terminal progression
browser persistence and destructive reset
DOM pointer, click, keyboard, focus and modal interaction
external ES-module provider resolution
host-box measurement and fixed 16:9 fitting
DPR sampling, drawing-buffer sizing and pixel allocation
Three.js WebGL rendering and scene graph resources
camera, fog, shader materials and procedural geometry
offscreen render target and post-processing
hotspot volumes, raycast picking, hover and camera parallax
recursive RAF and callback lifetime
viewport preparation, atomic adoption, rollback and visible proof
syntax validation, local serving and GitHub Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude. |
| `aspect-frame-kit` | fixed 1920x1080 design aspect, window-fit calculation, DOM frame placement. |
| `story-data-kit` | three scene descriptors, nine hotspots, clue grants, completion rules, camera descriptors, material descriptors, post descriptors. |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, continue, reset, UI projection, persistence. |
| `scene-route-kit` | scene ID resolution, authored-order advancement. |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state. |
| `clue-ledger-kit` | clue grant, clue query. |
| `notebook-log-kit` | prepend narrative log, bounded log retention. |
| `interlude-timer-kit` | delayed completion interlude scheduling. |
| `terminal-route-kit` | prototype-complete copy projection. |
| `localstorage-save-kit` | parse, shallow merge, replace, delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks, recursive RAF. |
| `scene-descriptor-consumer-kit` | camera construction, geometry construction, material construction, hotspot construction, post configuration. |
| `anime-material-kit` | procedural shader materials, time uniform updates. |
| `post-process-kit` | grain, vignette, chromatic shift, distortion, scan lines. |
| `hotspot-volume-kit` | invisible raycast volumes, hotspot descriptor attachment. |
| `hotspot-picking-kit` | canvas coordinate normalization, raycast, hotspot dispatch. |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | offscreen stage pass, post pass to canvas, render target resizing. |
| `debug-json-projection-kit` | story-field serialization, visible Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks over local JavaScript. |
| `static-pages-deploy-kit` | repository-root artifact upload, Pages deployment on main. |
| `repo-local-agent-ledger-kit` | root pointers, timestamped audit records. |
| `central-ledger-sync-kit` | central selection mirror, central findings history. |

```txt
implemented source-backed kit surfaces: 24
planned viewport authority kits:       26
```

## Main findings

### CSS and JavaScript both own the frame

`src/styles.css` defines the 16:9 frame using `vw` and `vh`. `applyAspectFrame()` then overwrites the same left, top, width and height fields from `innerWidth` and `innerHeight`. The two policies are mathematically similar but have no shared revision, source identity or convergence result.

### The actual host box is not measured

`StageKit.resize()` fits against global window dimensions rather than measuring `#app` or the render host. Embedding, browser UI changes, transformed ancestors, split panes or future editor hosts have no authoritative measurement path.

### Zero size becomes a one-pixel surface

`computeAspectFrame()` clamps each dimension to at least `1`. A hidden, detached or genuinely zero-sized host is therefore treated as a valid one-pixel viewport instead of being deferred with a typed zero-size result.

### Allocation is capped by DPR only

DPR is capped at `2`, but there is no total-pixel budget, maximum texture-size admission or quality fallback. The renderer drawing buffer and offscreen render target can both allocate large surfaces.

### Participants mutate sequentially

DOM frame styles, renderer pixel ratio, renderer size, render-target size and camera projection update one after another. There is no detached candidate, participant receipt, atomic adoption or rollback if a later participant fails.

### Pointer and visible-frame provenance are absent

Pointer normalization reads the current canvas rectangle while camera and target state may have been changed by a resize. Frames, hotspot picks and Notebook diagnostics carry no viewport revision or first-visible-frame acknowledgement.

## Required authority

```txt
the-unmapped-house-render-surface-viewport-authority-domain
```

Required transaction:

```txt
ViewportChangeCommand
  -> bind SurfaceId, LifecycleGeneration and expected ViewportRevision
  -> measure the actual host CSS box
  -> sample DPR, visibility and GPU limits
  -> apply the fixed 16:9 policy and total-pixel budget
  -> reject invalid, zero, stale, duplicate or superseded candidates
  -> prepare DOM frame, drawing buffer, render target, camera and pointer-transform candidates
  -> collect participant preparation receipts
  -> atomically adopt every participant or preserve every predecessor
  -> publish one terminal ViewportCommitResult
  -> render a FrameViewportEnvelope
  -> publish revisioned readback and FirstViewportFrameAck
```

## Planned DSK family

```txt
render-surface-identity-kit
viewport-revision-kit
viewport-change-command-kit
host-box-measurement-kit
resize-observer-source-kit
surface-visibility-lifecycle-kit
aspect-fit-policy-kit
dpr-policy-kit
pixel-budget-policy-kit
gpu-dimension-admission-kit
zero-size-deferral-kit
viewport-candidate-kit
dom-frame-candidate-kit
renderer-buffer-candidate-kit
render-target-candidate-kit
camera-projection-candidate-kit
pointer-transform-candidate-kit
viewport-participant-prepare-kit
viewport-participant-receipt-kit
viewport-atomic-commit-kit
viewport-rollback-kit
viewport-result-kit
viewport-observation-kit
frame-viewport-envelope-kit
first-viewport-frame-ack-kit
viewport-fixture-matrix-kit
```

## Validation boundary

Runtime JavaScript, HTML, CSS, story data, renderer behavior, persistence, dependencies, package scripts and deployment were not changed. No browser, build or Pages viewport fixture was executed.
