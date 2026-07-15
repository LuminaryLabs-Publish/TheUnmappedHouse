# Project breakdown: The Unmapped House motion preference and visual-effect admission

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `motion-preference-visual-effect-admission-authority-audited`

## Summary

TheUnmappedHouse is a static browser point-and-click horror prototype. Story truth is stored in one mutable browser aggregate, scene content is descriptor-driven, interaction is available through DOM buttons and WebGL hotspot raycasts, and presentation is a continuous Three.js render loop with procedural shaders and post-processing.

The current breakdown finds no motion-preference boundary. Full shader, post-process, camera and transition motion is always projected.

## Plan ledger

**Goal:** document the complete product and define a minimal authority for coherent full-motion or reduced-motion presentation.

- [x] Compare the full Publish inventory with central tracking.
- [x] Select only TheUnmappedHouse.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify every implemented kit.
- [x] Identify every offered kit service.
- [x] Trace all continuous and transitional motion.
- [x] Define the future motion-preference domain and result flow.
- [x] Record validation limits.
- [x] Reconcile the central ledger.

## Repository selection

```txt
TheUnmappedHouse   2026-07-14T22-01-31-04-00  selected
AetherVale         2026-07-14T23-00-09-04-00
PhantomCommand     2026-07-14T23-38-29-04-00
PrehistoricRush    2026-07-15T00-00-35-04-00
TheLongHaul        2026-07-15T00-38-54-04-00
MyCozyIsland       2026-07-15T01-04-57-04-00
IntoTheMeadow      2026-07-15T01-39-38-04-00
HorrorCorridor     2026-07-15T02-00-17-04-00
TheOpenAbove       2026-07-15T02-09-29-04-00
ZombieOrchard      2026-07-15T02-38-45-04-00
```

No eligible repository was new, ledger-missing, root-agent-missing or runtime-ahead. TheUnmappedHouse had the oldest synchronized central timestamp.

## Interaction loop

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

## Implemented kits and offered services

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
implemented source-backed kits: 24
```

## Motion-specific finding

```txt
StageKit
  -> creates THREE.Clock
  -> starts recursive RAF
  -> updates all stage material time uniforms
  -> updates post-process time
  -> applies pointer-driven camera parallax
  -> renders two passes

post shader
  -> time-driven horizontal warp
  -> time-driven grain
  -> time-driven scan lines

CSS
  -> interlude opacity transition: 0.55 seconds

preference authority
  -> explicit setting: absent
  -> prefers-reduced-motion query: absent
  -> media-query listener: absent
  -> participant adoption result: absent
  -> first matching frame acknowledgement: absent
```

## Required DSK/domain

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

## Candidate authority surfaces

- `the-unmapped-house-motion-preference-visual-effect-admission-authority-domain`
- `motion-preference-query-kit`
- `motion-profile-descriptor-kit`
- `motion-profile-revision-kit`
- `motion-admission-command-envelope-kit`
- `explicit-motion-setting-kit`
- `system-motion-preference-listener-kit`
- `stage-shader-motion-policy-kit`
- `post-process-motion-policy-kit`
- `camera-parallax-motion-policy-kit`
- `interlude-transition-motion-policy-kit`
- `active-motion-participant-registry-kit`
- `motion-profile-candidate-preparation-kit`
- `motion-profile-atomic-adoption-kit`
- `stale-motion-profile-rejection-kit`
- `motion-profile-projection-result-kit`
- `first-motion-matched-frame-ack-kit`
- `motion-preference-persistence-kit`
- `motion-observation-diagnostics-kit`
- `reduced-motion-browser-fixture-kit`
- `artifact-pages-motion-parity-kit`

```txt
planned motion-preference surfaces: 21
```

## Validation boundary

This run changes documentation only. It does not implement reduced motion, alter runtime behavior, run browser fixtures or prove Pages parity.
