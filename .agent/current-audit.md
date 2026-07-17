# Current audit: The Unmapped House runtime frame fault containment

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `runtime-frame-fault-containment-backoff-authority-audited`  
**Branch:** `main`

## Summary

`StageKit.animate()` schedules the next RAF before any camera, material or renderer phase. A frame exception therefore does not prevent the already-admitted successor callback. Persistent failures lack bounded retries, backoff, retirement, safe projection and explicit recovery.

## Plan ledger

**Goal:** settle every frame attempt exactly once and bind failure, retry, retirement and recovery to explicit runtime generations.

- [x] Compare the full Publish inventory and central ledgers.
- [x] Select only TheUnmappedHouse as the oldest synchronized eligible repository.
- [x] Inspect the browser shell, story runtime, renderer, aspect frame, story data, package scripts and retained audits.
- [x] Identify the full interaction loop, domains, 24 implemented kits and all services.
- [x] Trace successor scheduling before camera, material, scene-render and post-render phases.
- [x] Define 20 proposed runtime-frame-fault surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and run injected-fault, backoff, retirement, restart and parity fixtures.

## Complete interaction loop

```txt
boot
  -> resolve story state and scene
  -> construct StageKit
  -> allocate WebGL renderer and target
  -> load descriptors
  -> render UI and start RAF

interaction
  -> pointer/canvas or DOM inspection
  -> story mutation and save
  -> interlude and route progression

RAF
  -> schedule successor callback first
  -> update camera parallax
  -> update material and post time
  -> render scene target
  -> render post scene

failure
  -> phase throws
  -> current callback exits without result
  -> successor callback remains queued
  -> no bounded settlement exists
```

## Domains in use

```txt
browser document, lifecycle, RAF and timing
fixed-aspect viewport and resize projection
authored story descriptors and narrative state
inspection, clues, route, interlude, terminal and persistence
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js camera, scene, geometry, materials, shaders, raycasting and targets
frame scheduling, named phase execution, fault classification and deduplication
retry budgets, backoff, runtime retirement, safe fallback and restart
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude and Loading copy.
- `aspect-frame-kit`: fixed aspect, window-fit calculation and DOM frame placement.
- `story-data-kit`: scene descriptors, copy, hotspots, clues, completion, camera, materials and post.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, Continue, reset, UI and persistence.
- `scene-route-kit`: scene resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected state.
- `clue-ledger-kit`: clue grant and query.
- `notebook-log-kit`: bounded narrative log.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: terminal DOM projection.
- `localstorage-save-kit`: parse, shallow merge, replacement and deletion.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, target, callbacks and recursive RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot, fog and post configuration.
- `anime-material-kit`: procedural shader materials and elapsed-time animation.
- `post-process-kit`: grain, vignette, chromatic shift, distortion and scan lines.
- `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast and dispatch.
- `camera-parallax-kit`: pointer-driven fixed-camera offsets.
- `render-target-composition-kit`: offscreen and post passes with target sizing.
- `debug-json-projection-kit`: story serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped records.
- `central-ledger-sync-kit`: central mirror and findings history.

```txt
implemented kits: 24
planned runtime-frame-fault surfaces: 20
```

## Source-backed findings

- The next RAF is requested at the start of `animate()`.
- Camera, material, scene-render and post-render work occurs after that request.
- No frame-level try/catch or result boundary exists.
- No loop state or callback lease can be retired after failure.
- No retry budget, backoff or repeated-fault deduplication exists.
- No safe visible failure surface or explicit restart result exists.
- Syntax checks cannot prove runtime fault behavior.

No production fault loop was reproduced.

## Required authority

`the-unmapped-house-runtime-frame-fault-containment-backoff-authority-domain`

```txt
FrameAttemptCommand
  -> execute named phases against accepted generations
  -> publish FrameAttemptResult

FrameFaultSettlementCommand
  -> classify, deduplicate and budget retries
  -> back off or retire exactly once
  -> publish FrameFaultSettlementResult

FrameRecoveryCommand
  -> replace or resume resources
  -> publish FrameRecoveryResult
  -> publish FirstRecoveredFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story content, rendering, interaction, persistence, tests, workflows and deployment did not change. No browser or deployed-origin fault fixture was run.