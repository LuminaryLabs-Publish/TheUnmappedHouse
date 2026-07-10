# Current audit: The Unmapped House

Timestamp: `2026-07-10T15-58-47-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype. Three authored scenes each expose three hotspots. First inspections grant nine total required clues, scene completion opens a delayed interlude, continue advances the route, and the final continue projects a prototype-complete message.

## Current interaction loop

```txt
open index.html
  -> import src/game.js
  -> capture DOM nodes at module scope
  -> load and shallow-merge localStorage over createInitialState()
  -> resolve current scene from state.sceneId or scenes[0]
  -> construct StageKit with inspectHotspot callback
  -> StageKit.loadScene consumes camera, fog, layers, props, hotspots, and post settings
  -> renderUi projects copy, hotspot buttons, completion, and aggregate debug JSON
  -> side-panel button or StageKit raycast invokes inspectHotspot
  -> first inspect mutates inspected/clues/log, rerenders, and saves
  -> repeat inspect rerenders/logs/saves without typed no-mutation result
  -> completed scene schedules showInterlude after 450 ms
  -> continue advances route, closes interlude, loads StageKit, rerenders, and saves
  -> final continue writes terminal copy only
  -> KeyR removes the save and reloads
```

## Source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Game title, three scenes, nine hotspots, nine clue grants, completion requirements, interlude copy, camera, fog, layers, props, materials, and post settings. |
| `src/game.js` | Initial state, save load/write, clue/inspection/log mutation, completion, interlude timing, route progression, terminal copy, StageKit calls, DOM projection, reset, and diagnostics. |
| `src/stage-kit.js` | Three.js renderer, camera, lights, fog, descriptor consumption, procedural materials, hotspot volumes, raycast picking, hover label, parallax, render target, post pass, resize, and frame loop. |
| `src/aspect-frame.js` | Canonical dimensions and fixed-aspect viewport calculation/application. |

## Current domains

```txt
browser-shell
fixed-aspect-layout
story-source-descriptors
scene-source-descriptors
hotspot-source-descriptors
stage-source-descriptors
post-source-descriptors
story-state
scene-route-state
clue-ledger
inspection-ledger
notebook-log
scene-completion-policy
interlude-timer-policy
terminal-route-projection
browser-command-adapter
side-panel-input
raycast-input
keyboard-reset-input
localstorage-persistence
story-copy-projection
interlude-projection
hover-label-projection
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
repo-local-agent-ledger
central-ledger-sync
```

## Kit services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mounts the stage, story panel, hotspot list, hover label, debug panel, and interlude. |
| `aspect-frame-kit` | Computes and applies the canonical fixed-aspect viewport. |
| `story-data-kit` | Supplies story, scene, hotspot, clue, requirement, camera, fog, stage, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Boots state and coordinates inspect, continue, reset, mutation, projection, persistence, and StageKit. |
| `clue-ledger-kit` | Grants unique clue ids and tests requirements. |
| `inspection-ledger-kit` | Tracks scene-keyed hotspot inspections. |
| `notebook-log-kit` | Prepends and caps eight recent log entries. |
| `scene-route-kit` | Selects the active scene and retains visited scene ids. |
| `interlude-timer-kit` | Schedules delayed interlude projection. |
| `terminal-route-kit` | Projects prototype-complete copy after the last scene. |
| `localstorage-save-kit` | Reads, parses, shallow-merges, writes, and clears v1 browser state. |
| `stage-render-kit` | Creates the WebGL renderer, camera, scene, lights, fog, render target, post scene, and frame loop. |
| `scene-descriptor-consumer-kit` | Converts scene descriptors into live render objects and uniforms. |
| `anime-material-kit` | Creates procedural FBM/toon shader materials. |
| `post-process-kit` | Applies grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Builds invisible source-linked hotspot meshes. |
| `hotspot-picking-kit` | Performs hover/click raycasts and forwards selected hotspot callbacks. |
| `debug-json-projection-kit` | Projects aggregate scene, clue, route, inspection, completion, and log state. |
| `repo-local-agent-ledger-kit` | Stores current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirrors selection, findings, and next ledge centrally. |

## Current kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
clue-ledger-kit
inspection-ledger-kit
notebook-log-kit
scene-route-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
debug-json-projection-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

## Next-cut domains

```txt
story-source-manifest
story-source-fingerprint
story-state-snapshot
story-lifecycle-state
story-command-envelope
story-command-preflight
story-command-result
story-state-transition
story-lifecycle-transaction
browser-effect-intent
browser-effect-readback
exactly-once-effect-journal
save-envelope
save-reconciliation
save-observation
stage-load-observation
stage-pick-observation
stage-resource-observation
stage-frame-observation
story-replay
gamehost-story-diagnostics
dom-free-lifecycle-fixture
```

## Next-cut kits

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-state-snapshot-kit
story-lifecycle-state-kit
story-command-envelope-kit
story-command-preflight-kit
story-command-result-kit
story-transition-ledger-kit
story-lifecycle-transaction-kit
browser-effect-intent-kit
browser-effect-readback-kit
exactly-once-effect-journal-kit
save-envelope-kit
save-reconciliation-kit
save-observation-kit
stage-load-observation-kit
stage-pick-observation-kit
stage-resource-observation-kit
stage-frame-observation-kit
story-replay-kit
gamehost-story-diagnostics-kit
dom-free-lifecycle-fixture-kit
```

## Current finding

The primary gap is lifecycle authority, not content or visual fidelity. The runtime has no explicit `exploring`, `completion_pending`, `interlude_open`, `advancing`, or `terminal` state. Timer, DOM, persistence, StageKit load/pick, and reset effects are executed inline without ids or readbacks.

The save payload has no internal schema/source fingerprint and is shallow-merged without nested reconciliation. The terminal state is not persisted. StageKit scene replacement has no detached observation or explicit geometry/material disposal, and its frame loop/listeners have no teardown contract.

## Next safe ledge

```txt
TheUnmappedHouse Story Lifecycle Transaction Ledger + StageKit Resource Observation Fixture Gate
```