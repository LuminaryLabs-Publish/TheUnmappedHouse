# Current audit: The Unmapped House WebGL context and stage recovery

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `webgl-context-stage-recovery-authority-audited`  
**Branch:** `main`

## Summary

The browser application creates one application-lifetime Three.js presentation graph and starts a recursive RAF immediately. It has no application-owned `webglcontextlost` or `webglcontextrestored` flow, no readiness downgrade, no stage-independent fallback, no interaction suspension, no complete recovery manifest and no first recovered visible-frame acknowledgement.

## Plan ledger

**Goal:** convert context loss and restoration into one typed presentation transaction while keeping story truth stable and stage-dependent interaction safe.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Select only `TheUnmappedHouse` under the oldest eligible rule.
- [x] Inspect renderer construction, scene loading, pointer input, RAF ownership, render targets and validation.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Define the parent authority, participant receipts and terminal results.
- [x] Add timestamped architecture, render, gameplay, interaction, WebGL-lifecycle, deploy and central-sync audits.
- [x] Change documentation only.
- [ ] Implement and run executable context-recovery fixtures.

## Complete interaction loop

```txt
boot
  -> StageKit creates WebGLRenderer
  -> create scene, camera and lights
  -> create offscreen target and post graph
  -> install resize, mousemove and click listeners
  -> start recursive RAF
  -> load current scene resources
  -> enable DOM story controls

frame
  -> update camera parallax
  -> update stage and post uniforms
  -> render current scene to offscreen target
  -> render post scene to the canvas

interaction
  -> canvas raycast or DOM button
  -> inspect hotspot
  -> mutate story state and persistence

context loss
  -> no application-owned event admission
  -> no render-submission retirement
  -> no readiness downgrade or fallback
  -> no stage-dependent interaction suspension

restoration
  -> no declared resource reconstruction
  -> no recovery probe or atomic adoption
  -> no first recovered visible-frame acknowledgement
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Stage shell, story controls, Notebook, hover label and interlude. |
| `src/game.js` | Story state, progression, UI, save, reset and hotspot callback. |
| `src/story-data.js` | Scene, hotspot, camera, material and post descriptors. |
| `src/stage-kit.js` | Three.js provider, WebGL renderer, GPU resources, scene loading, picking, resize and RAF. |
| `src/aspect-frame.js` | Fixed-aspect viewport calculation and DOM placement. |
| `package.json` | Syntax-only checks. |

## Domains in use

```txt
browser document, fixed shell and lifecycle
story manifest, state, progression and persistence
DOM and canvas interaction
Three.js provider and WebGL renderer
WebGL context lifecycle and generation identity
scene, camera, lighting and descriptor consumption
procedural shader materials
render-target and post-processing composition
hotspot volumes, raycasting and dispatch
camera parallax
recursive RAF and render-submission ownership
presentation readiness and fallback
stage-dependent interaction admission
GPU resource reconstruction, probe, adoption and rollback
first recovered visible-frame evidence
syntax validation, static serving and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed design aspect, window-fit calculation and DOM frame placement. |
| `story-data-kit` | Scene descriptors, hotspots, clue grants, completion, camera, materials and post descriptors. |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, continue, reset, UI and persistence calls. |
| `scene-route-kit` | Scene resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and query. |
| `notebook-log-kit` | Narrative log mutation and bounded retention. |
| `interlude-timer-kit` | Delayed completion interlude. |
| `terminal-route-kit` | Prototype-complete projection. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post construction. |
| `anime-material-kit` | Procedural shader materials and time updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | Coordinate normalization, raycast and dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass, post pass and target sizing. |
| `debug-json-projection-kit` | Story-field serialization and Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks. |
| `static-pages-deploy-kit` | Static Pages delivery from `main`. |
| `repo-local-agent-ledger-kit` | Root and timestamped audit records. |
| `central-ledger-sync-kit` | Central selection and findings mirror. |

```txt
implemented source-backed kits: 24
planned WebGL recovery coordinating kits: 22
```

## Concrete findings

### Context events are not routed

No `webglcontextlost` or `webglcontextrestored` handler exists in `StageKit` or `game.js`.

### Frame submission has no lease

`animate()` schedules its successor recursively. No accepted generation, cancellation result or stale-callback rejection exists for loss and recovery.

### Presentation readiness is absent

Story controls and persistence remain active independently from the renderer and last proven visible frame.

### Recovery participants are implicit

Renderer, target, post graph, shaders, geometry, hotspots, camera, lights, viewport and RAF have no complete resource manifest or candidate receipts.

### Visible recovery is unproven

No probe, atomic adoption, rollback result or first recovered frame ties the current scene to a successor context generation.

### Validation is syntax-only

The package check cannot create, lose or restore a WebGL context.

## Required authority

```txt
the-unmapped-house-webgl-context-stage-recovery-authority-domain
```

```txt
WebGLContextLifecycleEvent
  -> bind surface, context and stage generations
  -> retire the predecessor render-submission lease
  -> mark presentation lost and suspend stage-dependent commands
  -> show a WebGL-independent fallback
  -> prepare the complete successor resource graph
  -> validate capabilities, scene descriptor and viewport
  -> execute one recovery probe
  -> atomically adopt all participants or dispose all candidates
  -> publish WebGLStageRecoveryResult
  -> resume one accepted render-submission generation
  -> publish FirstRecoveredStageFrameAck
```

## Validation boundary

Documentation and machine audit state changed. Runtime JavaScript, HTML, CSS, story descriptors, persistence, rendering behavior, package scripts, dependencies and deployment did not change. No source, browser, build or Pages recovery fixture was executed.