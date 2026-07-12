# Current audit: The Unmapped House

Timestamp: `2026-07-12T03-21-27-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, a fixed 16:9 shell, side-panel inspection buttons and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** turn each canvas presentation into a typed committed-frame result correlated with the story and runtime state that produced it.

- [x] Trace inspection, scene completion, Continue, UI projection, persistence, scene loading and RAF submission.
- [x] Confirm DOM/debug projection commits synchronously while canvas presentation occurs later.
- [x] Confirm `animate()` returns no frame id, pass result, input snapshot or visible acknowledgement.
- [x] Inventory all active domains, all 24 implemented kits and their services.
- [x] Define frame identity, immutable inputs, pass results, diagnostics, public readback and proof boundaries.
- [ ] Implement upstream authorities and committed-frame diagnostics.
- [ ] Execute frame parity, transition and screenshot-correlation fixtures.

## Interaction loop

```txt
module boot
  -> load mutable story state
  -> allocate StageKit and renderer graph
  -> load the selected scene
  -> project story DOM and debug JSON
  -> start recursive RAF

inspection
  -> mutate inspected/clue/log state
  -> possibly schedule completion timeout
  -> project DOM and debug JSON immediately
  -> save immediately
  -> next RAF later renders from live stage state

Continue
  -> mutate current scene and route
  -> synchronously replace stage resources
  -> project successor DOM and debug JSON
  -> save immediately
  -> next RAF later presents the successor scene

RAF
  -> sample wall-clock time
  -> read live camera, material and scene objects
  -> render stage target
  -> render post scene to canvas
  -> publish no receipt
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, story panel, notebook/debug panel and interlude. |
| `src/story-data.js` | Authored story, stage, camera, material and post descriptors. |
| `src/game.js` | Mutable story state, inspection, completion, Continue, DOM/debug projection and persistence. |
| `src/stage-kit.js` | Three.js resource graph, scene loading, picking, resize and unobserved frame submission. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and CSS frame fitting. |
| `package.json` | Syntax-only source checks and static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story and render descriptors
raw localStorage and mutable story state
scene routing, inspection, clues, log and completion
synchronous DOM narrative projection
synchronous notebook/debug JSON projection
unretained completion timeout
module-lifetime runtime ownership
Three.js CDN runtime
WebGL renderer, target, scene, camera, lights and post composition
live scene replacement
procedural geometry and shader-material allocation
hotspot volumes, raycast picking and camera parallax
resize and input callbacks
recursive wall-clock frame submission
uncorrelated stage and post passes
syntax validation, Pages deployment and audit tracking
```

Missing authority domains:

```txt
versioned StoryManifest and StorySnapshot
typed inspection, transition and narrative results
runtime session and resource generations
render surface and WebGL context generations
frame sequence and immutable frame input
typed stage-pass and post-pass results
visible canvas acknowledgement
stale/failed frame rejection
detached frame readback and bounded journal
screenshot and debug-frame correlation
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, opening, hotspot, clue, stage, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspection, completion, Continue, reset-by-reload, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Allocate procedural shader materials and advance time uniforms. |
| `post-process-kit` | Allocate and render grain, vignette, chromatic, distortion, memory and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply mouse-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate mutable story state into the notebook panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: public story state is ahead of unobserved rendering

### Debug projection is not a frame observation

`renderUi()` serializes game, scene, clues, route, inspected state, completion and log rows. It includes no frame id, renderer result, surface dimensions, context state, camera revision or resource generation.

### Scene and inspection changes have no first-frame boundary

Inspection updates the notebook and persistence immediately. Continue synchronously replaces scene resources and then updates the DOM. Neither path waits for or records the first canvas frame that reflects the accepted change.

### Render passes return no result

`animate()` renders the stage into a target and the post scene into the default framebuffer. It does not catch or classify failures, increment a frame sequence, freeze inputs, expose pass timings or acknowledge final canvas presentation.

### Live mutable inputs can mix revisions

The callback reads current camera, materials, scene objects and wall-clock time independently. Without a frozen frame input, diagnostics cannot prove that one frame used one coherent story, resource, surface and context revision.

## Required parent domain

```txt
the-unmapped-house-committed-frame-diagnostics-authority-domain
```

Candidate kits:

```txt
frame-sequence-kit
story-revision-kit
narrative-revision-kit
frame-input-snapshot-kit
render-command-kit
render-admission-kit
stage-pass-result-kit
post-pass-result-kit
frame-commit-result-kit
visible-frame-acknowledgement-kit
canvas-present-observation-kit
frame-correlation-kit
frame-debug-projection-kit
public-frame-readback-kit
stale-frame-rejection-kit
frame-journal-kit
first-frame-fixture-kit
scene-transition-frame-fixture-kit
inspection-frame-parity-fixture-kit
browser-screenshot-correlation-smoke-kit
```

## Required frame flow

```txt
RenderFrameCommand
  -> admit runtime, lifecycle, scene, surface and context generations
  -> freeze one immutable FrameInputSnapshot
  -> execute stage pass and return StagePassResult
  -> execute post pass and return PostPassResult
  -> acknowledge final canvas presentation
  -> commit one FrameCommitResult
  -> publish detached debug/public observations
  -> correlate DOM, notebook, screenshots and interaction evidence
```

## Ordered implementation queue

```txt
1. StoryManifest Authority
2. StorySnapshot startup authority
3. Pointer and hotspot-pick authority
4. Inspection and completion authority
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Current audit ledge

```txt
TheUnmappedHouse Committed Frame Diagnostics Authority
+ Immutable Frame Input and Two-Pass Result Contract
+ Story/Notebook/Canvas Correlation Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves that the notebook/debug state, accepted inspection, scene transition and visible canvas cite the same committed frame.
