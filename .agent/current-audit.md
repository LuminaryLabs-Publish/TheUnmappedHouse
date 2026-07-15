# Current audit: The Unmapped House motion preference and visual-effect admission

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `motion-preference-visual-effect-admission-authority-audited`  
**Branch:** `main`

## Summary

The application always projects its complete animated presentation. `StageKit` starts an autonomous RAF, advances procedural shader time, drives animated post-processing and applies pointer parallax. The interlude adds a 550 ms opacity transition. No browser or product preference selects a reduced-motion alternative.

## Plan ledger

**Goal:** require one revisioned motion profile to govern every continuous or transitional visual-motion participant.

- [x] Compare all Publish repositories and central ledgers.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect shell, story runtime, renderer, shaders, CSS, package and deployment.
- [x] Identify the interaction loop, domains, all kits and all offered services.
- [x] Define motion-profile identities, policies, results and visible-frame proof.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and execute reduced-motion fixtures.

## Complete interaction loop

```txt
boot
  -> restore story state
  -> construct StageKit and THREE.Clock
  -> start one recursive requestAnimationFrame loop
  -> load scene camera, materials, hotspots and post descriptors

every frame
  -> read elapsed clock time
  -> animate stage material noise
  -> animate post warp, grain and scan lines
  -> apply pointer-derived camera parallax
  -> render the scene into the offscreen target
  -> render the animated post-process pass to the canvas

scene completion
  -> open the interlude
  -> animate opacity for 550 ms
  -> continue into the next scene

motion preference
  -> no explicit setting exists
  -> no prefers-reduced-motion query exists
  -> no system-preference change listener exists
  -> full shader, parallax and transition motion remains active
```

## Domains in use

```txt
static browser shell and document lifecycle
browser accessibility and user motion preference
explicit settings and localStorage persistence
system prefers-reduced-motion observation
story state, clues, inspections, route and interlude
keyboard, pointer, canvas and DOM interaction
fixed-aspect viewport
Three.js scene, camera, shaders and WebGL rendering
procedural material-time animation
post-process warp, grain, scan-line and chromatic effects
pointer-driven camera parallax
CSS transition timing
motion-profile admission, replacement and stale-result rejection
first preference-matched visible-frame evidence
syntax validation, static artifact and Pages deployment
repo-local and central audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude.
- `aspect-frame-kit`: fixed design aspect, window-fit calculation, DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials, post descriptors.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, continue, reset, UI projection, persistence calls.
- `scene-route-kit`: scene ID resolution, authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected hotspot state.
- `clue-ledger-kit`: clue grant, clue query.
- `notebook-log-kit`: prepend narrative log, bounded retention.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: prototype-complete DOM projection.
- `localstorage-save-kit`: parse, shallow merge, replace, delete save.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, offscreen target, callbacks, recursive RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot and post configuration.
- `anime-material-kit`: procedural shader materials, elapsed-time animation.
- `post-process-kit`: animated grain, vignette, chromatic shift, distortion and scan lines.
- `hotspot-volume-kit`: invisible raycast volumes, descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast and hotspot dispatch.
- `camera-parallax-kit`: pointer-driven fixed-camera offsets.
- `render-target-composition-kit`: offscreen stage pass, post pass and target sizing.
- `debug-json-projection-kit`: story-field serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped audit records.
- `central-ledger-sync-kit`: central selection mirror and findings history.

```txt
implemented kits: 24
planned motion-preference surfaces: 21
```

## Main findings

- `StageKit` constructs `THREE.Clock` and immediately starts one recursive RAF.
- Every frame writes elapsed time into all active stage materials and the post material.
- Stage shader noise drifts with time.
- Post-processing animates horizontal warp, grain and scan lines with time.
- Pointer movement offsets the fixed camera every rendered frame.
- The interlude uses a 550 ms opacity transition.
- No `prefers-reduced-motion` query or media rule exists.
- No explicit or persisted motion setting exists.
- No participant registry proves that all motion surfaces adopted the same profile.
- No first frame acknowledgement binds visible presentation to the accepted preference.

## Required authority

```txt
the-unmapped-house-motion-preference-visual-effect-admission-authority-domain
```

```txt
MotionPreferenceAdmissionCommand
  -> bind document, story, scene, renderer and preference revisions
  -> resolve an explicit user setting or the current system preference
  -> classify FullMotion or ReducedMotion
  -> prepare shader-time, post-process, parallax and transition candidates
  -> preserve all story, hotspot and route semantics
  -> reject stale, duplicate and superseded profile work
  -> atomically adopt one coherent motion profile
  -> publish MotionPreferenceAdmissionResult
  -> render the accepted profile
  -> publish FirstMotionMatchedFrameAck

system preference changes
  -> issue a new command generation
  -> retire the predecessor profile
  -> adopt the replacement without duplicating RAF or listeners
  -> preserve the current story and scene revisions
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, persistence, rendering, dependencies, scripts, workflow and deployment did not change. No executable browser, motion-preference or Pages fixture was run.
