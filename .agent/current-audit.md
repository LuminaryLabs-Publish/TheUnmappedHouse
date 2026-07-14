# Current audit: The Unmapped House page lifecycle suspension and resume

**Timestamp:** `2026-07-14T11-59-13-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `page-lifecycle-suspension-resume-authority-audited`  
**Branch:** `main`

## Summary

The browser runtime has no application-owned policy for hidden, frozen, pagehide/pageshow or BFCache-restored documents. Recursive rendering, elapsed shader time, delayed interlude timers and interaction listeners continue or resume according to ambient browser behavior rather than one typed lifecycle result.

## Plan ledger

**Goal:** suspend and restore the page as one coherent transaction while preserving story truth and proving the first matching resumed frame.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Select only `TheUnmappedHouse` under the oldest synchronized rule.
- [x] Inspect stage rendering, time, timers, listeners, storage and restoration gaps.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define the parent authority, results and proof boundary.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle, deploy and central-sync audits.
- [x] Change documentation only.
- [ ] Implement and run executable lifecycle fixtures.

## Complete interaction loop

```txt
boot
  -> load state and current scene
  -> construct renderer, target, scene, camera and listeners
  -> start recursive RAF
  -> load descriptors and render UI

active interaction
  -> pointer updates picking and parallax
  -> canvas or DOM inspection mutates story truth
  -> state saves to localStorage
  -> completion may schedule a raw 450 ms interlude timeout

suspension
  -> browser may hide, freeze or pagehide the document
  -> no event is admitted by application state
  -> no RAF lease, clock, timer or interaction receipt is published

restoration
  -> prior participants continue implicitly
  -> no persisted-page classification or resource probe runs
  -> no duplicate RAF check or listener ownership check runs
  -> no first resumed-stage frame is acknowledged
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Stage shell, story controls, Notebook, hover label and interlude. |
| `src/game.js` | Story state, completion, delayed interlude, scene advancement, save and reset. |
| `src/story-data.js` | Three scenes, nine hotspots, clue requirements and presentation descriptors. |
| `src/stage-kit.js` | Three.js renderer, target, scene graph, listeners, elapsed time, picking and recursive RAF. |
| `src/aspect-frame.js` | Fixed-aspect viewport calculation and DOM placement. |
| `package.json` | Syntax-only validation. |

## Domains in use

```txt
browser document boot and lifecycle
visibility, pagehide/pageshow, freeze, resume and BFCache
fixed-aspect viewport shell
story manifest, state, clues, inspections, route and Notebook
scene completion and delayed interlude scheduling
localStorage persistence and reset
DOM and canvas interaction
Three.js stage and post-processing
shader and post-process time
hotspot picking and camera parallax
render-submission ownership
interaction suspension and restoration admission
resource and viewport revalidation
first resumed visible-frame evidence
syntax validation and static deployment
repo-local and central tracking
```

## Implemented kits and services

```txt
static-page-shell-kit: stage, story panel, hotspot list, Notebook, hover label, interlude
aspect-frame-kit: design aspect, window fitting, DOM placement
story-data-kit: scenes, hotspots, clue grants, completion, camera, materials, post
browser-story-runtime-kit: state boot, inspection, continue, reset, UI and save calls
scene-route-kit: scene resolution and authored-order advancement
inspection-ledger-kit: scene-keyed inspected state
clue-ledger-kit: clue grant and query
notebook-log-kit: bounded narrative history
interlude-timer-kit: delayed completion interlude
terminal-route-kit: prototype-complete DOM projection
localstorage-save-kit: parse, shallow merge, write and delete
stage-render-kit: renderer, scene, camera, lights, target, callbacks and RAF
scene-descriptor-consumer-kit: camera, geometry, material, hotspot and post construction
anime-material-kit: procedural shaders and elapsed-time updates
post-process-kit: grain, vignette, chromatic shift, distortion and scan lines
hotspot-volume-kit: raycast volumes and descriptors
hotspot-picking-kit: coordinates, raycast and dispatch
camera-parallax-kit: pointer-driven camera offsets
render-target-composition-kit: offscreen and post passes
debug-json-projection-kit: story serialization and Notebook projection
package-syntax-check-kit: Node syntax checks
static-pages-deploy-kit: static Pages delivery
repo-local-agent-ledger-kit: root and timestamped audit records
central-ledger-sync-kit: central selection and findings mirror
```

```txt
implemented source-backed kits: 24
planned lifecycle coordinating surfaces: 22
```

## Main findings

- Recursive RAF has no retained request ID or render-submission lease.
- No visibility, pagehide/pageshow, freeze or resume event is admitted.
- `THREE.Clock` time has no pause, carry or rebase policy.
- Pending interlude timeouts have no identity or lifecycle checkpoint.
- BFCache restoration has no persisted classification.
- Renderer, context, target, viewport, scene and listeners are not revalidated.
- Stage-dependent interaction has no suspension state.
- No first resumed-stage frame acknowledgement exists.
- Validation is syntax-only.

## Required authority

```txt
the-unmapped-house-page-lifecycle-suspension-resume-authority-domain
```

```txt
PageLifecycleEvent
  -> bind document, lifecycle attempt and prior stage generations
  -> retire the active render lease
  -> checkpoint clock, timers, interaction and accepted story truth
  -> validate restored document and rendering participants
  -> prepare replacements only where reuse is unsafe
  -> reject stale, duplicate or superseded work
  -> atomically adopt one resumed participant set
  -> publish PageLifecycleResult
  -> resume one RAF generation with explicit time policy
  -> publish FirstResumedStageFrameAck
```

## Validation boundary

Documentation and machine audit state changed. Runtime JavaScript, HTML, CSS, story content, persistence behavior, rendering, dependencies, scripts and deployment did not change. No browser, BFCache, build or Pages lifecycle fixture was executed.