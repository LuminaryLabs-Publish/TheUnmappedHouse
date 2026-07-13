# Current audit: The Unmapped House scene-transition composition authority

**Timestamp:** `2026-07-13T09-03-20-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `scene-transition-composition-authority-audited`  
**Branch:** `main`

## Summary

This documentation-only audit isolates the missing atomic boundary between authored scene progression, Three.js stage replacement, interlude state, DOM projection and browser persistence. The current `nextScene()` path mutates participants sequentially and publishes no terminal transition result.

## Plan ledger

**Goal:** make scene advancement a typed, revisioned multi-participant transaction with zero-mutation rejection, rollback and visible-frame proof.

- [x] Compare the complete Publish inventory with the central ledger.
- [x] Confirm no higher-priority new or undocumented repository exists.
- [x] Select only `TheUnmappedHouse` by oldest documented timestamp.
- [x] Inspect `src/game.js`, `src/stage-kit.js`, `src/story-data.js` and existing `.agent` state.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define the required parent authority and participant contract.
- [x] Add timestamped architecture, render, gameplay, interaction, transition and deploy audits.
- [x] Change documentation only.
- [ ] Implement and run executable fixtures.

## Complete interaction loop

```txt
boot
  -> load or create state
  -> resolve currentScene
  -> construct StageKit
  -> loadScene(currentScene)
  -> renderUi()
  -> saveState()

inspection
  -> raycast or button selects hotspot
  -> mutate inspected, clues, text and log
  -> schedule interlude if complete
  -> renderUi()
  -> saveState()

scene advance
  -> Continue calls nextScene()
  -> resolve authored successor
  -> mutate currentScene, sceneId, route and log
  -> close interlude
  -> destructively load successor stage
  -> project successor UI
  -> persist successor state
  -> later RAF renders whichever stage survived
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, story panel, Notebook, hover label and interlude. |
| `src/game.js` | Story aggregate, inspection, route progression, interlude, UI, persistence and reset. |
| `src/stage-kit.js` | Provider import, Three.js renderer, scene resources, scene replacement, picking, parallax, post pass and RAF. |
| `src/story-data.js` | Three scene descriptors, nine hotspots, completion requirements and render descriptors. |
| `src/aspect-frame.js` | Fixed 1920x1080 viewport calculation and DOM application. |
| `package.json` | Local syntax validation and static serving. |
| `.github/workflows/deploy.yml` | Repository-root Pages deployment from `main`. |

## Domains in use

```txt
browser document and fixed aspect shell
authored story, scene, hotspot and render descriptors
inspection, clues, route and Notebook state
completion, interlude and terminal progression
browser persistence and destructive reset
DOM pointer, click, keyboard, focus and modal interaction
external module provider resolution
Three.js renderer, scene graph and GPU resources
camera, fog, shader materials and post-processing
hotspot volumes, raycast picking, hover and parallax
recursive RAF and callback lifecycle
scene-transition preparation, commit, rollback and proof
syntax checks, local serving and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed 1920x1080 frame computation and application. |
| `story-data-kit` | Three scenes, nine hotspots, clue grants, completion rules and render descriptors. |
| `browser-story-runtime-kit` | Boot, scene resolution, inspection, continue, reset, UI and persistence. |
| `scene-route-kit` | Scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and query. |
| `notebook-log-kit` | Bounded narrative log projection. |
| `interlude-timer-kit` | Delayed completion interlude scheduling. |
| `terminal-route-kit` | Prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete save data. |
| `stage-render-kit` | Renderer, scene, camera, lights, target, callbacks and RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post construction. |
| `anime-material-kit` | Procedural shader materials and time updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | Pointer normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass and post pass. |
| `debug-json-projection-kit` | Story-field serialization into the Notebook. |
| `package-syntax-check-kit` | Node syntax checks. |
| `static-pages-deploy-kit` | Static artifact upload and Pages deployment. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped records. |
| `central-ledger-sync-kit` | Central selection and findings history. |

```txt
implemented source-backed kits: 24
planned scene-transition kits: 26
```

## Concrete findings

### Story commits before stage preparation

`nextScene()` updates `currentScene`, `state.sceneId`, `state.route` and `state.log`, then closes the interlude before calling `stage.loadScene()`.

### Stage replacement destroys the predecessor first

`loadScene()` clears the current stage group and resets hotspot and material collections before validating and constructing every successor resource.

### UI and save are later participants

`renderUi()` and `saveState()` run after stage replacement. They have no preparation receipts, shared transition identity or rollback semantics.

### Storage is a late failure point

`localStorage.setItem()` is not wrapped in a typed commit result. A storage rejection can occur after story, stage and UI have adopted the successor.

### Visible adoption is anonymous

The RAF carries no transition ID, story revision, stage generation or scene-frame acknowledgement. Diagnostics serialize current story state, not a proven coherent visible frame.

## Required authority

```txt
the-unmapped-house-scene-transition-composition-authority-domain
```

```txt
SceneTransitionCommand
  -> validate predecessor and authored successor
  -> prepare detached story, stage, interlude, UI and save candidates
  -> collect participant receipts
  -> commit every participant or none
  -> publish SceneTransitionResult
  -> retire predecessor resources after adoption
  -> publish FirstSceneFrameAck
```

## Validation boundary

Documentation and machine audit state changed. Runtime JavaScript, HTML, CSS, story descriptors, provider source, WebGL behavior, persistence, package scripts, dependencies and deployment did not change. No browser or Pages transition fixture was executed.