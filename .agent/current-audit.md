# Current audit: The Unmapped House

Timestamp: `2026-07-10T20-38-24-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype. Three authored scenes expose three hotspots each. First inspections grant nine required clues, completion opens a delayed interlude, continue advances the route, and the final continue projects a prototype-complete message.

## Current interaction loop

```txt
open index.html
  -> import src/game.js
  -> parse localStorage and shallow-merge state
  -> resolve currentScene
  -> construct StageKit
  -> StageKit.loadScene(currentScene)
       -> clear the live group
       -> reset hotspot/material arrays
       -> apply background/fog/camera/post values
       -> create layer, prop and hotspot resources directly into the live group
  -> RAF renders scene into a target and then through the post pass
  -> pointer movement raycasts hotspots and moves the hover label
  -> canvas click or side-panel button calls inspectHotspot
  -> mutate inspected/clues/log, save and render UI
  -> completion schedules a delayed interlude
  -> continue changes scene and calls StageKit.loadScene again
  -> KeyR clears storage and reloads
```

## Source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes; nine hotspots; clue requirements; camera, fog, stage, material, post and interlude descriptors. |
| `src/game.js` | Save parse/write, mutable story state, inspection, completion, timer, progression, terminal copy, DOM projection, reset and StageKit calls. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, lights, render target, post pass, descriptor consumption, resource creation, picking, resize and RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 aspect-frame computation and DOM projection. |

## Authored render inventory

```txt
scenes: 3
stage layers: 6
stage props: 13
hotspot volumes: 9
stage meshes created across one complete route: 28
scene-one live meshes: 10
scene-two live meshes: 9
scene-three live meshes: 9
persistent post meshes: 1
persistent render targets: 1
explicit StageKit dispose method: absent
stage load result: absent
stage epoch: absent
resource ledger: absent
```

## Domains in use

```txt
browser-shell
fixed-aspect-layout
story-source-descriptors
scene-order
scene-identity
hotspot-identity
clue-identity
story-state
scene-route-state
inspection-ledger
clue-ledger
notebook-log
scene-completion-policy
interlude-timer-policy
terminal-projection
side-panel-input
raycast-input
keyboard-reset-input
localstorage-persistence
story-copy-projection
interlude-projection
debug-json-projection
stage-render-host
three-cdn-runtime
scene-descriptor-consumption
procedural-anime-material
post-process-pass
hotspot-volume
raycast-picking
camera-parallax
render-target-composition
stage-resource-lifecycle
scene-replacement-policy
frame-loop-authority
resize-listener-lifecycle
pointer-listener-lifecycle
hover-state-lifecycle
gpu-resource-disposal
stage-commit-identity
repo-local-agent-ledger
central-ledger-sync
```

## Current kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, hover label, debug panel and interlude. |
| `aspect-frame-kit` | Compute and apply the canonical fixed-aspect viewport. |
| `story-data-kit` | Supply scene, hotspot, clue, stage, camera, fog, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate inspect, continue, reset, projection, persistence and StageKit. |
| `clue-ledger-kit` | Grant unique clue strings and evaluate requirement membership. |
| `inspection-ledger-kit` | Track scene-keyed hotspot inspection flags. |
| `notebook-log-kit` | Prepend and cap recent story entries. |
| `scene-route-kit` | Resolve the active scene and retain visited scene ids. |
| `interlude-timer-kit` | Schedule delayed interlude projection. |
| `terminal-route-kit` | Project terminal prototype copy. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear browser state. |
| `stage-render-kit` | Own renderer, camera, scene, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors directly into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials and retain only those materials in an array. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible hotspot meshes and attach full descriptor objects. |
| `hotspot-picking-kit` | Perform hover/click raycasts and forward selected hotspot objects. |
| `debug-json-projection-kit` | Project aggregate story state, not render-host lifecycle state. |
| `repo-local-agent-ledger-kit` | Store current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirror selection, findings and next ledge centrally. |

## Render-host lifecycle finding

`loadScene()` mutates the live host incrementally. It clears the current group before validating or fully building the replacement. If descriptor consumption throws after the clear, the previous scene is already gone and the new scene may be partial.

`stageGroup.clear()` detaches objects but does not call `dispose()` on their geometries or materials. `this.materials = []` drops references to prior anime materials before cleanup, hotspot `MeshBasicMaterial` instances are never included in that array, and no scene-local resource ledger exists. Traversing all three scenes therefore creates 28 stage meshes while only the newest 9 remain attached.

The constructor starts a self-recursing `requestAnimationFrame` without retaining its id. Resize, mousemove and click listeners are installed through anonymous closures, which prevents deterministic removal. Render target, post geometry/material, renderer, scene-local resources and listeners have no single lifecycle owner or idempotent teardown contract.

## Interaction and epoch finding

Hotspot meshes store the full descriptor object in `userData.hotspot`. No `stageEpoch`, committed scene id, source revision or canonical hotspot reference is attached to the pick result. `hovered` and hover-label state are not explicitly cleared during scene replacement. The runtime cannot prove that a click result was produced by the currently committed stage.

## Next-cut domains

```txt
stage-build-plan
stage-build-validation
stage-resource-ledger
stage-resource-ownership
atomic-stage-commit
stage-commit-result
stage-epoch
committed-scene-identity
hotspot-stage-reference
stale-pick-rejection
hover-reset-policy
frame-loop-lifecycle
listener-lifecycle
render-target-lifecycle
idempotent-stage-disposal
headless-stage-plan-fixture
browser-stage-lifecycle-smoke
```

## Next-cut kits

```txt
stage-build-plan-kit
stage-descriptor-validator-kit
stage-resource-ledger-kit
stage-resource-owner-kit
atomic-stage-commit-kit
stage-commit-result-kit
stage-epoch-kit
hotspot-stage-reference-kit
stale-pick-rejection-kit
hover-reset-kit
frame-loop-lifecycle-kit
event-listener-lifecycle-kit
render-target-lifecycle-kit
stage-disposal-kit
headless-stage-plan-fixture-kit
browser-stage-lifecycle-smoke-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Commit + Resource Lifecycle Fixture Gate
```

The goal is to preserve the current scene descriptors and visuals while making replacement transactional, observable and leak-free. Story-source/save authority remains a separate upstream gameplay contract.
