# Current audit: The Unmapped House

Timestamp: `2026-07-10T19-00-19-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype. Three authored scenes expose three hotspots each. First inspections grant nine required clues, completion opens a delayed interlude, continue advances the route, and the final continue projects a prototype-complete message.

## Current interaction loop

```txt
open index.html
  -> import src/game.js
  -> parse localStorage and shallow-merge the parsed object
  -> resolve currentScene from state.sceneId or fall back to scenes[0]
  -> construct StageKit and load the resolved scene
  -> render story UI and aggregate debug JSON
  -> inspect from a side-panel button or StageKit raycast
  -> pass a live hotspot descriptor object into inspectHotspot
  -> mutate inspected/clues/log and save
  -> evaluate completion from persisted global clue strings
  -> schedule an anonymous 450 ms interlude timer
  -> continue mutates currentScene, state.sceneId and route
  -> StageKit loads the next scene
  -> render UI and save
  -> final continue writes terminal copy only
  -> KeyR clears storage and reloads
```

## Current source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes; nine hotspots; clue requirements; camera, fog, stage, material, post and interlude descriptors. |
| `src/game.js` | Save parse/write, mutable story state, inspection, completion, timer, progression, terminal copy, DOM projection, reset and StageKit calls. |
| `src/stage-kit.js` | Three.js host, scene resources, descriptor consumption, procedural materials, hotspot volumes, picking, parallax, render target, post pass, resize and RAF. |
| `src/aspect-frame.js` | Fixed-aspect viewport policy. |

## Authored source inventory

```txt
scenes: 3
hotspots: 9
required clue ids: 9
stage layers: 6
stage props: 13
save key: the-unmapped-house.stage-prototype.v1
story source schema version: absent
story source fingerprint: absent
save envelope version: absent
save source fingerprint: absent
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
| `stage-render-kit` | Own renderer, camera, scene, lights, render target, post scene and RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible source-linked hotspot meshes. |
| `hotspot-picking-kit` | Perform hover/click raycasts and forward selected hotspot objects. |
| `debug-json-projection-kit` | Project aggregate scene, clue, route, inspection, completion and log state. |
| `repo-local-agent-ledger-kit` | Store current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirror selection, findings and next ledge centrally. |

## Story source and save authority finding

`loadState()` treats syntactically valid JSON as valid state and shallow-merges it over the initial object. It does not validate field types, remove unknown scene/hotspot/clue ids, repair route order, or establish that the save belongs to the current `story-data.js` revision.

If `state.sceneId` is unknown, `currentScene` falls back to the first scene while the invalid persisted id remains in `state`. The visible/rendered scene and persisted authority can therefore disagree until another transition overwrites the id.

`inspectHotspot()` accepts a full descriptor object rather than canonical ids. Neither the side-panel path nor the raycast path proves that the requested hotspot belongs to the active scene. `sceneComplete()` then trusts the global persisted clue array, so stale, manually edited, or future-source clue ids can satisfy requirements without a canonical inspection proof.

## Next-cut domains

```txt
story-source-schema
story-source-manifest
story-source-fingerprint
story-graph-validation
save-envelope
save-schema-validation
save-source-compatibility
save-reconciliation
canonical-story-state
canonical-hotspot-command
input-origin
story-command-result
inspection-proof
clue-derivation
completion-proof
content-drift-migration
story-source-diagnostics
dom-free-story-fixture
```

## Next-cut kits

```txt
story-source-schema-kit
story-manifest-kit
story-source-fingerprint-kit
story-graph-validator-kit
versioned-save-envelope-kit
save-shape-validator-kit
save-reconciliation-kit
content-drift-migration-kit
canonical-hotspot-resolver-kit
story-command-kit
story-command-result-kit
inspection-proof-kit
clue-derivation-kit
completion-proof-kit
story-source-diagnostics-kit
dom-free-story-fixture-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Save Reconciliation Fixture Gate
```

The atomic StageKit scene-commit and resource-lifetime plan remains the next render-host implementation after canonical source/save authority exists.
