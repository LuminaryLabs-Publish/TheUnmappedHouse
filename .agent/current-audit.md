# Current audit: The Unmapped House story content graph validation

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`  
**Branch:** `main`

## Summary

The product has a compact authored story graph but no owned admission boundary for that graph. Scene, hotspot, clue, route, camera, stage, material, post, and completion descriptors are consumed directly. A future content edit can remain syntactically valid while introducing duplicate identities, unknown clue references, impossible completion, an ambiguous route, or a malformed render descriptor.

## Plan ledger

**Goal:** make authored-content validity a deterministic prerequisite for story and stage adoption.

- [x] Compare all current Publish repositories, central ledgers, root `.agent` states, and current heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect `src/story-data.js`, `src/game.js`, `src/stage-kit.js`, `package.json`, and retained audit state.
- [x] Identify the full interaction loop, all domains, all 24 kits, and every offered service.
- [x] Trace identity, reference, route, completion, descriptor, and proof boundaries.
- [x] Define 18 story-content authority surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and run deterministic story-content fixtures.

## Complete interaction loop

```txt
page boot
  -> load localStorage snapshot
  -> find scene whose ID equals state.sceneId
  -> fall back to scenes[0] when no scene matches
  -> construct StageKit
  -> load current scene descriptor
  -> create stage layers, props and hotspot volumes
  -> render one button per current-scene hotspot

inspection
  -> key inspected state by currentScene.id and hotspot.id
  -> grant hotspot clue strings
  -> evaluate every requiresToComplete clue against state.clues
  -> render UI and replace the save slot
  -> schedule interlude when complete

progression
  -> find current scene index in scenes[]
  -> advance to scenes[index + 1]
  -> append scene ID to route
  -> load the next descriptor
  -> terminal copy when no next array entry exists
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport
authored story content and descriptor data
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, focus and semantic projection
Three.js scene, camera, lights, geometry, materials, shaders, raycasting, render targets and RAF
story content revision, schema, identity, reference, route, satisfiability and descriptor validation
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude, initial Loading copy.
- `aspect-frame-kit`: fixed design aspect, window-fit calculation, DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials, and post descriptors.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, Continue, reset, UI projection, and persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected hotspot state.
- `clue-ledger-kit`: clue grant and clue query.
- `notebook-log-kit`: prepend narrative log and bounded retention.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: prototype-complete DOM projection.
- `localstorage-save-kit`: parse, shallow merge, whole-slot replacement, and delete.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, offscreen target, callbacks, and recursive RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot, fog, and post configuration.
- `anime-material-kit`: procedural shader materials and elapsed-time animation.
- `post-process-kit`: grain, vignette, chromatic shift, distortion, and scan lines.
- `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast, and hotspot dispatch.
- `camera-parallax-kit`: pointer-driven fixed-camera offsets.
- `render-target-composition-kit`: offscreen stage pass, post pass, and target sizing.
- `debug-json-projection-kit`: story-field serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks for four source modules.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped audit records.
- `central-ledger-sync-kit`: central selection mirror and findings history.

```txt
implemented kits: 24
planned story-content authority surfaces: 18
```

## Source-backed findings

- `scenes` is exported as a plain array with no schema version or content revision.
- Scene selection trusts string IDs; fallback to the first scene does not validate or normalize the authored graph.
- Inspection state is keyed by scene ID and hotspot ID, so duplicate identities can alias separate authored objects.
- Completion trusts `requiresToComplete` and only checks whether each string exists in `state.clues`.
- No index proves that every required clue can be granted on a reachable route.
- Continue advances by array position, with no explicit route graph or terminal validation result.
- StageKit assumes camera vectors, stage collections, positions, sizes, material colors, and numeric post fields have usable shapes and values.
- `npm run check` performs syntax checks only; it cannot detect semantic content defects.
- No invalid-content fallback or `FirstValidatedStoryFrameAck` exists.

The current content is small and appears coherent by manual inspection. The gap is absence of a reusable validation authority and executable proof.

## Required authority

`the-unmapped-house-story-content-graph-validation-authority-domain`

```txt
StoryContentValidationCommand
  -> bind ContentRevision, StorySchemaVersion and ValidationPolicyVersion
  -> normalize and register scene, hotspot and clue identities
  -> validate uniqueness and reference ownership
  -> build route and clue-grant indexes
  -> prove each completion requirement is satisfiable before its transition
  -> validate camera, stage, material, post and hotspot descriptor shapes
  -> reject non-finite numeric values
  -> publish StoryContentValidationResult

StoryContentAdoptionCommand
  -> require an accepted validation result
  -> bind expected content and document generations
  -> reject stale, duplicate or invalid content
  -> expose validated indexes to story and renderer consumers
  -> publish StoryContentAdoptionResult

ValidatedStoryFrameCommand
  -> bind accepted content, story, stage and visible-frame revisions
  -> publish FirstValidatedStoryFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, authored scenes, clue values, route behavior, persistence, Three.js rendering, package scripts, workflows, and deployment did not change. No content-validator, browser, artifact, or Pages fixture was executed.
