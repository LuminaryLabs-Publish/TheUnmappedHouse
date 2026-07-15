# Project breakdown: inspection control identity and focus continuity

**Timestamp:** `2026-07-15T08-28-25-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `inspection-control-focus-continuity-authority-audited`

## Summary

TheUnmappedHouse is a three-scene fixed-camera point-and-click story with nine authored hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage. The active audit isolates keyboard focus continuity: every inspection clears and recreates the complete hotspot button list, including the control that dispatched the accepted action.

## Plan ledger

**Goal:** preserve one stable inspection-control generation so keyboard focus follows the accepted hotspot result instead of falling out of the rebuilt control list.

- [x] Compare all 11 accessible Publish repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Trace DOM and canvas inspection paths, list reconstruction, scene transition and focus ownership.
- [x] Identify the complete interaction loop, domains, all 24 implemented kits and all offered services.
- [x] Define 20 inspection-control and focus-continuity authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, HTML, CSS, story, persistence and deployment unchanged.
- [ ] Implement keyed control projection and execute keyboard, browser-artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

TheUnmappedHouse   2026-07-15T02-59-31-04-00  selected
PhantomCommand     2026-07-15T03-24-35-04-00
AetherVale         2026-07-15T03-41-50-04-00
TheLongHaul        2026-07-15T04-40-29-04-00
MyCozyIsland       2026-07-15T05-00-28-04-00
IntoTheMeadow      2026-07-15T06-01-26-04-00
PrehistoricRush    2026-07-15T06-39-22-04-00
HorrorCorridor     2026-07-15T07-00-28-04-00
TheOpenAbove       2026-07-15T07-39-52-04-00
ZombieOrchard      2026-07-15T08-09-51-04-00
```

## Complete interaction loop

```txt
boot
  -> restore story state
  -> resolve current scene
  -> construct StageKit and scene presentation
  -> render scene title text hotspot controls and Notebook

DOM keyboard inspection
  -> focus one hotspot button
  -> Enter or Space dispatches click
  -> inspectHotspot mutates inspected clues text and log
  -> renderUi clears hotspotList.textContent
  -> focused button is removed
  -> all hotspot buttons are recreated with new DOM identity
  -> save state

canvas inspection
  -> raycast resolves a hotspot
  -> same inspectHotspot mutation path
  -> same complete DOM list replacement

scene completion
  -> delayed interlude
  -> Continue advances scene
  -> load new stage and rebuild all inspection controls
```

## Domains in use

```txt
static document and browser lifecycle
story descriptors scenes clues inspections route and interlude
DOM and canvas interaction
keyboard activation and focus management
stable control identity and keyed projection
focus capture restoration and fallback
localStorage persistence
fixed-aspect viewport
Three.js scene camera shaders raycasting and WebGL rendering
post-processing and camera parallax
semantic status and accessibility projection
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

## Main finding

`renderUi()` assigns `hotspotList.textContent = ""` and creates new button elements for every hotspot. Both first-time and repeated inspections call `renderUi()` from the button click path. The activated control is therefore removed while it owns focus, and no stable control ID, keyed reconciliation, focus capture, restore target or first focus-stable UI acknowledgement exists.

## Required authority

```txt
the-unmapped-house-inspection-control-focus-continuity-authority-domain
```

```txt
InspectionControlProjectionCommand
  -> bind document scene inspection and control-list revisions
  -> resolve stable HotspotControlId values
  -> prepare keyed control state without replacing unchanged nodes
  -> capture the active control and activation origin
  -> commit inspection state and control projection together
  -> restore focus to the accepted control or an authored fallback
  -> reject stale duplicate and superseded projections
  -> publish InspectionControlProjectionResult
  -> publish FirstFocusStableInspectionFrameAck

scene replacement
  -> retire removed controls explicitly
  -> transfer focus to the first eligible hotspot or scene heading
  -> preserve interlude focus authority independently
```

## Validation boundary

Documentation only. No runtime, HTML, CSS, story, persistence, rendering, package, workflow or deployment behavior changed. No executable keyboard or Pages fixture was run.