# Current audit: The Unmapped House browser startup readiness authority

**Timestamp:** `2026-07-15T23-00-03-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `browser-startup-readiness-failure-authority-audited`  
**Branch:** `main`

## Summary

The document renders an initial `Loading` title and then depends on a static module graph, an external Three.js provider, WebGL resource construction, story restoration, first-scene construction, DOM projection, and recursive RAF. These phases publish no product-level readiness or failure result. A provider, policy, graphics, shader, render-target, descriptor, or first-frame failure can leave the shell indefinitely non-interactive with no fallback or retry.

## Plan ledger

**Goal:** require one terminal startup result and one first-frame acknowledgement for every document generation.

- [x] Compare all Publish repositories, ledgers, and current heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect shell, runtime, story data, StageKit, package, and retained audit state.
- [x] Identify the full interaction loop, domains, all 24 kits, and offered services.
- [x] Trace startup before module execution through first public frame.
- [x] Define attempt, phase, deadline, failure, fallback, retry, retirement, and proof surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and execute browser startup fixtures.

## Complete interaction loop

```txt
page parse
  -> fixed aspect shell mounts
  -> scene title reads Loading
  -> browser requests src/game.js

module graph
  -> game.js imports StageKit and story data
  -> StageKit imports Three.js 0.160.0 from unpkg

startup construction
  -> load localStorage state
  -> resolve current scene
  -> construct StageKit and WebGLRenderer
  -> allocate scene camera lights render target and shader resources
  -> consume the first scene descriptor
  -> create stage geometry materials and hotspot volumes
  -> project title text buttons and Notebook
  -> save current state
  -> enter recursive RAF and present stage/post passes

story loop
  -> DOM or canvas inspection
  -> clue and log mutation
  -> interlude and Continue
  -> scene transition and save
```

## Domains in use

```txt
static browser shell and document lifecycle
ES module graph and external provider resolution
browser graphics capability and WebGL construction
story state scenes clues inspections route interlude terminal and save
DOM keyboard pointer canvas focus and semantic projection
fixed-aspect viewport
Three.js scene camera lights geometry materials shaders raycasting render targets and RAF
startup attempt phase deadline failure fallback retry retirement and first-frame proof
syntax validation static artifact Pages deployment and audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude, initial Loading copy.
- `aspect-frame-kit`: fixed design aspect, window-fit calculation, DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials, post descriptors.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, continue, reset, UI projection, persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected state.
- `clue-ledger-kit`: clue grant and query.
- `notebook-log-kit`: prepend log and bounded retention.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: prototype-complete projection.
- `localstorage-save-kit`: parse, shallow merge, whole-slot replacement, delete.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, target, callbacks, RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, materials, hotspots, fog, post configuration.
- `anime-material-kit`: procedural shader materials and elapsed-time animation.
- `post-process-kit`: grain, vignette, chromatic shift, distortion, scan lines.
- `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast, dispatch.
- `camera-parallax-kit`: pointer-driven camera offsets.
- `render-target-composition-kit`: offscreen stage pass, post pass, target sizing.
- `debug-json-projection-kit`: story serialization and Notebook projection.
- `package-syntax-check-kit`: syntax checks for four modules.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped audit records.
- `central-ledger-sync-kit`: central selection mirror and findings history.

```txt
implemented kits: 24
planned startup authority surfaces: 20
```

## Main findings

- The shell has only a pending-looking `Loading` state.
- Static import rejection can prevent all runtime error handling from running.
- The external Three.js provider has no shell-owned admission result.
- WebGLRenderer, render target, shaders, and first scene are constructed without a startup transaction.
- No startup deadline distinguishes slow from failed.
- No failure taxonomy distinguishes provider, policy, graphics, story, scene, or first-frame failures.
- No semantic fallback or Retry action exists.
- No attempt/generation identity rejects late work from a superseded retry.
- No `FirstReadyUiAck` or `FirstPresentedStoryFrameAck` exists.
- Syntax checks do not prove browser startup or deployed readiness.

## Required authority

`the-unmapped-house-browser-startup-readiness-failure-authority-domain`

```txt
StartupAttemptCommand
  -> bind document module provider capability story stage and render generations
  -> publish monotonic phases
  -> enforce a deadline
  -> prepare story scene UI and renderer candidates
  -> publish typed terminal result
  -> project fallback and Retry when recoverable
  -> reject stale duplicate and superseded attempts
  -> retire failed resources
  -> publish FirstReadyUiAck
  -> publish FirstPresentedStoryFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, provider URL, rendering, persistence, dependencies, scripts, workflows, and deployment did not change. No browser, failure-injection, artifact, or Pages fixture was run.