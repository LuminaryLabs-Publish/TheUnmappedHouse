# Current audit: The Unmapped House interlude focus and route admission

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `interlude-focus-route-admission-authority-audited`  
**Branch:** `main`

## Summary

The interlude is visually hidden or shown, but visual state is not the authority for keyboard focus or route progression. The hidden Continue button remains focusable, `nextScene()` lacks a completion guard, and background hotspot controls remain active while the overlay is open.

## Plan ledger

**Goal:** require one accepted modal and route transaction before any scene advancement or background interaction.

- [x] Compare all Publish repositories and central ledgers.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect HTML, CSS, story runtime, scene data and stage interaction.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Define result types and visible/focus proof.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and run focus/route fixtures.

## Complete interaction loop

```txt
boot
  -> load state and current scene
  -> construct stage and render UI
  -> visually hide interlude with opacity and pointer-events
  -> leave Continue in sequential focus order

inspection
  -> canvas or hotspot button calls inspectHotspot
  -> mutate inspected/clues/log
  -> save state
  -> schedule interlude after completion

continue
  -> any Continue click calls nextScene
  -> no active-interlude or scene-complete assertion
  -> route, stage and save advance

open overlay
  -> pointer input is blocked by overlay
  -> keyboard focus can remain on background controls
  -> no modal owner, inert background or focus transfer result exists
```

## Domains in use

```txt
browser shell and document semantics
keyboard, focus, pointer and canvas input
modal and background command admission
story state, clues, inspections, route and Notebook
interlude timing and terminal presentation
localStorage persistence and reset
fixed-aspect viewport
Three.js stage, shaders and post-processing
hotspot raycasting and camera parallax
accessibility semantics and focus restoration
visible-frame proof
validation, Pages deployment and audit governance
```

## Implemented kits and services

```txt
static-page-shell-kit: stage, panel, hotspot list, Notebook, hover label, interlude
aspect-frame-kit: fixed aspect, window fit, DOM placement
story-data-kit: scenes, hotspots, clues, completion, camera, materials, post
browser-story-runtime-kit: boot, inspection, continue, reset, UI, persistence calls
scene-route-kit: scene resolution and authored advancement
inspection-ledger-kit: inspected state
clue-ledger-kit: clue grant/query
notebook-log-kit: bounded narrative history
interlude-timer-kit: delayed interlude
terminal-route-kit: prototype-complete projection
localstorage-save-kit: parse, merge, write, delete
stage-render-kit: renderer, scene, camera, lights, target, callbacks, RAF
scene-descriptor-consumer-kit: camera, geometry, materials, hotspots, post
anime-material-kit: procedural shaders and time
post-process-kit: grain, vignette, chromatic, distortion, scan lines
hotspot-volume-kit: raycast volumes and descriptors
hotspot-picking-kit: coordinates, raycast, dispatch
camera-parallax-kit: pointer camera offsets
render-target-composition-kit: offscreen and post passes
debug-json-projection-kit: story and Notebook projection
package-syntax-check-kit: syntax checks
static-pages-deploy-kit: static Pages delivery
repo-local-agent-ledger-kit: root and timestamped audit state
central-ledger-sync-kit: central selection and findings mirror
```

```txt
implemented kits: 24
planned focus/route surfaces: 20
```

## Main findings

- Hidden Continue is excluded from pointer input but not keyboard focus.
- `nextScene()` does not validate `sceneComplete(currentScene)`.
- Hidden keyboard activation can bypass all required clues.
- The open interlude has no dialog role or `aria-modal` state.
- Background hotspot buttons are not inert while the overlay is open.
- Focus is not moved to Continue or restored after route advancement.
- Global reset remains admitted without modal policy.
- No command identity, rejection result or focus-stable frame acknowledgement exists.
- Validation is syntax-only.

## Required authority

```txt
the-unmapped-house-interlude-focus-route-admission-authority-domain
```

```txt
InterludeOpenCommand
  -> require accepted scene-completion evidence
  -> bind story, scene, route and focus revisions
  -> atomically admit semantic modal state and inert background
  -> transfer focus and publish InterludeOpenResult

InterludeContinueCommand
  -> require matching active interlude and completed scene
  -> reject hidden, premature, stale or duplicate activation
  -> atomically adopt successor route, stage and focus
  -> publish InterludeContinueResult
  -> publish FirstFocusStableSceneFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, persistence, rendering, dependencies, scripts, workflows and deployment did not change. No browser or accessibility fixture was executed.