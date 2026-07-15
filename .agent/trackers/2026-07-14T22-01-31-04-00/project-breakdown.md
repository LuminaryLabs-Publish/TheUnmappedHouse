# Project breakdown: The Unmapped House story announcement semantic projection

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-announcement-semantic-projection-authority-audited`

## Summary

The complete story panel is marked `aria-live="polite"`. That region contains the scene heading, narrative text, every inspection button and the complete Notebook/debug JSON. Every `renderUi()` call clears and rebuilds the controls and replaces the JSON inside the live region, so assistive technology receives an uncontrolled mutation stream rather than one intentional story announcement.

## Plan ledger

**Goal:** separate interactive UI and debug state from one dedicated, revisioned story-announcement surface.

- [x] Compare all 11 accessible Publish repositories and ten eligible ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repository heads match their documented heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Trace boot, inspection, completion, route and terminal projection.
- [x] Identify all domains, kits and offered services.
- [x] Preserve all 24 implemented kit surfaces.
- [x] Define 20 announcement-authority surfaces.
- [x] Add this timestamped audit family.
- [ ] Implement and execute screen-reader and source/artifact/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: TheUnmappedHouse
prior central timestamp: 2026-07-14T17-00-55-04-00
selection reason: oldest synchronized central documentation timestamp
excluded: TheCavalryOfRome
```

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
implemented source-backed kits: 24
planned announcement-authority surfaces: 20
```

## Main finding

`#story-panel` owns `aria-live="polite"` and encloses the entire interactive and diagnostic subtree. `renderUi()` clears and recreates every hotspot button and replaces `#state-debug` with serialized story state. Boot, each first inspection, every re-read and each scene transition therefore produce broad accessibility-tree mutations without an authored message boundary.

Missing evidence:

```txt
dedicated role=status or equivalent region
aria-atomic and aria-relevant policy
message identity and story revision
announcement priority
deduplication and coalescing
control-tree exclusion
debug-tree exclusion
scene-arrival message
inspection and clue result message
completion and interlude message
terminal message
stale or duplicate rejection
screen-reader projection result
FirstSemanticAnnouncementAck
```

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

Documentation changed only. Runtime JavaScript, HTML, CSS, story data, persistence, rendering, package scripts, dependencies, workflow and deployment were not changed. `npm run check`, screen-reader fixtures, production-artifact smoke and Pages smoke were not run.
