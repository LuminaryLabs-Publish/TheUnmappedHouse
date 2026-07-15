# Current audit: The Unmapped House story audio event projection

**Timestamp:** `2026-07-15T12-59-24-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-audio-event-projection-authority-audited`  
**Branch:** `main`

## Summary

The story runtime accepts inspections, grants clues, opens interludes, advances scenes and reaches terminal completion. DOM and Three.js surfaces project those results visually, but the repository contains no owned browser-audio context, semantic cue registry, ambience lifecycle, preferences, deduplication or audible-result evidence.

## Plan ledger

**Goal:** require one semantic audio projection result for each accepted story revision while keeping story truth independent of the audio adapter.

- [x] Compare all Publish repositories and central ledgers.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect shell, story runtime, story descriptors, StageKit, package and retained audit state.
- [x] Identify the interaction loop, domains, all 24 implemented kits and all offered services.
- [x] Define capability, unlock, cue, ambience, preference, lifecycle and proof surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and execute browser-audio fixtures.

## Complete interaction loop

```txt
boot
  -> restore local story state
  -> resolve current scene
  -> create Three.js stage and hotspot volumes
  -> render scene title text hotspot buttons and Notebook
  -> begin recursive visual RAF

inspection
  -> DOM or canvas input resolves hotspot
  -> inspectHotspot accepts first or repeated inspection
  -> mutate inspected clues text and log
  -> render and persist accepted state
  -> no semantic audio event or cue result

completion and route
  -> schedule and open interlude
  -> Continue advances scene or terminal copy
  -> load successor visible stage when present
  -> no transition ambience or terminal audio result
```

## Domains in use

```txt
static browser shell and document lifecycle
story state scenes clues inspections route interlude and terminal state
DOM keyboard pointer and canvas interaction
localStorage persistence
fixed-aspect viewport and semantic UI projection
Three.js scene camera materials shaders raycasting and WebGL rendering
post-processing and camera parallax
browser audio capability and user-gesture admission
semantic story audio events and cue descriptors
inspection clue interlude terminal UI and ambience projection
listener/source transforms buses preferences dedupe pooling and voice budgets
audio lifecycle settlement and audiovisual proof
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
planned story-audio surfaces: 22
```

## Main findings

- No `AudioContext`, `Audio`, `<audio>` element or audio node owner is present in the active shell and runtime.
- No stable semantic audio event ID or cue descriptor registry exists.
- Inspection, clue, interlude, scene and terminal results have no audio projection adapter.
- No scene ambience generation or listener/source revision exists.
- No master/category volume, mute state or persistence exists.
- No duplicate, stale or superseded cue rejection exists.
- No visibility, pagehide or route audio settlement exists.
- No `FirstAudibleCueAck` or `FirstAudioVisualConvergenceAck` exists.

## Required authority

```txt
the-unmapped-house-story-audio-event-projection-authority-domain
```

```txt
AudioProjectionAdmissionCommand
  -> bind document runtime story scene and audio-policy revisions
  -> observe browser capability and accepted user-gesture unlock
  -> consume accepted semantic story results
  -> resolve stable cues and scene ambience
  -> reject stale duplicate muted and superseded work
  -> enforce buses preferences pooling priority and voice budgets
  -> settle visibility pagehide route and audio-generation lifecycle
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, persistence, rendering, audio behavior, dependencies, scripts, workflow and deployment did not change. No executable audio, browser-artifact or Pages fixture was run.