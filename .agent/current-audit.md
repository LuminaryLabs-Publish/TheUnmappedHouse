# Current audit: The Unmapped House hotspot availability and discovery projection

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `hotspot-availability-discovery-projection-authority-audited`  
**Branch:** `main`

## Summary

The product has parallel DOM and canvas hotspot projections but no owned availability boundary. Authored membership in `currentScene.hotspots` currently means listed, enabled, hoverable and pickable. This prevents the runtime from expressing hidden, clue-gated, occluded, list-only, canvas-only, disabled or modal-suspended interactions through one deterministic result.

## Plan ledger

**Goal:** make every hotspot representation and interaction consume one accepted scene-specific availability generation.

- [x] Compare all current Publish repositories, central ledgers, root `.agent` states and documentation heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect `index.html`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/styles.css`, `package.json` and retained audit state.
- [x] Identify the full interaction loop, all active domains, all 24 kits and every offered service.
- [x] Trace list, hover, pick, inspect, modal and scene-transition boundaries.
- [x] Define 18 hotspot-availability authority surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and run deterministic parity fixtures.

## Complete interaction loop

```txt
page boot
  -> load state and current scene
  -> create StageKit
  -> create visible stage geometry
  -> create one invisible volume per scene hotspot
  -> create one DOM button per scene hotspot

canvas interaction
  -> mousemove updates pointer and hover
  -> pick raycasts only hotspot volumes
  -> click dispatches picked hotspot

DOM interaction
  -> enabled button dispatches the same hotspot

inspection
  -> update inspected ledger
  -> grant clues
  -> update story copy and Notebook
  -> rebuild hotspot buttons
  -> save state
  -> schedule interlude when complete

scene transition
  -> replace current scene
  -> clear/recreate stage and hotspot volumes
  -> rebuild DOM list
  -> prior hover evidence has no explicit retirement result
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport
authored story content and descriptor data
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js scene, camera, geometry, materials, shaders, raycasting, render targets and RAF
hotspot availability, discovery, visibility, occlusion, interaction modes, modal suspension and parity
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude, Loading copy.
- `aspect-frame-kit`: fixed aspect, window-fit calculation, DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion, camera, materials and post.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, Continue, reset, UI and persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected state.
- `clue-ledger-kit`: clue grant and query.
- `notebook-log-kit`: bounded narrative log.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: terminal DOM copy.
- `localstorage-save-kit`: parse, shallow merge, replacement and delete.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, target, callbacks and RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot, fog and post configuration.
- `anime-material-kit`: procedural shader materials and time animation.
- `post-process-kit`: grain, vignette, chromatic shift, distortion and scan lines.
- `hotspot-volume-kit`: invisible volumes and descriptor attachment.
- `hotspot-picking-kit`: pointer normalization, raycast and dispatch.
- `camera-parallax-kit`: pointer-driven camera offsets.
- `render-target-composition-kit`: offscreen stage and post passes, target sizing.
- `debug-json-projection-kit`: story serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped records.
- `central-ledger-sync-kit`: central mirror and findings history.

```txt
implemented kits: 24
planned hotspot-availability surfaces: 18
```

## Source-backed findings

- `renderUi()` creates an enabled button for every `currentScene.hotspots` entry.
- `StageKit.loadScene()` creates a raycast volume for every entry.
- `pick()` intersects only hotspot volumes, so visible scene geometry does not define occlusion.
- DOM and canvas selection share no availability revision or parity result.
- `loadScene()` does not explicitly clear `hovered` or hide the old hover label.
- The syntax-only package check cannot prove hidden, conditional, occlusion, stale or parity behavior.

No current content defect was reproduced. The gap is absence of a reusable authority for future conditional interactions.

## Required authority

`the-unmapped-house-hotspot-availability-discovery-projection-authority-domain`

```txt
HotspotAvailabilityCommand
  -> bind content, scene, story, clue, inspection, modal, camera and frame revisions
  -> resolve discovery, visibility, occlusion, enablement and interaction mode
  -> publish HotspotAvailabilityResult

HotspotProjectionCommand
  -> derive DOM and canvas candidate sets from the same result
  -> retire stale hover and focus evidence
  -> publish HotspotParityResult

HotspotInteractionCommand
  -> validate identity and expected revisions
  -> reject unavailable, hidden, occluded, modal or stale work
  -> publish HotspotInteractionResult
  -> publish FirstAvailableHotspotFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, hotspot geometry, picking behavior, focus behavior, persistence, package scripts, workflows and deployment did not change. No browser or deployment fixture was executed.