# Current audit: The Unmapped House

Timestamp: `2026-07-10T17-29-23-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype. Three authored scenes expose three hotspots each. First inspections grant nine required clues, scene completion opens a delayed interlude, continue advances the route, and the final continue projects a prototype-complete message.

## Current interaction loop

```txt
open index.html
  -> import src/game.js
  -> load and shallow-merge localStorage state
  -> resolve current scene
  -> construct StageKit
  -> StageKit.loadScene clears and rebuilds live render resources
  -> render story UI and aggregate debug JSON
  -> inspect from side-panel button or StageKit raycast
  -> mutate inspected/clues/log, rerender, and save
  -> schedule interlude after scene completion
  -> continue mutates currentScene, state.sceneId, and route
  -> StageKit.loadScene destructively replaces the visible scene
  -> rerender and save
  -> final continue writes terminal copy only
  -> KeyR clears save and reloads
```

## Source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes; nine hotspots; clue requirements; camera, fog, layer, prop, material, post, and interlude descriptors. |
| `src/game.js` | Save load/write, story mutation, completion, interlude timing, route progression, terminal copy, StageKit calls, DOM projection, reset, diagnostics. |
| `src/stage-kit.js` | Three.js host, scene resources, descriptor consumption, procedural materials, hotspot volumes, picking, parallax, render target, post pass, resize, permanent frame loop. |
| `src/aspect-frame.js` | Canonical fixed-aspect viewport policy. |

## Domains in use

```txt
browser-shell
fixed-aspect-layout
story-source-descriptors
scene-route-state
story-state
clue-ledger
inspection-ledger
notebook-log
scene-completion-policy
interlude-timer-policy
terminal-route-projection
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
repo-local-agent-ledger
central-ledger-sync
```

## Current kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, hover label, debug panel, and interlude. |
| `aspect-frame-kit` | Compute and apply the canonical fixed-aspect viewport. |
| `story-data-kit` | Supply scene, hotspot, clue, camera, fog, geometry, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate inspect, continue, reset, projection, persistence, and StageKit. |
| `clue-ledger-kit` | Grant unique clues and evaluate scene requirements. |
| `inspection-ledger-kit` | Track scene-keyed hotspot inspections. |
| `notebook-log-kit` | Prepend and cap recent story entries. |
| `scene-route-kit` | Resolve the active scene and retain visited scene ids. |
| `interlude-timer-kit` | Schedule delayed interlude projection. |
| `terminal-route-kit` | Project terminal prototype copy. |
| `localstorage-save-kit` | Read, shallow-merge, write, and clear browser state. |
| `stage-render-kit` | Own renderer, camera, scene, lights, render target, post scene, and RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible source-linked hotspot meshes. |
| `hotspot-picking-kit` | Perform hover/click raycasts and forward selected hotspot objects. |
| `debug-json-projection-kit` | Project aggregate scene, clue, route, inspection, completion, and log state. |
| `repo-local-agent-ledger-kit` | Store current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirror selection, findings, and next ledge centrally. |

## Atomic scene-load finding

`StageKit.loadScene()` currently performs this order:

```txt
assign sceneData
  -> stageGroup.clear()
  -> hotspots = []
  -> materials = []
  -> mutate background/fog/camera
  -> create layers one by one
  -> create props one by one
  -> create hotspots one by one
  -> mutate post uniforms
```

This creates five authority gaps:

1. **No preflight:** malformed descriptors are discovered only while mutating the live stage.
2. **No atomic commit:** the old scene is removed before the replacement is proven buildable.
3. **No rollback:** an exception can leave a partial scene and partially changed camera/fog/post state.
4. **No resource ownership:** detached geometries and materials are not disposed before references are discarded.
5. **No story/render correlation:** `state.sceneId`, the loaded StageKit scene, and the next rendered frame have no shared scene epoch or acknowledgement.

The current authored scenes allocate 6 layers, 13 props, 9 hotspot volumes, and one shader material per layer/prop across a complete route. Repeated reloads or future branching amplify the missing disposal contract.

## Next-cut domains

```txt
scene-descriptor-preflight
stage-build-plan
stage-scene-epoch
stage-resource-registry
stage-resource-disposal
stage-load-result
stage-commit-transaction
stage-rollback
stage-frame-acknowledgement
story-stage-correlation
stage-host-disposal
dom-free-stage-fixture
```

## Next-cut kits

```txt
scene-descriptor-preflight-kit
stage-build-plan-kit
stage-scene-epoch-kit
stage-resource-registry-kit
stage-resource-disposal-kit
stage-load-result-kit
stage-commit-transaction-kit
stage-rollback-kit
stage-frame-ack-kit
story-stage-correlation-kit
stage-host-dispose-kit
dom-free-stage-fixture-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Scene Commit + Resource Lifetime Fixture Gate
```
