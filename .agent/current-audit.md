# Current audit: The Unmapped House story announcement semantic projection

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-announcement-semantic-projection-authority-audited`  
**Branch:** `main`

## Summary

The application currently treats broad DOM mutation as story announcement. `#story-panel` is a polite live region containing controls and debug JSON, and `renderUi()` rebuilds those participants after nearly every accepted interaction.

## Plan ledger

**Goal:** require one concise semantic message per accepted story result.

- [x] Compare all Publish repositories and central ledgers.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect shell, story runtime, descriptors, renderer, CSS, package and deployment.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define result types and screen-reader proof.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and run accessibility fixtures.

## Complete interaction loop

```txt
boot
  -> load browser state and resolve the current scene
  -> construct the Three.js stage and recursive RAF
  -> render title, narrative text, hotspot buttons and Notebook JSON
  -> expose the complete story panel as aria-live="polite"

inspection
  -> canvas raycast or DOM button calls inspectHotspot
  -> mutate inspected, clues and log
  -> call renderUi
  -> clear and rebuild every hotspot button
  -> replace the complete debug JSON projection
  -> keep all mutations inside the polite live region
  -> save browser state

completion and route
  -> schedule or open the interlude
  -> continue to the next scene
  -> rebuild title, controls and debug projection again
  -> no dedicated semantic announcement result or acknowledgement exists
```

## Domains in use

```txt
static browser shell and document semantics
assistive-technology announcement and live-region policy
story state, clues, inspections, route and Notebook
scene, inspection, completion, interlude and terminal messages
keyboard, pointer, canvas and DOM interaction
browser persistence and reset
fixed-aspect viewport
Three.js stage, shaders and post-processing
hotspot raycasting and camera parallax
render-target composition and visible-frame evidence
screen-reader projection, deduplication and coalescing
syntax validation and static Pages deployment
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
- `scene-descriptor-consumer-kit`: camera construction, geometry construction, material construction, hotspot construction, post configuration.
- `anime-material-kit`: procedural shader materials, elapsed-time updates.
- `post-process-kit`: grain, vignette, chromatic shift, distortion, scan lines.
- `hotspot-volume-kit`: invisible raycast volumes, descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast, hotspot dispatch.
- `camera-parallax-kit`: pointer-driven fixed-camera offsets.
- `render-target-composition-kit`: offscreen stage pass, post pass, target sizing.
- `debug-json-projection-kit`: story-field serialization, Notebook projection.
- `package-syntax-check-kit`: Node syntax checks.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers, timestamped audit records.
- `central-ledger-sync-kit`: central selection mirror, central findings history.

```txt
implemented kits: 24
planned announcement surfaces: 20
```

## Main findings

- `aria-live="polite"` is attached to the complete `aside`.
- The region includes scene heading, narrative text, hotspot controls and debug JSON.
- `renderUi()` clears and recreates every hotspot button.
- `renderUi()` replaces the complete JSON projection.
- Boot, inspection, re-read and route changes can all trigger broad live-region mutation.
- No dedicated status node, atomic/relevant policy, message identity or coalescing exists.
- No screen-reader or Pages accessibility fixture exists.

## Required authority

```txt
the-unmapped-house-story-announcement-semantic-projection-authority-domain
```

```txt
StoryAnnouncementCommand
  -> bind StoryRevision, SceneRevision, command identity and message kind
  -> resolve one concise authored SemanticMessageDescriptor
  -> exclude interactive controls and debug JSON from live-region ownership
  -> validate priority, duplicate, stale and superseded announcements
  -> coalesce related inspection, clue and completion updates
  -> atomically publish one dedicated status-region projection
  -> publish StoryAnnouncementResult
  -> publish FirstSemanticAnnouncementAck

route and interlude transitions
  -> require accepted scene and interlude results
  -> publish one scene-arrival or terminal message
  -> preserve keyboard focus and control semantics independently
  -> expose deterministic screen-reader fixture evidence
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, persistence, rendering, dependencies, scripts, workflow and deployment did not change. No executable browser or screen-reader fixture was run.
