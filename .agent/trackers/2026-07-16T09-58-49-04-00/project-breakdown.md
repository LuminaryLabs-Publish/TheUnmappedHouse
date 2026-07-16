# Project breakdown: The Unmapped House hotspot availability and discovery projection

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit documentation head:** `a90e7e4fa7da0ecfe0863236608d0a397a9dad7d`  
**Status:** `hotspot-availability-discovery-projection-authority-audited`

## Summary

TheUnmappedHouse is a three-scene fixed-camera point-and-click prototype. Every authored hotspot is simultaneously projected as a DOM button and installed as an invisible Three.js raycast volume. Neither surface consumes a shared availability result. The list exposes every hotspot label immediately, the raycaster intersects hotspot volumes without testing scene occlusion, and scene transitions do not explicitly retire the prior hover result.

The current nine hotspots are intentionally simple and no player-facing defect was reproduced. The gap becomes material as soon as content needs hidden, conditional, occluded, disabled, modal-suspended, or newly discovered interactions.

## Plan ledger

**Goal:** make hotspot availability one authoritative, revision-bound result consumed consistently by the DOM list, canvas hover, canvas click, focus, modal state, and visible frame.

- [x] Compare the complete 11-repository Publish inventory with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the full interaction loop, active domains, 24 implemented kits, and all offered services.
- [x] Trace authored hotspot creation, DOM listing, hover, picking, inspection, scene transition, and interlude state.
- [x] Define one parent authority and 17 coordinating surfaces.
- [x] Add timestamped architecture, render, gameplay, interaction, hotspot-availability, deploy, central-sync, and turn-ledger records.
- [x] Keep runtime, authored content, rendering, persistence, package scripts, and deployment unchanged.
- [ ] Implement and execute source, browser, artifact, and Pages parity fixtures.

## Interaction loop

```txt
page boot
  -> restore story state
  -> resolve current scene
  -> StageKit creates one invisible volume per scene hotspot
  -> renderUi creates one DOM button per scene hotspot

canvas path
  -> mousemove updates pointer coordinates
  -> raycaster intersects only hotspot volumes
  -> hover label projects the selected authored label
  -> click reuses the current pointer and dispatches the hit hotspot

DOM path
  -> every current-scene hotspot is listed immediately
  -> button dispatches the same inspectHotspot function

inspection
  -> mark inspected by scene ID and hotspot ID
  -> grant clue strings
  -> update story copy, Notebook, buttons, and save
  -> open interlude after completion delay

progression
  -> Continue selects the next scene
  -> StageKit clears and recreates hotspot volumes
  -> DOM list is rebuilt
  -> prior hover state has no explicit retirement result
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport
story content and scene descriptors
story state, clues, inspections, route, interlude, terminal and persistence
DOM controls, focus, keyboard, pointer, hover and canvas picking
Three.js camera, scene, geometry, materials, shaders, raycasting, targets and RAF
hotspot availability, discovery, visibility, occlusion, modal suspension and projection parity
syntax validation, static artifact, Pages delivery and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label, interlude, initial Loading copy |
| `aspect-frame-kit` | Fixed design aspect, window-fit calculation, DOM frame placement |
| `story-data-kit` | Scene descriptors, hotspots, clue grants, completion rules, camera, materials, post descriptors |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, Continue, reset, UI projection, persistence calls |
| `scene-route-kit` | Scene ID resolution, authored-order advancement |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state |
| `clue-ledger-kit` | Clue grant and query |
| `notebook-log-kit` | Narrative log prepend and bounded retention |
| `interlude-timer-kit` | Delayed completion interlude |
| `terminal-route-kit` | Prototype-complete DOM projection |
| `localstorage-save-kit` | Parse, shallow merge, whole-slot replacement, delete |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks, recursive RAF |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot, fog and post configuration |
| `anime-material-kit` | Procedural shader materials and elapsed-time animation |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment |
| `hotspot-picking-kit` | Coordinate normalization, raycast and hotspot dispatch |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | Offscreen stage pass, post pass and target sizing |
| `debug-json-projection-kit` | Story-field serialization and Notebook projection |
| `package-syntax-check-kit` | Node syntax checks for four source modules |
| `static-pages-deploy-kit` | Static Pages delivery |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records |
| `central-ledger-sync-kit` | Central selection mirror and findings history |

```txt
implemented source-backed kits: 24
planned hotspot-availability surfaces: 18
```

## Source-backed findings

1. `renderUi()` iterates `currentScene.hotspots` directly and creates an enabled button for every record. There is no discovery, clue, visibility, modal, or policy filter.
2. `StageKit.loadScene()` creates an invisible volume for every current-scene hotspot.
3. `pick()` raycasts only `this.hotspots`; visible scene meshes do not participate in occlusion or nearest-visible-target admission.
4. DOM and canvas interactions converge only at `inspectHotspot()`. They do not share a typed availability snapshot or projection revision.
5. `loadScene()` resets the hotspot array but does not explicitly clear `hovered` or hide the previous hover label, so stale hover evidence can survive until another pointer move.
6. The package check is syntax-only and proves none of the listed/pickable/visible parity rules.

## Required authority

`the-unmapped-house-hotspot-availability-discovery-projection-authority-domain`

```txt
HotspotAvailabilityCommand
  -> bind content, scene, story, clue, inspection, modal, camera and frame revisions
  -> build the current scene hotspot index
  -> resolve discovery, clue, inspection and modal policy
  -> optionally resolve view-frustum and scene-occlusion evidence
  -> publish immutable HotspotAvailabilityResult entries

HotspotProjectionCommand
  -> require an accepted availability result
  -> project the same available set to DOM list, hover and click surfaces
  -> reject stale scene or frame generations
  -> retire previous hover and focus evidence on scene/modal transitions
  -> publish HotspotProjectionResult

HotspotInteractionCommand
  -> bind an available hotspot identity and input surface
  -> reject unavailable, hidden, occluded, disabled, stale or modal-suspended work
  -> publish HotspotInteractionResult
  -> publish FirstAvailableHotspotFrameAck
```

## Planned surfaces

```txt
the-unmapped-house-hotspot-availability-discovery-projection-authority-domain
hotspot-availability-policy-kit
scene-hotspot-index-kit
hotspot-discovery-state-kit
hotspot-visibility-descriptor-kit
hotspot-occlusion-query-kit
hotspot-interaction-mode-kit
hotspot-modal-suspension-kit
hotspot-list-projection-kit
hotspot-canvas-pick-admission-kit
hotspot-inspected-state-policy-kit
hotspot-clue-gate-policy-kit
hotspot-parity-result-kit
stale-hotspot-generation-rejection-kit
hotspot-hover-retirement-kit
first-available-hotspot-frame-ack-kit
first-hotspot-interaction-ack-kit
source-artifact-pages-hotspot-parity-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, story data, hotspot geometry, picking, focus behavior, save behavior, package scripts, workflows, and deployment were not changed. No browser interaction, occlusion, stale-hover, artifact, or Pages fixture was executed.