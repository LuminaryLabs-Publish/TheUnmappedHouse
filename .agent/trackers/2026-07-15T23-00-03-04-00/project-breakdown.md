# Project breakdown: The Unmapped House browser startup readiness and failure authority

**Timestamp:** `2026-07-15T23-00-03-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `browser-startup-readiness-failure-authority-audited`

## Summary

TheUnmappedHouse is a static three-scene point-and-click horror prototype. The document initially renders `Loading`, then a module graph must fetch `game.js`, `story-data.js`, `stage-kit.js`, and Three.js from unpkg before StageKit can create WebGL resources, load the first scene, project the DOM state, and start recursive RAF rendering.

No startup attempt identity, phase model, deadline, provider failure result, WebGL capability result, stage-construction rollback, first-frame acknowledgement, visible fallback, or retry command exists. A module, CDN, CSP, WebGL, shader, render-target, scene-construction, or first-frame failure can therefore leave the public shell indefinitely showing `Loading` without an actionable result.

## Plan ledger

**Goal:** make public startup an explicit, bounded transaction that either presents the first coherent story frame or publishes a semantic failure with a safe retry path.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible ledgers and current repository heads.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Trace shell parse, module graph, external provider, WebGL construction, story boot, first-scene load, UI projection, RAF, and deployment.
- [x] Preserve all 24 implemented kits and their services.
- [x] Define one parent startup authority and 19 coordinating surfaces.
- [x] Add this timestamped audit family.
- [x] Keep runtime, story, rendering, dependencies, and deployment unchanged.
- [ ] Implement and execute source, artifact, and Pages startup-failure fixtures.

## Selection comparison

```txt
TheUnmappedHouse   2026-07-15T18-02-58-04-00 selected
PhantomCommand     2026-07-15T18-39-30-04-00
AetherVale         2026-07-15T18-58-52-04-00
TheLongHaul        2026-07-15T19-38-38-04-00
MyCozyIsland       2026-07-15T19-58-42-04-00
IntoTheMeadow      2026-07-15T20-38-13-04-00
PrehistoricRush    2026-07-15T20-59-46-04-00
HorrorCorridor     2026-07-15T21-39-15-04-00
TheOpenAbove       2026-07-15T22-00-36-04-00
ZombieOrchard      2026-07-15T22-40-29-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
HTML shell
  -> render fixed aspect frame
  -> expose scene title as Loading
  -> request module entry src/game.js

module graph
  -> load story-data.js
  -> load stage-kit.js
  -> load Three.js 0.160.0 from unpkg

runtime construction
  -> read localStorage state
  -> resolve current scene
  -> create StageKit
  -> create WebGLRenderer, scene, camera, lights, render target, shaders, listeners
  -> load authored scene geometry, materials, hotspot volumes, camera, fog, and post state
  -> project title, story text, inspection buttons, and Notebook
  -> write initial save state
  -> enter recursive RAF

active story
  -> inspect through DOM button or canvas hotspot
  -> mutate inspected, clues, text, log, route, and save
  -> show interlude and advance scenes
```

Failure path:

```txt
module/provider/WebGL/stage/first-frame failure
  -> module body may never execute or construction throws
  -> no StartupResult is published
  -> no fallback replaces Loading
  -> no retry command is available
  -> no first-frame acknowledgement exists
```

## Domains in use

```txt
static browser shell and document lifecycle
ES module graph and external provider resolution
browser graphics capability and WebGL resource construction
story descriptors, state, clues, inspections, route, interlude, and terminal state
localStorage persistence and reset
DOM, keyboard, pointer, canvas, and focus interaction
fixed-aspect viewport and semantic UI projection
Three.js scene, camera, lighting, geometry, shaders, raycasting, render targets, and RAF
browser startup attempt, readiness, failure, retry, retirement, and first-frame proof
syntax validation, static artifact, Pages deployment, repo-local audit, and central tracking
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude, initial Loading copy |
| `aspect-frame-kit` | fixed design aspect, window-fit calculation, DOM frame placement |
| `story-data-kit` | scene descriptors, hotspots, clue grants, completion rules, camera, materials, post descriptors |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, continue, reset, UI projection, persistence calls |
| `scene-route-kit` | scene ID resolution, authored-order advancement |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state |
| `clue-ledger-kit` | clue grant, clue query |
| `notebook-log-kit` | prepend narrative log, bounded retention |
| `interlude-timer-kit` | delayed completion interlude |
| `terminal-route-kit` | prototype-complete DOM projection |
| `localstorage-save-kit` | parse, shallow merge, whole-slot replacement, delete save |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks, recursive RAF |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot, fog, and post configuration |
| `anime-material-kit` | procedural shader materials, elapsed-time animation |
| `post-process-kit` | grain, vignette, chromatic shift, distortion, scan lines |
| `hotspot-volume-kit` | invisible raycast volumes, descriptor attachment |
| `hotspot-picking-kit` | coordinate normalization, raycast, hotspot dispatch |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | offscreen stage pass, post pass, target sizing |
| `debug-json-projection-kit` | story-field serialization, Notebook projection |
| `package-syntax-check-kit` | Node syntax checks for four source modules |
| `static-pages-deploy-kit` | static Pages delivery |
| `repo-local-agent-ledger-kit` | root pointers, timestamped audit records |
| `central-ledger-sync-kit` | central selection mirror, findings history |

```txt
implemented source-backed kits: 24
planned startup authority surfaces: 20
```

## Source-backed findings

- `index.html` provides `Loading` as the initial scene title and loads one module entry.
- `game.js` statically imports StageKit and story data, then constructs StageKit without a startup boundary.
- `stage-kit.js` statically imports Three.js from unpkg.
- `new THREE.WebGLRenderer`, render-target creation, shader-material creation, initial scene construction, and recursive RAF startup are not wrapped in a typed preparation/result contract.
- A static import failure prevents the `game.js` module body from executing, so runtime code cannot replace the shell with an error state.
- No startup timeout, retry control, alternate provider, degraded renderer, failure taxonomy, or first-visible-frame receipt is present.
- `npm run check` validates syntax only and cannot prove provider availability, WebGL construction, shader compilation, or first-frame presentation.

## Required authority

`the-unmapped-house-browser-startup-readiness-failure-authority-domain`

```txt
StartupAttemptCommand
  -> bind document, module graph, provider, capability, save, story, stage, and render generations
  -> publish explicit startup phases
  -> resolve and admit the provider version
  -> observe WebGL and render-target capability
  -> prepare story and first scene without exposing partial readiness
  -> enforce a startup deadline
  -> publish StartupResult with a stable failure taxonomy
  -> project a semantic fallback and retry action when startup fails
  -> reject stale, duplicate, and superseded attempts
  -> retire resources from failed attempts
  -> publish FirstReadyUiAck
  -> publish FirstPresentedStoryFrameAck
```

## Proposed authority surfaces

```txt
the-unmapped-house-browser-startup-readiness-failure-authority-domain
startup-attempt-identity-kit
startup-phase-state-kit
module-graph-load-admission-kit
external-provider-resolution-kit
provider-integrity-version-policy-kit
webgl-capability-observation-kit
stage-construction-preparation-kit
story-bootstrap-preparation-kit
first-scene-admission-kit
startup-deadline-timeout-kit
startup-failure-taxonomy-kit
startup-result-kit
startup-fallback-projection-kit
startup-retry-command-kit
stale-startup-attempt-rejection-kit
startup-resource-retirement-kit
first-ready-ui-ack-kit
first-presented-story-frame-ack-kit
source-artifact-pages-startup-fixture-kit
```

## Validation boundary

This run changes documentation only. No runtime module, HTML, CSS, story descriptor, provider URL, shader, render behavior, persistence behavior, dependency, package script, workflow, or deployment configuration is changed. No browser, artifact, or Pages startup fixture is executed.