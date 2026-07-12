# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T13-08-15-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

This audit isolates render-surface resolution and allocation in `src/stage-kit.js`. The runtime creates an antialiased Three.js renderer, caps device pixel ratio at `2`, allocates a multisampled offscreen target at the fixed `1920 x 1080` design size multiplied by DPR, and then immediately calls `resize()` to allocate both surfaces again from the live aspect frame.

No pixel budget, WebGL limit query, multisample admission, resize generation, allocation result, rollback, resource-retirement receipt or first-visible-frame acknowledgement exists.

## Plan ledger

**Goal:** define one authoritative transaction from viewport observation through bounded renderer and offscreen-target allocation, atomic commit and visible-frame proof.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories are centrally tracked and root-documented.
- [x] Select only `TheUnmappedHouse` as the oldest eligible synchronized repository.
- [x] Inspect `src/stage-kit.js`, `src/aspect-frame.js`, `src/game.js`, package checks and prior render/lifecycle boundaries.
- [x] Trace constructor allocation, resize allocation and the two-pass frame loop.
- [x] Quantify high-DPR and narrow-viewport allocation cases.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define render-surface planning, admission, commit, rollback, observation and fixture contracts.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse   2026-07-12T10-30-00-04-00 selected
AetherVale         2026-07-12T10-48-19-04-00
TheOpenAbove       2026-07-12T11-15-16-04-00
IntoTheMeadow      2026-07-12T11-29-40-04-00
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheCavalryOfRome   excluded
```

## Product and interaction loop

```txt
module boot
  -> load browser story state
  -> resolve current scene
  -> construct StageKit
  -> create WebGL renderer and offscreen target
  -> perform fixed-design allocation
  -> perform immediate live resize allocation
  -> load scene, project UI and save

inspection
  -> canvas or side-panel activation
  -> mutate inspection, clue and log state
  -> derive completion and delayed interlude
  -> render and save

window resize
  -> sample innerWidth, innerHeight and DPR
  -> compute fixed-aspect CSS frame
  -> resize default drawing buffer
  -> resize multisampled offscreen target
  -> continue rendering without surface revision or result

frame
  -> animate camera and material uniforms
  -> render stage to offscreen target
  -> render post-process pass to default framebuffer
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, story panel, hotspot list, debug panel and mounted interlude. |
| `src/styles.css` | Fixed composition, modal appearance and pointer routing. |
| `src/game.js` | Mutable story state, persistence, inspection, completion, Continue, terminal copy and reset. |
| `src/story-data.js` | Three scenes, nine hotspots, clue requirements and visual descriptors. |
| `src/stage-kit.js` | Renderer, DPR, target allocation, scene replacement, pointer input, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed `1920 x 1080` design size and aspect-frame calculation. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage read, write and reset effects
mutable story snapshot ownership
scene routing, inspection, clues, flags, route and notebook log
scene-completion derivation
unretained 450 ms completion timeout
interlude visibility, Continue and terminal projection
global keyboard and pointer input
native focus and button activation
Three.js CDN runtime
WebGL renderer and default drawing buffer
device-pixel-ratio sampling with a fixed cap of 2
fixed-design startup allocation
aspect-frame viewport observation and CSS application
multisampled offscreen WebGLRenderTarget
stage-to-target and post-to-default-framebuffer submission
procedural geometry and anime materials
hotspot volumes and raycast picking
camera parallax
resize, timeout, input and recursive RAF callbacks
syntax validation
static Pages deployment
repo-local audit tracking
central ledger synchronization
```

Missing render-surface authority domains:

```txt
render-surface identity and revision
viewport-observation identity and resize generation
DPR and render-scale policy
product pixel and sample budgets
WebGL texture, renderbuffer and sample capability admission
default drawing-buffer plan
offscreen color/depth/multisample target plan
allocation readback and framebuffer completeness
stale resize rejection
atomic surface commit and rollback
predecessor target retirement
surface observations and bounded journal
first-visible-surface-frame acknowledgement
browser and Pages DPR/resize fixtures
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story, hotspot, debug, hover and interlude surfaces. |
| `aspect-frame-kit` | Fixed 16:9 viewport computation and CSS application. |
| `story-data-kit` | Scene, hotspot, clue, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspect, complete, Continue, reset, project, persist and call StageKit. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the current unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy. |
| `localstorage-save-kit` | Parse, merge, write and delete the single browser save key. |
| `stage-render-kit` | Create renderer, camera, lights, target, canvas, listeners and RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into live Three.js resources. |
| `anime-material-kit` | Allocate shader materials and advance time uniforms. |
| `post-process-kit` | Render grain, vignette, chromatic, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible pick volumes and attach descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected hotspots. |
| `camera-parallax-kit` | Apply pointer-driven camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the notebook panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from main. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main findings

### Fixed-design allocation happens before live viewport admission

The constructor calls:

```txt
renderer.setPixelRatio(cappedDpr)
renderer.setSize(1920, 1080, false)
new WebGLRenderTarget(1920 * cappedDpr, 1080 * cappedDpr, { samples: 2 })
resize()
```

The first live `resize()` can immediately replace those dimensions. A narrow viewport at capped DPR `2` can therefore transiently allocate a `3840 x 2160` default buffer and target before shrinking to the actual aspect frame.

### DPR cap does not provide a product pixel budget

For a `3840 x 2160` aspect frame at DPR `2`:

```txt
physical width:  7680
physical height: 4320
pixels/surface:  33,177,600
offscreen samples requested: 2
```

The offscreen target alone requests `66,355,200` color sample positions before depth, resolve storage, the default framebuffer and implementation overhead. No product budget can lower DPR, render scale or samples.

### WebGL limits are not admitted before allocation

The runtime does not query or validate:

```txt
MAX_TEXTURE_SIZE
MAX_RENDERBUFFER_SIZE
MAX_SAMPLES
renderer capabilities
framebuffer completeness
actual drawing-buffer width and height
actual target width and height
```

Unsupported or excessive plans therefore have no typed rejection or fallback tier.

### Resize has no generation, coalescing or rollback

Every window resize directly mutates the renderer and target. There is no resize command id, expected surface revision, stale-observation rejection, prepare phase, atomic commit, predecessor preservation or allocation failure rollback.

### Visible frames have no surface provenance

The frame loop submits the offscreen and post passes but publishes no surface id, surface revision, CSS dimensions, physical dimensions, DPR, sample count, allocation result or first-visible-frame acknowledgement.

## Required parent domain

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

Candidate kits:

```txt
render-surface-id-kit
render-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
webgl-capability-query-kit
render-surface-plan-kit
drawing-buffer-plan-kit
offscreen-target-plan-kit
multisample-budget-kit
surface-dimension-admission-kit
surface-allocation-kit
allocation-readback-kit
surface-commit-kit
surface-rollback-kit
stale-resize-rejection-kit
surface-resource-retirement-kit
surface-observation-kit
visible-surface-frame-ack-kit
render-surface-fixture-kit
browser-dpr-resize-smoke-kit
pages-render-surface-smoke-kit
```

## Required transaction

```txt
ViewportObservation
  -> allocate observation id and resize generation
  -> sample CSS bounds and requested DPR
  -> query WebGL texture, renderbuffer and sample capabilities
  -> apply product pixel, sample and quality budgets
  -> derive one RenderSurfacePlan
  -> reject stale predecessor revision
  -> prepare renderer drawing buffer and offscreen target
  -> read back actual dimensions and framebuffer status
  -> commit one surface revision or preserve predecessor
  -> retire replaced target resources exactly once
  -> submit stage and post passes against committed surface
  -> acknowledge first visible frame
  -> publish detached observation and bounded journal
```

Rejected or failed surface plans must not leave the renderer and offscreen target on mixed revisions.

## Required statuses

```txt
Planned
Committed
Duplicate
RejectedStaleRevision
RejectedInvalidDimensions
RejectedPixelBudget
RejectedTextureLimit
RejectedRenderbufferLimit
RejectedSampleLimit
AllocationFailed
FramebufferIncomplete
RolledBack
Visible
```

## Completion boundary

Do not claim high-DPR safety, resize safety or render-surface correctness from a fixed DPR cap or visual inspection. Completion requires bounded planning, capability admission, allocation readback, atomic commit/rollback and executable browser proof.