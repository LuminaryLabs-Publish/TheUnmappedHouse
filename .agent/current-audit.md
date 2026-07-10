# Current audit: The Unmapped House

Timestamp: `2026-07-10T14-28-47-04-00`

## Product read

A fixed-camera horror prototype where the player inspects authored hotspots across three scene descriptors, gathers required clues, opens interludes, advances through the route, and reaches a terminal prototype-complete state.

## Current interaction loop

```txt
open index.html
  -> module loads src/game.js
  -> game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged over createInitialState()
  -> current scene resolves from state.sceneId or scenes[0]
  -> StageKit is created with inspectHotspot callback
  -> StageKit.loadScene consumes camera, fog, stage, hotspot, and post descriptors
  -> renderUi writes title, copy, hotspot buttons, and aggregate debug JSON
  -> side-panel button or StageKit raycast click invokes inspectHotspot
  -> first inspect mutates inspected/clues/log, checks completion, projects UI, and saves
  -> repeat inspect projects reread copy/log and saves without a typed no-mutation result
  -> first completed state schedules showInterlude after 450 ms
  -> continue advances route or writes terminal copy directly
  -> scene advance reloads StageKit, rerenders, and saves
  -> KeyR clears the save and reloads
```

## Source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Game title, three scenes, hotspot ids/labels/volumes/copy/grants, completion requirements, interlude copy, cameras, stage layers/props, fog, materials, and post settings. |
| `src/game.js` | State construction, save load/write, clue grant, log retention, completion, inspect, interlude scheduling, route progression, terminal copy, StageKit calls, DOM projection, reset, and diagnostics. |
| `src/stage-kit.js` | Three.js renderer, fixed camera, fog, lights, descriptor consumption, procedural materials, hotspot meshes, raycast picking, hover labels, camera parallax, render target, post-process, resize, and frame loop. |
| `src/aspect-frame.js` | Canonical design dimensions and fixed-aspect viewport calculation/application. |

## Current domains

```txt
browser-shell
fixed-aspect-layout
story-copy-projection
interlude-route-projection
hover-label-projection
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
completion-policy
interlude-policy
terminal-route-policy
localstorage-persistence
browser-command-adapter
side-panel-input
raycast-input
keyboard-reset-input
stage-render-host
three-cdn-runtime
scene-descriptor-consumption
procedural-anime-material
post-process-pass
hotspot-volume
raycast-picking
camera-parallax
render-target-composition
debug-json-projection
repo-local-agent-ledger
central-ledger-sync
```

## Next-cut proof domains

```txt
story-source-manifest
story-source-fingerprint
story-state-snapshot
story-command-envelope
story-command-preflight
story-command-result
story-command-correlation
story-state-transition
story-projection-ledger
browser-effect-intent
browser-effect-readback
stage-load-observation
stage-pick-observation
save-envelope
save-load-observation
save-write-observation
story-replay
gamehost-story-diagnostics
dom-free-story-fixture
```

## Kit services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mounts stage, story panel, hotspot list, debug panel, hover label, and interlude. |
| `aspect-frame-kit` | Computes and applies the canonical fixed-aspect frame. |
| `story-data-kit` | Supplies all authored story, scene, hotspot, stage, camera, fog, material, post, requirement, and interlude descriptors. |
| `browser-story-runtime-kit` | Interprets inspect/continue/reset inputs, mutates state, schedules interludes, invokes StageKit, projects DOM, and persists. |
| `localstorage-save-kit` | Reads, parses, shallow-merges, writes, and clears prototype save state. |
| `notebook-log-kit` | Prepends and caps recent story-log rows. |
| `stage-render-kit` | Creates renderer, camera, scene, lights, fog, render target, and frame loop. |
| `scene-descriptor-consumer-kit` | Converts authored scene descriptors into live camera, layers, props, hotspots, fog, and post settings. |
| `anime-material-kit` | Creates procedural noise/toon shader materials. |
| `post-process-kit` | Applies grain, vignette, chromatic, distortion, memory, and scan-line effects. |
| `hotspot-volume-kit` | Builds invisible source-linked hotspot meshes. |
| `hotspot-picking-kit` | Performs hover/click raycasts and forwards selected hotspot callbacks. |
| `debug-json-projection-kit` | Projects current scene, clues, route, inspections, completion, and latest log entries. |
| `repo-local-agent-ledger-kit` | Stores current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirrors current selection, findings, and next ledge to the central repo. |

## Current kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
localstorage-save-kit
notebook-log-kit
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

## Next-cut kits

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-state-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-command-preflight-kit
story-command-result-kit
story-command-correlation-kit
story-transition-ledger-kit
story-projection-ledger-kit
browser-effect-intent-kit
browser-effect-readback-kit
stage-load-observation-kit
stage-pick-observation-kit
save-envelope-kit
save-load-observation-kit
save-write-observation-kit
story-replay-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
```

## Current finding

The current architecture lacks a causal proof path. Player input, source validation, mutation, DOM projection, persistence, interlude/terminal effects, StageKit picking/loading, and diagnostics are not tied together by stable ids or typed records.

The next useful cut is additive source-owned command correlation plus browser, save, and StageKit readback. Visible content and rendering should remain unchanged.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Correlation Ledger Refresh + StageKit Observation Fixture Gate
```
