# Current audit: The Unmapped House

Timestamp: `2026-07-11T17-10-50-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** identify the authority and fixture boundary required to separate fixed 16:9 composition from bounded, recoverable internal GPU resolution.

- [x] Trace `computeAspectFrame()` and `applyAspectFrame()`.
- [x] Trace constructor-time renderer and post-target allocation.
- [x] Trace DPR sampling, renderer sizing, target sizing, and resize callbacks.
- [x] Trace stage-target and post-process frame submission.
- [x] Inventory all active domains, implemented kits, and offered services.
- [x] Define resolution policy, pixel budget, resize generation, candidate preparation, atomic commit, rollback, fallback, retirement, observation, and fixture kits.
- [ ] Implement StoryManifest, StorySnapshot, lifecycle, and render-surface authorities.
- [ ] Run resolution-policy, allocation-failure, resize-storm, browser-DPR, and visible-frame fixtures.

## Interaction loop

```txt
boot
  -> load mutable story state
  -> construct StageKit
       -> create renderer
       -> pixelRatio = min(devicePixelRatio, 2)
       -> set renderer to design size 1920 x 1080
       -> create 2-sample target at design size * DPR
       -> create post scene and target-texture binding
       -> call resize
            -> compute contained 16:9 CSS frame
            -> set renderer pixel ratio
            -> set renderer CSS/drawing-buffer size
            -> resize post target
       -> install anonymous resize, pointer and click listeners
       -> start recursive RAF
  -> load scene
  -> render UI and write state

resize / zoom / monitor transfer
  -> synchronous resize callback for each browser event
  -> sample current inner size and DPR
  -> mutate CSS frame, renderer and target in place
  -> return no plan, result, revision, fallback, rollback, or frame receipt

frame
  -> animate materials and camera parallax
  -> render stage into current target
  -> render target texture through post pass
  -> present canvas
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, side-panel, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Scene order, hotspots, clue requirements, stage descriptors, camera, materials, post settings, and interlude copy. |
| `src/game.js` | Raw load, mutable story state, inspection, completion, timeout scheduling, Continue, reset, projection, and persistence. |
| `src/stage-kit.js` | Renderer allocation, DPR admission, drawing-buffer and target sizing, live stage replacement, resources, picking, parallax, listeners, and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and CSS frame fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, stage, material, post and copy descriptors
raw browser storage and mutable story state
scene route, inspection, clue, flags and notebook log
scene completion, interlude timing, Continue and terminal projection
DOM, hover, interlude and debug projection
Three.js CDN runtime
renderer, scene, camera, lights, render target, post scene and canvas
CSS aspect-frame geometry
device-pixel-ratio observation
renderer drawing-buffer allocation
multisampled post-target allocation
post-target texture composition
resize event admission
live stage-group replacement
procedural anime material construction
hotspot volume creation and raycast picking
pointer camera parallax
recursive RAF and frame submission
runtime callback and WebGL resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
render-resolution policy and immutable baseline
pixel and capability budget admission
resize command, coalescing and generation
render-surface plan and revision
renderer and post-target candidate preparation
allocation-failure classification
explicit quality fallback
atomic surface commit and rollback
stale resize-result rejection
surface-resource retirement
visible-frame surface acknowledgement
render-surface observation and bounded journal
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected hotspots. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: composition and GPU resolution are conflated

### Boot reallocates surfaces

`StageKit` first configures the renderer at the 1920×1080 design size and creates a target at design size multiplied by DPR. The constructor then immediately calls `resize()`, which can resize both again to a different viewport-dependent size.

### DPR is an unconditional multiplier

The only policy is `Math.min(devicePixelRatio, 2)`. No pixel count, memory budget, maximum renderbuffer size, sample support, backend capability, performance tier, or scene complexity is considered.

### High-DPI allocation can be extreme

At a `3840×2160` viewport and DPR `2`, the post target requests `7680×4320`, or `33,177,600` pixels, with two samples and a depth buffer. The renderer drawing buffer is scaled similarly.

### Resize events mutate live ownership immediately

Every browser resize event directly changes CSS geometry, pixel ratio, renderer storage, target storage, and camera projection. There is no coalescing, candidate plan, predecessor preservation, frame-boundary commit, or stale result rejection.

### Allocation failure has no recovery contract

No typed result distinguishes capability rejection, memory pressure, context loss, or unknown failure. No lower-resolution fallback is declared. No rollback proves the predecessor surface remains usable.

### Diagnostics report no surface truth

The debug panel reports story state only. It does not expose CSS frame dimensions, observed/admitted DPR, renderer drawing-buffer dimensions, target dimensions, samples, pixel count, quality tier, surface revision, resize generation, fallback receipt, or first visible frame.

## Required parent domain

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

Candidate kits:

```txt
display-frame-observation-kit
device-pixel-ratio-admission-kit
render-resolution-policy-kit
render-pixel-budget-kit
resize-command-kit
resize-coalescing-kit
resize-generation-kit
render-surface-revision-kit
render-surface-plan-kit
renderer-buffer-preparation-kit
post-target-preparation-kit
allocation-failure-classification-kit
render-quality-fallback-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-resize-result-rejection-kit
render-surface-resource-retirement-kit
visible-frame-surface-ack-kit
render-surface-observation-kit
render-surface-journal-kit
render-resolution-fixture-kit
browser-resize-dpr-smoke-kit
```

## Required surface result

```txt
RenderSurfaceResult
  status: duplicate | superseded | rejected | prepared | committed |
          committed_with_fallback | allocation_failed | rolled_back |
          visible_frame_acknowledged
  commandId
  planId
  resizeGeneration
  predecessorSurfaceRevision
  candidateSurfaceRevision
  committedSurfaceRevision?
  observedDpr
  admittedDpr?
  cssFrame?
  rendererBuffer?
  postTarget?
  pixelCount?
  qualityTier?
  failureClassification?
  fallbackReceipt?
  rollbackResult?
  retirementReceipt?
  firstVisibleFrameId?
```

## Required authority flow

```txt
observe display and DPR
  -> admit latest resize generation
  -> coalesce duplicates and supersede stale work
  -> derive CSS frame
  -> apply resolution and capability budget
  -> prepare renderer and post-target candidate
  -> classify failure and step through explicit fallback tiers
  -> atomically commit CSS, camera, renderer and target revision
  -> render and acknowledge one visible frame
  -> retire superseded resources
  -> publish actual applied values and bounded journal row
```

## Ordered implementation queue

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. InspectionCommand, receipts, clue provenance and scene-completion proof
4. Atomic Continue transition and first-visible-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Render Surface Resolution Authority
7. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Render Surface Resolution Authority
+ Pixel Budget, Resize Generation, Fallback, Rollback, and Visible-Frame Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves bounded DPR behavior, pixel-budget admission, resize coalescing, allocation fallback, rollback, stale-generation rejection, actual-dimension readback, picking parity after resize, or visible-frame surface correlation.