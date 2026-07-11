# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T17-10-50-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

This pass documents a render-surface authority gap. The fixed aspect-frame service decides CSS composition, while `StageKit.resize()` also derives renderer and post-target pixel dimensions directly from the current viewport and device pixel ratio. Display layout, internal resolution, GPU allocation, resize admission, quality fallback, and visible-frame proof are therefore one unversioned side effect.

## Plan ledger

**Goal:** preserve the authored 16:9 composition while making renderer and post-target resolution bounded, revisioned, recoverable, observable, and proven by the first frame that consumes each committed surface revision.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse` under the oldest eligible fallback rule.
- [x] Trace aspect-frame calculation, device-pixel-ratio admission, renderer sizing, render-target sizing, resize callbacks, post composition, and RAF submission.
- [x] Identify the interaction loop, active domains, implemented kits, and offered services.
- [x] Define render-resolution policy, pixel budget, resize generation, detached preparation, atomic commit, rollback, fallback, diagnostics, and fixture boundaries.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files.
- [x] Change no runtime source.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement and execute the documented render-surface authority and fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse   2026-07-11T15-30-50-04-00 selected
AetherVale         2026-07-11T15-38-27-04-00
IntoTheMeadow      2026-07-11T15-49-49-04-00
PrehistoricRush    2026-07-11T15-59-12-04-00
MyCozyIsland       2026-07-11T16-10-58-04-00
TheOpenAbove       2026-07-11T16-30-25-04-00
HorrorCorridor     2026-07-11T16-38-10-04-00
PhantomCommand     2026-07-11T16-49-51-04-00
ZombieOrchard      2026-07-11T17-01-11-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` was changed in the Publish organization.

## Interaction loop

```txt
module boot
  -> create Story state
  -> construct StageKit
  -> choose pixelRatio = min(devicePixelRatio, 2)
  -> allocate renderer at 1920 x 1080 CSS size
  -> allocate multisampled post target at 1920*DPR x 1080*DPR
  -> call resize immediately
       -> compute a 16:9 frame from innerWidth/innerHeight
       -> mutate CSS frame geometry
       -> resize renderer drawing buffer
       -> resize post target
  -> register an anonymous window resize callback
  -> start recursive RAF

window resize / zoom / monitor transfer
  -> invoke resize synchronously for every event
  -> read a new DPR
  -> mutate renderer and post-target allocation in place
  -> publish no plan, result, revision, fallback, rollback, or frame acknowledgement

frame
  -> render stage into current target
  -> sample target texture in post pass
  -> render post scene to the canvas
```

## Main finding

The project has composition authority but no render-resolution authority.

```txt
CSS frame size
  + devicePixelRatio
  + renderer drawing-buffer size
  + multisampled post-target size
  + allocation timing
  + fallback policy
  + frame provenance

are coupled inside StageKit.resize().
```

Concrete consequences:

- The constructor allocates design-sized renderer and target resources, then immediately resizes them again to the live viewport.
- A `3840 x 2160` viewport at DPR `2` requests a `7680 x 4320` post target, or more than 33 million pixels, before multisample and depth overhead.
- Continuous resize events can repeatedly reallocate renderer and post-target storage without coalescing or a frame-boundary commit.
- There is no maximum pixel budget, quality tier, device capability admission, allocation-failure classification, or lower-resolution fallback.
- There is no surface revision proving that the renderer drawing buffer, post target, CSS frame, camera projection, and visible frame agree.
- Diagnostics expose story state but not CSS dimensions, drawing-buffer dimensions, target dimensions, DPR, pixel count, quality tier, or allocation result.

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, stage, material, post and copy descriptors
raw browser persistence and mutable story state
inspection, clue, completion, interlude and Continue routing
DOM, hover, interlude and debug projection
Three.js CDN runtime
renderer, scene, camera, lights and canvas
CSS frame geometry and design-space composition
device-pixel-ratio sampling
renderer drawing-buffer allocation
multisampled render-target allocation
post-target texture composition
resize event admission
live scene replacement
procedural anime material construction
hotspot volume creation and raycast picking
pointer camera parallax
recursive RAF and frame submission
runtime listener, timeout, frame and WebGL resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
render-resolution policy and immutable baseline
pixel and memory budget admission
render-surface revision and resize generation
coalesced resize command admission
renderer and post-target capability declaration
detached surface preparation
atomic surface commit and rollback
allocation-failure classification and quality fallback
stale resize-result rejection
surface resource retirement
visible-frame surface acknowledgement
render-surface observation and bounded journal
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 1920×1080 design-aspect frame. |
| `story-data-kit` | Scene, hotspot, clue, camera, stage, material, post, and copy descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy. |
| `localstorage-save-kit` | Read, shallow-merge, write, and clear browser state. |
| `stage-render-kit` | Create renderer, scene, camera, lights, target, canvas, listeners, and RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover and click input. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Render the stage target and post-process pass. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Required parent domain

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

Candidate composition:

```txt
display-frame-observation-kit
device-pixel-ratio-admission-kit
render-resolution-policy-kit
render-pixel-budget-kit
render-surface-revision-kit
resize-command-kit
resize-coalescing-kit
resize-generation-kit
render-surface-plan-kit
renderer-buffer-preparation-kit
post-target-preparation-kit
render-surface-commit-kit
render-surface-rollback-kit
allocation-failure-classification-kit
render-quality-fallback-kit
stale-resize-result-rejection-kit
render-surface-resource-retirement-kit
visible-frame-surface-ack-kit
render-surface-observation-kit
render-surface-journal-kit
render-resolution-fixture-kit
browser-resize-dpr-smoke-kit
```

## Required transaction

```txt
observe display frame and DPR
  -> admit one resize generation
  -> coalesce superseded observations
  -> derive CSS frame independently from internal resolution
  -> apply pixel and capability budget
  -> prepare renderer and post-target candidate dimensions
  -> classify preparation failure
  -> retry through explicit lower tiers when allowed
  -> atomically commit CSS, camera, renderer and target revision
  -> retire superseded allocations
  -> render one frame
  -> publish a visible-frame surface acknowledgement
  -> reject stale results from older generations
```

## Ordered implementation queue

```txt
1. StoryManifest and StorySnapshot startup authority
2. Inspection command and completion-proof authority
3. Atomic Continue transition authority
4. Runtime session lifecycle and resource retirement
5. Render Surface Resolution Authority
6. Committed-frame diagnostics
```

## Validation boundary

This pass changed documentation only. `npm run check` was not run. No browser resize, DPR, allocation-failure, fallback, rollback, surface-revision, or visible-frame fixture currently exists.