# Current audit: The Unmapped House scene-entry narrative projection

**Timestamp:** `2026-07-16T16-58-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `scene-entry-narrative-projection-authority-audited`  
**Branch:** `main`

## Summary

The product advances scene identity, stage, title, hotspot list, route and save state without deliberately selecting the successor's opening narrative. Because `renderUi()` preserves any non-empty story paragraph, the last hotspot text from the predecessor can remain visible in the first successor frame.

## Plan ledger

**Goal:** make every accepted scene entry produce and project one explicit narrative result for the accepted scene generation.

- [x] Compare all current Publish repositories, central ledgers, root `.agent` states and documentation heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect `index.html`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/aspect-frame.js`, `package.json` and retained audit state.
- [x] Identify the full interaction loop, all active domains, all 24 kits and every offered service.
- [x] Trace opening copy, inspection copy, completion, interlude, transition and first successor frame.
- [x] Define 18 scene-entry narrative authority surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and run deterministic narrative-convergence fixtures.

## Complete interaction loop

```txt
boot
  -> load story state
  -> resolve scene
  -> load stage
  -> render title, openingText, hotspots and Notebook

inspect
  -> scene-text = hotspot.text
  -> mutate inspected and clues
  -> render and save
  -> schedule interlude when complete

Continue
  -> currentScene = successor
  -> update route and sceneId
  -> close interlude
  -> load successor stage
  -> render successor title and hotspot list
  -> preserve predecessor scene-text because it is non-empty
  -> save successor state
  -> RAF presents mixed scene semantics
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport
authored story content and descriptor data
story state, scenes, clues, inspections, route, interlude, terminal and save
scene-entry narrative policy, story-panel projection and visible-frame convergence
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js scene, camera, geometry, materials, shaders, raycasting, render targets and RAF
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label, interlude and Loading copy.
- `aspect-frame-kit`: fixed aspect, window-fit calculation and DOM frame placement.
- `story-data-kit`: scene descriptors, opening copy, hotspots, clue grants, completion, camera, materials and post.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, Continue, reset, UI and persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected state.
- `clue-ledger-kit`: clue grant and query.
- `notebook-log-kit`: bounded narrative log.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: terminal DOM copy.
- `localstorage-save-kit`: parse, shallow merge, replacement and delete.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, target, callbacks and RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot, fog and post configuration.
- `anime-material-kit`: procedural shader materials and time animation.
- `post-process-kit`: grain, vignette, chromatic shift, distortion and scan lines.
- `hotspot-volume-kit`: invisible volumes and descriptor attachment.
- `hotspot-picking-kit`: pointer normalization, raycast and dispatch.
- `camera-parallax-kit`: pointer-driven camera offsets.
- `render-target-composition-kit`: offscreen stage and post passes, target sizing.
- `debug-json-projection-kit`: story serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped records.
- `central-ledger-sync-kit`: central mirror and findings history.

```txt
implemented kits: 24
planned scene-entry narrative surfaces: 18
```

## Source-backed findings

- `inspectHotspot()` writes the selected hotspot's text directly into `scene-text`.
- A completed scene therefore normally enters its interlude with non-empty predecessor inspection copy.
- `nextScene()` adopts the successor scene and stage before `renderUi()`.
- `renderUi()` applies `currentScene.openingText` only when `scene-text` is empty or exactly `Loading`.
- The successor title and hotspot list can therefore coexist with predecessor story copy.
- A reload can display the correct opening copy because the DOM paragraph starts empty, making uninterrupted progression and reload semantically inconsistent.
- The syntax-only package check proves none of these convergence rules.

## Required authority

`the-unmapped-house-scene-entry-narrative-projection-authority-domain`

```txt
SceneEntryCommand
  -> bind content, route, story, stage, UI and save revisions
  -> select an explicit entry-copy policy
  -> publish SceneEntryNarrativeResult

SceneEntryProjectionCommand
  -> bind title, opening copy, stage and hotspot list to one scene-entry generation
  -> reject stale predecessor narrative work
  -> publish SceneEntryProjectionResult
  -> publish FirstSceneEntryFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, stage rendering, interaction behavior, persistence, package scripts, workflows and deployment did not change. No browser or deployment fixture was executed.