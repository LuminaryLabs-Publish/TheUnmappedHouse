# Current audit: The Unmapped House inspection control focus continuity

**Timestamp:** `2026-07-15T08-28-25-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `inspection-control-focus-continuity-authority-audited`  
**Branch:** `main`

## Summary

The DOM inspection path deletes its own active control. `renderUi()` clears `#hotspot-list` and creates new buttons after every first-time or repeated inspection. The story state and visible labels update, but keyboard focus is not represented, retained, transferred or acknowledged.

## Plan ledger

**Goal:** require stable control identity and explicit focus settlement for every accepted inspection projection.

- [x] Compare all Publish repositories and central ledgers.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect shell, story runtime, stage input, package and retained audit state.
- [x] Identify the interaction loop, domains, all 24 kits and all offered services.
- [x] Define stable control identity, keyed projection, typed results and focus-frame proof.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and execute keyboard-focus fixtures.

## Complete interaction loop

```txt
boot
  -> load local story state
  -> resolve current scene
  -> create Three.js stage and hotspot volumes
  -> render scene title text hotspot buttons and Notebook

DOM inspection
  -> focus hotspot button
  -> click from Enter Space or pointer
  -> inspectHotspot updates inspected clues text and log
  -> renderUi clears hotspotList.textContent
  -> focused button is disconnected
  -> all scene buttons are recreated
  -> save state

canvas inspection
  -> raycast resolves hotspot
  -> same inspectHotspot and renderUi path

scene completion
  -> delayed interlude opens
  -> Continue advances scene
  -> StageKit loads successor scene
  -> all hotspot controls are rebuilt again
```

## Domains in use

```txt
static browser shell and document lifecycle
story state scenes clues inspections route and interlude
DOM keyboard pointer and canvas interaction
stable semantic control identity
keyed control projection and list revision
focus capture retention transfer and fallback
accessibility status and focus evidence
localStorage persistence
fixed-aspect viewport
Three.js scene camera materials shaders raycasting and WebGL rendering
post-processing and camera parallax
syntax validation static artifact and Pages deployment
repo-local and central audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label and interlude.
- `aspect-frame-kit`: fixed design aspect, window-fit calculation and DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials and post descriptors.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, continue, reset, UI projection and persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected hotspot state.
- `clue-ledger-kit`: clue grant and clue query.
- `notebook-log-kit`: prepend narrative log and bounded retention.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: prototype-complete DOM projection.
- `localstorage-save-kit`: parse, shallow merge, replace and delete save.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot and post configuration.
- `anime-material-kit`: procedural shader materials and elapsed-time animation.
- `post-process-kit`: animated grain, vignette, chromatic shift, distortion and scan lines.
- `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
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
planned inspection-control surfaces: 20
```

## Main findings

- `#hotspot-list` is one generic container with no control-list revision.
- Every `renderUi()` call sets `hotspotList.textContent = ""`.
- Every scene hotspot then receives a newly created button node.
- First-time inspections call `renderUi()` after state mutation.
- Repeated inspections also call `renderUi()`.
- Keyboard activation therefore removes the active element during its own command.
- Hotspot descriptor IDs are stable but are not used as stable DOM identities.
- No focus capture, retention, fallback or scene-transfer policy exists.
- No typed projection result or first focus-stable UI frame acknowledgement exists.

## Required authority

```txt
the-unmapped-house-inspection-control-focus-continuity-authority-domain
```

```txt
InspectionControlProjectionCommand
  -> bind document scene inspection and control-list revisions
  -> resolve stable HotspotControlId values
  -> prepare keyed control state and labels
  -> capture active control and activation origin
  -> commit story and control revisions together
  -> retain focus on a surviving control
  -> transfer focus through an authored fallback when retired
  -> reject stale duplicate and superseded projections
  -> publish InspectionControlProjectionResult
  -> publish FirstFocusStableInspectionFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, persistence, rendering, dependencies, scripts, workflow and deployment did not change. No executable keyboard, browser-artifact or Pages fixture was run.