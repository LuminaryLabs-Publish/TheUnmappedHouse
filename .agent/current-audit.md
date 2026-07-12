# Current audit: The Unmapped House

Timestamp: `2026-07-12T01-41-56-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, a fixed 16:9 shell, side-panel inspection buttons and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** give one runtime session exclusive ownership of callbacks, timers, frame submission, renderer resources and scene-resource generations.

- [x] Trace boot, StageKit construction, scene loading, scene replacement, input, resize, timeout and RAF paths.
- [x] Confirm the animation request id and event callbacks are not retained for revocation.
- [x] Confirm scene replacement detaches objects without disposing geometries, materials or hotspot resources.
- [x] Inventory all active domains, all 24 implemented kits and their services.
- [x] Define session identity, lifecycle state, resource ownership, ordered disposal, rollback, observation and proof boundaries.
- [ ] Implement upstream story authorities and the runtime lifecycle authority.
- [ ] Execute restart, stale-callback and resource-retirement fixtures.

## Interaction loop

```txt
module evaluation
  -> load state and choose current scene
  -> allocate StageKit
  -> allocate renderer, target, post quad, camera, lights and root groups
  -> install resize, pointer and click listeners
  -> start recursive RAF
  -> load current scene
  -> install Continue and keyboard listeners

inspection
  -> optional unretained 450 ms completion timeout
  -> callback can project an interlude

Continue
  -> stage.loadScene(successor)
  -> clear predecessor group
  -> drop predecessor hotspot and material arrays
  -> allocate successor meshes, materials and hotspot volumes
  -> RAF continues through the replacement

page lifetime
  -> no stop, reset, pagehide or dispose transaction
  -> callbacks and GPU resources remain owned by ambient page lifetime
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell and DOM mounts. |
| `src/story-data.js` | Authored story, stage, camera, material and post descriptors. |
| `src/game.js` | Module-lifetime state, StageKit allocation, DOM listeners, completion timeout, scene changes and persistence. |
| `src/stage-kit.js` | Three.js renderer graph, scene resources, pointer/resize listeners, scene replacement and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and CSS frame fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story and render descriptors
raw localStorage and mutable story state
scene routing, inspection, clues, log and completion
ambient DOM narrative and interlude projection
module-lifetime runtime ownership
unretained timeout callbacks
Three.js CDN runtime
WebGL renderer, target, scene, camera, lights and post composition
live scene replacement
procedural geometry and shader-material allocation
hotspot volume allocation and descriptor-bearing userData
pointer, click, keyboard, Continue and resize callbacks
recursive RAF and wall-clock shader time
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical StoryManifest and StorySnapshot
typed pointer, inspection, transition and narrative authority
runtime session identity and lifecycle state
callback generation fencing
RAF, listener and timeout leases
scene-resource generations and retirement receipts
renderer, target, geometry and material ownership
ordered idempotent stop, restart and disposal
startup rollback and partial-construction cleanup
detached lifecycle observation and bounded journal
render surface and WebGL context recovery
committed-frame diagnostics
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
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: page lifetime is the only owner

### RAF cannot be retired

`animate()` schedules the next callback before rendering and does not retain the returned request id. There is no running flag, generation check or `cancelAnimationFrame()` path.

### Listeners cannot be revoked

Resize, pointer, click, Continue and keyboard callbacks are installed directly. Several use anonymous closures, and no listener lease records the exact target, type and function needed for removal.

### Scene replacement leaks resource ownership

`loadScene()` calls `stageGroup.clear()`, then replaces `hotspots` and `materials` with empty arrays. Clearing a Three.js group detaches children but does not dispose their geometries or materials. Dropping the arrays also loses the references needed for deterministic cleanup.

### Root renderer resources have no disposer

The renderer, canvas, multisampled target, post material, post-plane geometry, scene resources and context remain live until the browser destroys the page.

### Timeout work has no session fence

The completion timeout is not retained and carries no session, scene or generation admission. A future reset, in-place restart or lifecycle feature would be vulnerable to stale completion work.

## Required parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-authority-domain
```

Candidate kits:

```txt
runtime-session-id-kit
runtime-session-generation-kit
runtime-lifecycle-state-kit
runtime-start-command-kit
runtime-stop-command-kit
callback-generation-fence-kit
animation-frame-lease-kit
event-listener-lease-kit
timeout-lease-kit
scene-resource-generation-kit
stage-resource-registry-kit
scene-resource-retirement-kit
three-resource-disposer-kit
renderer-resource-owner-kit
render-target-resource-owner-kit
hotspot-resource-owner-kit
runtime-dispose-plan-kit
runtime-dispose-result-kit
startup-rollback-kit
runtime-observation-kit
runtime-lifecycle-journal-kit
runtime-lifecycle-fixture-kit
scene-transition-resource-leak-fixture-kit
stale-callback-fixture-kit
restart-idempotence-fixture-kit
```

## Required lifecycle flow

```txt
RuntimeStartCommand
  -> allocate session id and generation
  -> create detached cleanup stack
  -> allocate StageKit resources
  -> register listener and timeout leases
  -> start one retained RAF lease
  -> commit READY session

SceneLoadCommand
  -> build candidate scene resource generation
  -> commit successor generation
  -> acknowledge first successor frame
  -> retire predecessor generation exactly once

RuntimeStopCommand
  -> move to STOPPING
  -> fence new commands and callbacks
  -> cancel RAF
  -> cancel timeouts
  -> remove listeners
  -> retire active scene generation
  -> dispose post, target, renderer and canvas resources
  -> publish idempotent DISPOSED result
```

## Ordered implementation queue

```txt
1. StoryManifest Authority
2. StorySnapshot startup admission and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Runtime Session Lifecycle Authority
+ Callback Lease and Generation Fencing
+ Scene Resource Retirement and Restart Idempotence Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves that a scene transition disposes predecessor resources, that stop prevents later frames, or that restart creates exactly one callback and resource graph.
