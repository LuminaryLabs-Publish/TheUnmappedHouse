# Project breakdown tracker: The Unmapped House

Timestamp: `2026-07-10T17-29-23-04-00`

## Goal

Document the current interaction loop, domain boundaries, kit inventory, service surface, and the smallest safe implementation gate for making StageKit scene replacement atomic, observable, and resource-safe without changing the game route or presentation.

## Selection ledger

The complete accessible `LuminaryLabs-Publish` inventory was compared against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/` and root `.agent` evidence.

```txt
AetherVale          tracked / 2026-07-10T16-40-44-04-00
IntoTheMeadow       tracked / 2026-07-10T16-51-37-04-00
HorrorCorridor      tracked / 2026-07-10T17-00-54-04-00
PhantomCommand      tracked / 2026-07-10T17-08-36-04-00
ZombieOrchard       tracked / 2026-07-10T17-18-47-04-00
TheUnmappedHouse    selected / prior 2026-07-10T15-58-47-04-00
MyCozyIsland        tracked / 2026-07-10T16-17-08-04-00
TheOpenAbove        tracked / 2026-07-10T16-28-54-04-00
PrehistoricRush     tracked / 2026-07-10T16-37-25-04-00
TheCavalryOfRome    excluded by rule
```

No eligible repository was new, missing from the central ledger, missing root `.agent` state, or otherwise undocumented. `TheUnmappedHouse` was the oldest eligible fallback and was the only product repository changed.

## Completion checklist

- [x] Compare full Publish inventory.
- [x] Compare central ledger timestamps and repo-local audit state.
- [x] Select one repository only.
- [x] Exclude `TheCavalryOfRome`.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify current kits and services.
- [x] Identify next-cut DSK boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, resource, and deploy audits.
- [x] Refresh root `.agent` pointers.
- [x] Push directly to `main` with no branch or pull request.
- [x] Synchronize the central repo ledger and internal change log.

## Interaction loop

```txt
page load
  -> load browser save
  -> resolve story scene
  -> StageKit clears and rebuilds the stage
  -> project story UI and debug JSON
  -> inspect by button or raycast
  -> mutate inspection/clues/log and persist
  -> schedule interlude on completion
  -> continue mutates story scene and route
  -> StageKit destructively replaces scene resources
  -> project UI and persist
  -> terminal copy after final scene
  -> KeyR clears storage and reloads
```

## Domain inventory

```txt
browser shell
fixed-aspect viewport
story/scene/hotspot/stage/post descriptors
story, route, clue, inspection, and notebook state
completion, interlude, terminal, and reset policy
side-panel, raycast, and keyboard input
localStorage persistence
story/interlude/hover/debug projections
Three.js render host and CDN dependency
scene descriptor consumption
procedural anime materials
post-processing
hotspot volumes and picking
camera parallax
render-target composition
stage resource lifetime
scene replacement policy
frame-loop authority
repo-local and central documentation ledgers
```

## Current kit inventory

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

## Current kit services

```txt
mount browser UI and stage surfaces
compute/apply fixed aspect framing
supply story and render descriptors
interpret inspect/continue/reset inputs
mutate clue, inspection, log, and route state
schedule delayed interludes and terminal projection
load/write/clear localStorage state
create renderer, camera, lights, render target, and frame loop
convert scene descriptors into meshes/materials/hotspot volumes
run procedural shader and post-process passes
perform hover/click raycasts
project aggregate debug JSON
retain repo-local and central audit history
```

## Main finding

`StageKit.loadScene()` destroys the active stage before proving the replacement can be built. It then mutates background, fog, camera, layers, props, hotspots, and post uniforms incrementally. There is no descriptor preflight, detached build plan, atomic swap, rollback, resource registry, disposal ledger, scene epoch, load result, or first-frame acknowledgement.

The story transition in `nextScene()` therefore cannot prove that `state.sceneId`, the committed StageKit scene, and the visible rendered frame refer to the same source scene. Detached geometries/materials are not disposed, and RAF/listeners have no teardown contract.

## Authored render footprint

```txt
scenes:          3
layers:          6
props:           13
hotspot volumes: 9
shader materials created per complete route: 19
```

The current route loads each scene once, but reloads, repaired saves, future branches, and test loops will accumulate retired GPU resources unless ownership is explicit.

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

## Validation status

Documentation-only. Runtime source, package scripts, dependencies, routes, and deployment configuration were not changed. Existing syntax checks and browser smoke were not run. The planned atomic-load and resource-lifetime fixtures do not exist yet.
