# Project breakdown: The Unmapped House Stage Resource Lifecycle Authority

**Timestamp:** `2026-07-12T19-11-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`

## Summary

The selected repository is a three-scene fixed-camera horror prototype. Its scene loader constructs Three.js resources directly in the live group, removes predecessors with `clear()`, drops tracking handles and continues a permanent RAF/listener session. The missing bounded context is stage resource lifecycle authority.

## Plan ledger

**Goal:** document one complete authority from scene-load intent through detached resource preparation, visible-frame commit, predecessor retirement and stage shutdown.

- [x] Compare all ten Publish repositories against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select the oldest eligible synchronized repository.
- [x] Inspect the full runtime and existing root audit state.
- [x] Identify the interaction loop.
- [x] Identify all domains.
- [x] Identify all implemented kits and offered services.
- [x] Quantify scene-resource allocation and retirement.
- [x] Define the missing DSK, candidate kits and proof gates.
- [x] Add required root and timestamped `.agent` records.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement runtime lifecycle authority.

## Selection comparison

```txt
TheUnmappedHouse   2026-07-12T17-20-42-04-00 selected
AetherVale         2026-07-12T17-35-48-04-00
TheOpenAbove       2026-07-12T17-41-25-04-00
IntoTheMeadow      2026-07-12T17-58-43-04-00
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
ZombieOrchard      2026-07-12T18-48-07-04-00
MyCozyIsland       2026-07-12T19-00-22-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot
  -> state load and current-scene resolution
  -> StageKit construction
  -> persistent renderer/target/post allocation
  -> browser callback registration
  -> recursive RAF start
  -> current-scene resource allocation

inspect
  -> canvas raycast or side-panel button
  -> story mutation, UI projection and save

complete
  -> delayed interlude
  -> Continue
  -> currentScene replacement
  -> live scene group clear
  -> successor scene resource allocation
  -> no load result, rollback or retirement receipt

terminal
  -> final copy only
  -> stage and callbacks continue running
```

## Domains in use

```txt
page and aspect-frame composition
story content and snapshot state
routing, inspection, clues, logs and completion
timer, modal and terminal projection
browser persistence and reset
pointer, click, keyboard and native button input
Three.js/WebGL rendering
scene resource construction and replacement
geometry and shader-material allocation
hotspot-volume allocation and raycasting
camera and hover projection
render target and post-processing
resize and RAF lifecycle
validation, deployment and audit tracking
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage, story, hotspot, Notebook, hover and interlude DOM surfaces. |
| `aspect-frame-kit` | Fixed-design viewport calculation and application. |
| `story-data-kit` | Scene, hotspot, clue, camera, geometry, material and post descriptors. |
| `browser-story-runtime-kit` | Boot, inspection, completion, Continue, reset, UI and save behavior. |
| `scene-route-kit` | Current-scene resolution and ordered successor selection. |
| `inspection-ledger-kit` | Scene-keyed inspected state. |
| `clue-ledger-kit` | Clue grant and query. |
| `notebook-log-kit` | Bounded narrative log. |
| `interlude-timer-kit` | Delayed interlude scheduling. |
| `terminal-route-kit` | Prototype-complete projection. |
| `localstorage-save-kit` | Save read, parse, merge, write and reset. |
| `stage-render-kit` | Renderer, camera, lights, target, listeners and RAF. |
| `scene-descriptor-consumer-kit` | Scene-to-Three resource construction. |
| `anime-material-kit` | Shader material allocation and time updates. |
| `post-process-kit` | Grain, vignette, chromatic, distortion and scan-line pass. |
| `hotspot-volume-kit` | Invisible geometry/material volumes. |
| `hotspot-picking-kit` | Pointer normalization, raycast and dispatch. |
| `camera-parallax-kit` | Pointer camera offsets. |
| `render-target-composition-kit` | Offscreen stage and canvas post passes. |
| `debug-json-projection-kit` | Raw Notebook JSON projection. |
| `package-syntax-check-kit` | Node syntax checks. |
| `static-pages-deploy-kit` | Pages deployment from `main`. |
| `repo-local-agent-ledger-kit` | Root and timestamped audit state. |
| `central-ledger-sync-kit` | Central repo ledger and change history. |

## Resource census

```txt
scene 1: 10 meshes
scene 2: 9 meshes
scene 3: 9 meshes
all scenes: 28 meshes
normal predecessor retirement: 19 meshes, 19 geometries, 19 materials
persistent stage resources: renderer, target, post material, post plane geometry, lights, cameras, listeners, RAF
```

## Main finding

`stageGroup.clear()` only detaches children. No code traverses the predecessor set or calls `geometry.dispose()` or `material.dispose()`. The next assignments discard shader-material and hotspot arrays. The stage also has no stop/dispose method, retained RAF handle or removable callback identities.

The absence of lifecycle results means the browser cannot prove:

```txt
which resource generation is active
whether candidate construction completed
whether rollback occurred
which resources were retired
whether disposal happened once
whether hover state belongs to the current scene
whether callbacks stopped
which resource revision produced the visible frame
```

## Required DSK

```txt
the-unmapped-house-stage-resource-lifecycle-authority-domain
```

Core services:

```txt
stage session/generation
scene resource-set identity/revision
scene load command and admission
detached resource planning and preparation
resource leases and ownership transfer
atomic commit and rollback
hover-state reset
exact-once retirement and disposal result
stale-load rejection
RAF/listener leases
stage stop command/result
lifecycle observation/journal
first-visible-scene-frame acknowledgement
browser and Pages fixtures
```

## Validation boundary

Documentation and source inspection only. No runtime code, story content, package script, dependency or deploy workflow changed. No browser, GPU, disposal, rollback or Pages lifecycle fixture was executed.