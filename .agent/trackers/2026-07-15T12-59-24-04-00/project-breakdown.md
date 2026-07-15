# Project breakdown: story audio event projection

**Timestamp:** `2026-07-15T12-59-24-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-audio-event-projection-authority-audited`

## Summary

TheUnmappedHouse is a three-scene fixed-camera point-and-click horror story with nine authored hotspots, clue-led progression, localStorage persistence, semantic DOM controls and a descriptor-driven Three.js stage. Accepted story state is projected visually, but the active shell and runtime contain no owned browser-audio context, semantic cue registry, ambience lifecycle, preference state or audible-result evidence.

## Plan ledger

**Goal:** define one result-driven story-audio authority that consumes accepted story revisions without moving gameplay truth into DOM handlers or the Three.js renderer.

- [x] Compare all 11 accessible Publish repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Trace boot, inspection, clue, interlude, terminal, rendering and lifecycle paths.
- [x] Identify the complete interaction loop, domains, all 24 implemented kits and their offered services.
- [x] Define 22 story-audio authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, HTML, CSS, story, persistence, rendering and deployment unchanged.
- [ ] Implement browser audio and execute unlock, cue, lifecycle, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

TheUnmappedHouse   2026-07-15T08-28-25-04-00  selected
PhantomCommand     2026-07-15T08-41-37-04-00
AetherVale         2026-07-15T09-00-08-04-00
TheLongHaul        2026-07-15T09-40-51-04-00
MyCozyIsland       2026-07-15T10-01-08-04-00
IntoTheMeadow      2026-07-15T10-40-17-04-00
PrehistoricRush    2026-07-15T10-58-45-04-00
HorrorCorridor     2026-07-15T11-39-04-04-00
TheOpenAbove       2026-07-15T12-02-38-04-00
ZombieOrchard      2026-07-15T12-39-01-04-00
```

## Complete interaction loop

```txt
boot
  -> restore local story state
  -> resolve the current scene
  -> construct StageKit and hotspot volumes
  -> render title, narrative, controls and Notebook
  -> begin recursive Three.js RAF

inspection
  -> DOM button or canvas raycast selects a hotspot
  -> inspectHotspot accepts first or repeated inspection
  -> update inspected state, clues, text and log
  -> render UI and persist state
  -> no semantic audio event or audible acknowledgement

scene completion
  -> schedule interlude
  -> show interlude text
  -> Continue advances route and loads the successor scene
  -> no transition, clue, ambience or route cue

terminal
  -> retain final interlude shell
  -> replace its text with prototype-complete copy
  -> no terminal cue or audio lifecycle settlement
```

## Domains in use

```txt
static document and browser lifecycle
story descriptors, scene route, clues, inspections, log, interlude and terminal state
DOM keyboard/pointer and canvas raycast interaction
localStorage persistence
fixed-aspect viewport and semantic UI projection
Three.js scene, camera, materials, shaders, hotspots and WebGL rendering
post-processing, camera parallax and render-target composition
browser audio capability and user-gesture admission
semantic story audio events and cue descriptors
inspection, clue, interlude, terminal, UI and ambience projection
listener/source transforms, buses, preferences, deduplication and voice budgets
audio lifecycle settlement and audiovisual proof
syntax validation, static artifact, Pages and audit governance
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

## Main finding

The active source files create DOM, localStorage and Three.js/WebGL owners, but no `AudioContext`, HTML audio element, semantic cue ID, cue registry, master/category volume, mute state, ambience owner, listener/source projection, cue deduplication, voice budget or audible acknowledgement. Accepted inspections, clue grants, interludes, route changes and terminal completion are visible-only results.

This is an architecture and evidence gap, not a reproduced browser failure. Future audio placed directly in click handlers or render callbacks would risk playing on rejected or duplicate work, bypassing browser unlock policy and surviving route or page retirement.

## Required authority

```txt
the-unmapped-house-story-audio-event-projection-authority-domain
```

```txt
AudioProjectionAdmissionCommand
  -> bind document runtime story scene and audio-policy revisions
  -> observe browser capability and accepted user-gesture unlock
  -> consume accepted semantic story results, never raw input assumptions
  -> resolve stable inspection, clue, interlude, terminal, UI and ambience cues
  -> deduplicate repeated snapshots and repeated result delivery
  -> project listener and optional source transforms
  -> enforce mute, volume, buses, pooling, priority and voice budgets
  -> suspend, resume or retire on visibility, pagehide and route replacement
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Validation boundary

Documentation only. No runtime, HTML, CSS, story, persistence, rendering, audio, package, workflow or deployment behavior changed. No browser audio fixture was run and no audible-gameplay or production-readiness claim is made.