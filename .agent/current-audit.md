# Current audit: The Unmapped House

Timestamp: `2026-07-11T10-18-05-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, delayed interludes, browser persistence, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** identify the exact ownership and fixture boundary required to stop, reset, replace, and dispose one browser runtime session without stale callbacks or retained GPU resources.

- [x] Trace module boot and StageKit construction.
- [x] Trace recursive frame scheduling.
- [x] Trace all browser listener registrations.
- [x] Trace completion timeout scheduling.
- [x] Trace scene replacement and resource tracking.
- [x] Trace reset and page teardown assumptions.
- [x] Inventory all domains, kits, and services.
- [x] Define runtime-session lifecycle DSK composition.
- [x] Define deterministic Node and browser fixture rows.
- [ ] Implement lifecycle authority.
- [ ] Run lifecycle and teardown fixtures.

## Interaction loop

```txt
module boot
  -> load mutable persisted state
  -> resolve current scene
  -> construct StageKit
  -> create renderer, render target, post scene, camera, lights, and canvas
  -> add resize, mousemove, and click listeners
  -> start recursive requestAnimationFrame
  -> load current scene resources
  -> inspect via button or raycast
  -> mutate story/DOM/persistence
  -> completion schedules an unretained timeout
  -> Continue mutates story and replaces live scene resources
  -> RAF submits stage and post passes forever
  -> R clears storage and relies on page reload for teardown
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, story panel, hotspot list, hover label, interlude, Continue button, module entry. |
| `src/story-data.js` | Three mutable scene descriptors, nine hotspots, clue requirements, camera, stage, material, post, and copy data. |
| `src/game.js` | Persistence, active story state, inspection, completion, unowned interlude timer, Continue, reset, and DOM projection. |
| `src/stage-kit.js` | Three.js renderer, target, scene resources, picking, listeners, recursive RAF, and destructive live replacement. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and browser fitting. |
| `package.json` | Syntax-only checks and local static serving. |

## Domains in use

```txt
browser shell
fixed-aspect layout
story source descriptors
scene order and identity
hotspot and clue identity
mutable story state
route, inspection, clue, and notebook ledgers
completion, interlude, Continue, and terminal policy
side-panel, canvas, keyboard, and button input
localStorage effects
story, hover, interlude, and debug projection
Three.js CDN runtime
stage render host
scene descriptor consumption
anime shader materials
post-processing pass
hotspot volumes and raycast picking
camera parallax
render-target composition
live scene replacement
recursive frame-loop lifecycle
browser listener lifecycle
interlude timeout lifecycle
scene resource lifecycle
renderer and WebGL context lifecycle
syntax validation
static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
versioned story manifest and admitted StorySnapshot
inspection command and completion proof
atomic story/stage transition
runtime session identity and generation
frame-loop leases
listener leases
timeout leases
stage resource inventory
scene resource retirement
Three.js resource disposal
renderer and context retirement
idempotent stop/dispose results
lifecycle journal and fixtures
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate active scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot flags. |
| `clue-ledger-kit` | Grant global clue strings and evaluate requirements. |
| `notebook-log-kit` | Prepend and cap story rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, render target, post scene, canvas, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert mutable scene descriptors into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes carrying full descriptor objects. |
| `hotspot-picking-kit` | Perform hover/click raycasts and return descriptor payloads. |
| `camera-parallax-kit` | Apply pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project mutable story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: callbacks and resources have no session owner

### Frame loop

`animate()` immediately schedules its successor with an anonymous closure. The returned RAF id is not retained, there is no running/disposed guard, and a stale queued callback can recurse indefinitely.

### Listener lifecycle

The constructor registers anonymous window resize and canvas mousemove/click handlers. Exact handler references are not retained, so they cannot be removed through `removeEventListener`.

### Timeout lifecycle

Scene completion schedules `setTimeout(() => showInterlude(currentScene), 450)`. No timeout id, scene id, story revision, completion proof, or session generation is retained. A future reset or session replacement cannot cancel or reject stale callbacks deterministically.

### Scene resource lifecycle

`loadScene()` begins with:

```txt
sceneData assignment
stageGroup.clear()
hotspots = []
materials = []
```

It then creates fresh layer, prop, and hotspot geometries and materials. `Group.clear()` detaches child objects but does not dispose geometry or material allocations. Resetting `materials` discards the tracked shader-material references before disposal, and hotspot materials are not in that list.

### Renderer lifecycle

The renderer, render target, post-plane geometry, post material, canvas, and optional WebGL context loss have no explicit teardown. The current reset depends on `location.reload()` and browser destruction rather than a testable lifecycle contract.

## Required parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-domain
```

Candidate kits:

```txt
runtime-session-authority-kit
runtime-session-generation-kit
frame-loop-lease-kit
listener-lease-kit
interlude-timeout-lease-kit
stage-resource-inventory-kit
scene-resource-retirement-kit
three-resource-disposal-kit
renderer-disposal-kit
webgl-context-retirement-kit
idempotent-session-stop-kit
session-disposal-result-kit
lifecycle-journal-kit
lifecycle-fixture-kit
browser-teardown-smoke-kit
```

## Required lifecycle flow

```txt
create session and generation
  -> register frame/listener/timeout/resource leases
  -> run callbacks only while generation is current
  -> prepare and commit scene epochs
  -> retire predecessor scene resources after successor commit
  -> stop by retiring generation, RAF, timeouts, listeners, and new command admission
  -> dispose scene, target, post, renderer, canvas, and context ownership
  -> publish detached counts, failures, and idempotent result
```

## Ordered implementation queue

```txt
1. Versioned StoryManifest and StorySnapshot
2. Save admission, migration, and reconciliation
3. Inspection Command Authority and completion proof
4. Atomic Story/Stage Continue Transition
5. Runtime Session Lifecycle and Resource Retirement
6. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Runtime Session Lifecycle Authority
+ Scene Resource Retirement and Browser Teardown Fixture Gate
```