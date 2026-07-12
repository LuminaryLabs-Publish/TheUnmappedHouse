# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T19-11-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `stage-resource-lifecycle-authority-audited`

## Summary

This documentation-only audit isolates the boundary between scene replacement, GPU resource ownership, browser callback lifetime and visible presentation.

`StageKit.loadScene()` clears the prior scene graph and immediately drops tracking arrays, but it never disposes geometries or materials. `StageKit` also starts a recursive RAF and anonymous resize, mousemove and click listeners without a stop path. No typed lifecycle result proves which resource set is active, retired or visible.

## Plan ledger

**Goal:** ensure scene loading and stage shutdown either commit one complete resource generation or leave the predecessor intact, with exact-once retirement and visible-frame evidence.

- [x] Compare the full Publish inventory with central tracking.
- [x] Verify all nine eligible repositories remain centrally tracked and root-documented.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by oldest current timestamp.
- [x] Inspect `index.html`, `package.json`, `src/game.js`, `src/story-data.js`, `src/stage-kit.js` and current audit state.
- [x] Trace boot, scene allocation, Continue, replacement, render, hover, reset and page lifetime.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define DSK boundaries, commands, results, observations and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Complete interaction loop

```txt
boot
  -> parse browser state and resolve current scene
  -> create StageKit
  -> allocate WebGLRenderer and append canvas
  -> allocate scene, stageGroup, camera, lights and raycaster
  -> allocate multisampled render target
  -> allocate post shader and fullscreen plane
  -> attach resize, mousemove and click callbacks
  -> start recursive RAF
  -> allocate current scene layers, props, materials and hotspot volumes

canvas or side-panel inspection
  -> select current hotspot descriptor
  -> mutate story state and UI
  -> stage resources remain active

Continue
  -> choose successor scene
  -> stageGroup.clear()
  -> set hotspots = []
  -> set materials = []
  -> allocate successor camera state, layers, props, materials and hotspots
  -> render without a load result or predecessor disposal receipt

terminal and page lifetime
  -> prototype-complete copy does not stop StageKit
  -> RAF continues
  -> listeners remain attached
  -> renderer, target and post resources have no explicit shutdown
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scene descriptors, 9 hotspots, 6 layers, 13 props, camera/material/post settings and progression copy. |
| `src/game.js` | Browser state, inspection, Continue, interlude, UI, persistence and StageKit calls. |
| `src/stage-kit.js` | Renderer, scene resources, materials, hotspot volumes, render target, listeners, RAF and scene replacement. |
| `src/aspect-frame.js` | Fixed 16:9 viewport calculation and application. |
| `index.html` | Stage, story, Notebook, hover and interlude surfaces. |
| `package.json` | Syntax-only validation and local serving. |
| `.github/workflows/deploy.yml` | Static Pages deployment from `main`. |

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
browser persistence and reset
scene routing, inspection, clues, logs and completion
completion timeout, interlude and terminal projection
canvas and side-panel interaction
Three.js CDN runtime
WebGL renderer and two-pass presentation
scene graph and scene-resource allocation
procedural geometry and shader materials
invisible hotspot volumes and raycast picking
camera parallax and hover projection
render-target allocation
resize, pointer, click, timeout and recursive RAF callbacks
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing lifecycle authority:

```txt
stage session and generation identity
scene resource-set identity and revision
detached scene-resource preparation
atomic resource-set commit and rollback
geometry, material and hotspot leases
resource ownership transfer
exact-once disposal results
hover and pointer-derived-state reset
RAF handle and stop admission
listener leases and removal
render-target and renderer shutdown
stale scene-load rejection
first visible scene-frame acknowledgement
lifecycle observations and bounded journal
browser and Pages lifecycle fixtures
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, Notebook, hover label and interlude surfaces. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 x 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve scene, inspect, complete, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule delayed completion interludes. |
| `terminal-route-kit` | Project prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, merge, write and delete one browser save key. |
| `stage-render-kit` | Create renderer, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into camera, geometry, materials, hotspot volumes and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize pointer input, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Render stage to an offscreen target and post pass to canvas. |
| `debug-json-projection-kit` | Serialize aggregate fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

## Quantified resource replacement

```txt
scene 1: 2 layers + 5 props + 3 hotspots = 10 meshes
scene 2: 2 layers + 4 props + 3 hotspots = 9 meshes
scene 3: 2 layers + 4 props + 3 hotspots = 9 meshes

normal progression retires before final scene:
  19 meshes
  19 geometries
  19 materials
```

Every layer and prop allocates one geometry and one shader material. Every hotspot allocates one box geometry and one transparent material. `stageGroup.clear()` detaches them but does not call `dispose()`. Resetting `materials` loses the shader-material handles, while hotspot materials were never recorded there.

## Additional lifecycle findings

- `hovered` and the visible hover label are not reset during `loadScene()`.
- Candidate resources are allocated directly into the live group, so partial allocation failure has no rollback.
- `requestAnimationFrame(() => this.animate())` retains no cancellable frame ID.
- Event listeners are anonymous closures and cannot be removed by identity.
- The render target, post material, fullscreen plane geometry and renderer have no stage shutdown path.
- No scene generation reaches UI, renderer diagnostics or the first visible frame.

## Required parent domain

```txt
the-unmapped-house-stage-resource-lifecycle-authority-domain
```

Candidate kits:

```txt
stage-session-id-kit
stage-session-generation-kit
scene-resource-set-id-kit
scene-resource-revision-kit
scene-load-command-kit
scene-resource-plan-kit
geometry-resource-lease-kit
material-resource-lease-kit
hotspot-resource-lease-kit
render-target-resource-lease-kit
listener-lease-kit
raf-loop-lease-kit
scene-resource-prepare-kit
scene-resource-commit-kit
scene-resource-rollback-kit
scene-resource-retirement-kit
scene-resource-disposal-result-kit
hover-state-reset-kit
stale-scene-load-rejection-kit
stage-stop-command-kit
stage-stop-result-kit
first-visible-scene-frame-ack-kit
stage-lifecycle-observation-kit
stage-lifecycle-journal-kit
scene-transition-resource-fixture-kit
browser-stage-stop-smoke-kit
pages-stage-lifecycle-smoke-kit
```

## Required transaction

```txt
LoadSceneCommand
  -> admit stage session, expected resource revision and scene ID
  -> build candidate resources outside the live stage group
  -> validate complete geometry, material, hotspot and camera plan
  -> atomically swap candidate and predecessor groups
  -> reset hover and pointer-derived scene state
  -> render and acknowledge the first visible candidate frame
  -> retire predecessor leases exactly once
  -> publish SceneLoadResult and lifecycle observation

on prepare or first-frame failure
  -> restore predecessor
  -> dispose candidate leases
  -> return rejected or rolled-back result

StageStopCommand
  -> stop RAF
  -> remove listeners
  -> retire active scene and post resources
  -> dispose target and renderer
  -> return StageStopResult
```

## Proof boundary

Source inspection proves missing ownership and disposal calls. It does not by itself quantify browser GPU memory growth or prove a user-visible failure. Those claims require renderer-info, disposal-spy and repeated-transition fixtures.