# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T15-58-47-04-00`

## Goal

Refresh the repo-local architecture record around the actual three-scene browser runtime, identify every active domain, kit, and service, and define the smallest safe implementation ledge for source-owned story lifecycle transactions, exactly-once browser effects, save reconciliation, and StageKit resource observations without changing the visible game.

## Plan ledger

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` repository inventory.
- [x] Compare all eligible repositories against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger timestamps and root `.agent` evidence.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select exactly one repository.
- [x] Read the current root `.agent` state.
- [x] Read `src/game.js`, `src/story-data.js`, `src/stage-kit.js`, and `package.json`.
- [x] Reconstruct the interaction loop and authority boundaries.
- [x] Enumerate current domains, kit services, and kits.
- [x] Record render, interaction, gameplay, story-authority, save, lifecycle, and deploy gaps.
- [x] Refresh root `.agent` pointers.
- [x] Add a timestamped turn-ledger entry and audit set.
- [x] Keep runtime source, dependencies, routes, and deployment unchanged.
- [x] Push repo-local findings directly to `main`.
- [x] Synchronize the central repo ledger and internal change log.

## Selection comparison

The accessible Publish inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have recent root `.agent` evidence. `TheUnmappedHouse` had the oldest eligible central timestamp and was selected as the documented fallback.

```txt
TheUnmappedHouse    selected / prior 2026-07-10T14-28-47-04-00
MyCozyIsland        tracked / 2026-07-10T14-42-01-04-00
TheOpenAbove        tracked / 2026-07-10T14-50-38-04-00
PrehistoricRush     tracked / 2026-07-10T14-59-00-04-00
AetherVale          tracked / 2026-07-10T15-09-26-04-00
IntoTheMeadow       tracked / 2026-07-10T15-18-29-04-00
HorrorCorridor      tracked / 2026-07-10T15-31-03-04-00
PhantomCommand      tracked / 2026-07-10T15-38-40-04-00
ZombieOrchard       tracked / 2026-07-10T15-48-18-04-00
TheCavalryOfRome    excluded by rule
```

## Product read

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, three interludes, local browser persistence, descriptor-driven Three.js rendering, side-panel inspection, and raycast inspection.

## Interaction loop

```txt
open index.html
  -> import src/game.js
  -> load and shallow-merge localStorage state
  -> resolve current scene
  -> construct StageKit and start its permanent frame loop
  -> consume scene camera/fog/layer/prop/hotspot/post descriptors
  -> project story copy, hotspot buttons, and aggregate debug JSON
  -> inspect through side-panel button or StageKit raycast
  -> mutate inspected/clues/log and save
  -> when requirements are met, schedule interlude after 450 ms
  -> continue to the next scene and reload StageKit
  -> final continue writes prototype-complete DOM copy only
  -> KeyR clears storage and reloads the page
```

## Active domains

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

## Kit service map

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mounts the stage, story panel, hotspot list, hover label, debug panel, and interlude. |
| `aspect-frame-kit` | Computes and applies the canonical fixed-aspect viewport. |
| `story-data-kit` | Supplies all story, scene, hotspot, clue, requirement, camera, fog, stage, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Boots state and coordinates inspect/continue/reset, mutation, projection, persistence, and StageKit. |
| `clue-ledger-kit` | Grants unique clues and evaluates completion requirements. |
| `inspection-ledger-kit` | Stores per-scene hotspot inspection flags. |
| `notebook-log-kit` | Prepends and caps the latest eight log entries. |
| `scene-route-kit` | Tracks the active scene and visited route. |
| `interlude-timer-kit` | Schedules the completion interlude after 450 ms. |
| `terminal-route-kit` | Projects the prototype-complete message after the last scene. |
| `localstorage-save-kit` | Reads, parses, shallow-merges, writes, and clears the v1 save payload. |
| `stage-render-kit` | Owns the WebGL renderer, scene, lights, camera, render target, post scene, and frame loop. |
| `scene-descriptor-consumer-kit` | Converts camera, fog, layers, props, hotspots, and post descriptors into live render state. |
| `anime-material-kit` | Builds procedural FBM/toon shader materials. |
| `post-process-kit` | Applies grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Creates invisible descriptor-linked hotspot meshes. |
| `hotspot-picking-kit` | Performs hover and click raycasts and forwards hotspot callbacks. |
| `debug-json-projection-kit` | Emits aggregate scene, clue, route, inspection, completion, and log state. |
| `repo-local-agent-ledger-kit` | Stores root pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirrors selection, findings, and next ledge into the central repository. |

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

## Main finding

The next blocker is not content or rendering fidelity. Story lifecycle is split between mutable state, timer callbacks, direct DOM effects, StageKit callbacks, and unversioned persistence. The runtime has no explicit `exploring`, `completion_pending`, `interlude_open`, `advancing`, or `terminal` lifecycle state; no exactly-once effect journal; no save reconciliation; and no StageKit resource/load/pick observations.

`StageKit.loadScene()` clears the group and drops material references without disposing prior geometries or materials, while the constructor starts an animation loop and browser listeners with no teardown contract. The next cut should observe and bound this lifetime rather than rewrite the renderer.

## Next safe ledge

```txt
TheUnmappedHouse Story Lifecycle Transaction Ledger + StageKit Resource Observation Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
branch created: no
pull request created: no
npm run check: not run in connector-only environment
browser smoke: not run
DOM-free lifecycle fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
```