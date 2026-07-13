# Current audit: The Unmapped House renderer-provider admission

**Timestamp:** `2026-07-13T04-29-43-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `render-provider-admission-authority-audited`  
**Branch:** `main`

## Summary

This documentation-only audit isolates the boundary between static page boot, ES-module provider resolution, Three.js API availability, StageKit construction, story startup and the first visible rendered frame.

`src/stage-kit.js` imports Three.js directly from `https://unpkg.com/three@0.160.0/build/three.module.js`. Because `src/game.js` statically imports StageKit, the browser must fetch, parse and evaluate that remote dependency before any application boot code can run. A fetch, policy, integrity, MIME or API-contract failure can therefore leave the static `Loading` shell without a game-owned result, fallback, retry path or diagnostic projection.

## Plan ledger

**Goal:** require one approved, verified and terminal renderer-provider result before allocating stage resources or beginning story interaction.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Confirm root `.agent` coverage for all eligible repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by oldest synchronized central timestamp.
- [x] Inspect HTML boot, static imports, Three.js use, package checks and Pages deployment.
- [x] Preserve the complete interaction loop, domain list and 24-kit service map.
- [x] Define provider identities, policies, results, fallback and proof gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

TheUnmappedHouse   2026-07-13T01-49-49-04-00 selected
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-39-44-04-00
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
ZombieOrchard      2026-07-13T03-59-28-04-00
MyCozyIsland       2026-07-13T04-21-10-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` is modified in the Publish organization.

## Complete interaction loop

```txt
browser navigation
  -> parse index.html
  -> paint fixed 16:9 shell
  -> expose scene title "Loading"
  -> request src/game.js

module graph
  -> game.js imports StageKit
  -> StageKit imports Three.js 0.160.0 from unpkg
  -> browser resolves and evaluates remote provider

accepted provider
  -> create or load story state
  -> resolve current scene
  -> construct StageKit
  -> allocate renderer, scene, camera, lights, target and post pass
  -> install resize/mouse/click callbacks
  -> start recursive RAF
  -> load scene and hotspot volumes
  -> render story controls and Notebook
  -> persist initial snapshot

normal interaction
  -> mousemove updates cached pointer and parallax
  -> RAF mutates camera and renders stage/post pass
  -> canvas click or exact side-panel button inspects hotspot
  -> clues, log, completion and save update
  -> completion timer opens interlude
  -> Continue advances scene
  -> KeyR deletes save and reloads

non-accepted provider
  -> module graph rejects before game.js body
  -> no state load, StageKit, UI projection or save action
  -> no typed failure result
  -> static Loading state can remain
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Static shell, stage mount, story panel, Notebook, hover label, interlude and module entrypoint. |
| `src/game.js` | Static StageKit import, story aggregate, persistence, inspection, progression, UI and reset. |
| `src/stage-kit.js` | Remote Three.js import, renderer, scene, camera, materials, picking, parallax, post pass and RAF. |
| `src/story-data.js` | Three scenes, nine hotspots, requirements, interlude copy and render descriptors. |
| `src/aspect-frame.js` | Fixed 1920 × 1080 viewport calculation and application. |
| `src/styles.css` | Shell, story panel, Notebook, hover and interlude presentation. |
| `package.json` | Node syntax checks and local static serving. |
| `.github/workflows/deploy.yml` | Static repository-root upload and Pages deployment from `main`. |

## Domains in use

```txt
browser document and application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
browser persistence and destructive reset
inspection, clues, Notebook logging and completion
completion timeout, interlude and terminal routing
DOM mouse, click, keyboard, focus and modal interaction
external ES-module provider resolution
Three.js WebGL rendering
scene graph and GPU resource allocation
procedural geometry and shader materials
hotspot volumes and raycast picking
camera parallax and hover projection
offscreen render target and post-processing
browser callback and recursive RAF lifetime
syntax validation and local serving
GitHub Pages artifact deployment
repo-local and central audit tracking
```

Missing renderer-provider authority:

```txt
provider policy and source classes
provider manifest identity and generation
repository-owned or build-vendored artifact
version and content fingerprint
integrity/provenance admission
module timeout and cancellation
required API contract probe
approved fallback order
boot phase and typed terminal result
stage-construction admission
provider-independent failure/retry UI
bounded observation and journal
first provider-backed visible-frame acknowledgement
source/build/Pages provider fixtures
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 × 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve scene, inspect, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule delayed completion interludes. |
| `terminal-route-kit` | Project prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, shallow-merge, replace and delete one browser save value. |
| `stage-render-kit` | Create renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert descriptors into camera, geometry, materials, hotspots and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize cached mouse coordinates, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Render stage to an offscreen target and post pass to canvas. |
| `debug-json-projection-kit` | Serialize story fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over local JavaScript sources. |
| `static-pages-deploy-kit` | Publish repository root to GitHub Pages after pushes to `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

```txt
implemented source-backed kit surfaces: 24
planned renderer-provider authority kits: 25
```

## Concrete source findings

### Provider resolution is a static prerequisite

`src/game.js` imports `StageKit` at module scope. `src/stage-kit.js` imports Three.js from unpkg at module scope. Application code cannot catch a dependency-graph rejection from inside `game.js` because its body has not started evaluating.

### Version naming is not content admission

The URL contains `0.160.0`, but the repository has no provider manifest, expected artifact fingerprint, subresource-integrity equivalent, vendored bytes or recorded API-contract result.

### No provider-independent failure projection exists

`index.html` starts with a `Loading` title and depends on `game.js` to project meaningful story state. There is no bootstrap module or inline failure adapter that can report why the renderer provider was rejected.

### Local validation does not resolve the provider

`npm run check` uses `node --check` on local source files. It proves JavaScript syntax only and does not fetch, evaluate, fingerprint or probe the browser provider.

### Pages deployment does not resolve the provider

The workflow uploads the repository root and deploys it. It does not vendor the provider, verify the deployed module graph, run a browser smoke or correlate a visible frame with provider identity.

## Required parent domain

```txt
the-unmapped-house-render-provider-admission-authority-domain
```

Candidate kits:

```txt
render-provider-policy-kit
render-provider-id-kit
render-provider-generation-kit
render-provider-manifest-kit
render-provider-source-kit
render-provider-artifact-fingerprint-kit
render-provider-integrity-admission-kit
render-provider-version-admission-kit
render-provider-contract-probe-kit
render-provider-timeout-kit
render-provider-fallback-kit
render-provider-result-kit
renderer-boot-phase-kit
stage-construction-admission-kit
provider-failure-ui-kit
provider-observation-kit
provider-journal-kit
first-provider-frame-ack-kit
local-vendor-provider-fixture-kit
blocked-cdn-fixture-kit
provider-timeout-fixture-kit
integrity-mismatch-fixture-kit
api-contract-mismatch-fixture-kit
browser-provider-smoke-kit
pages-provider-smoke-kit
```

## Required transaction

```txt
RenderProviderBootCommand
  -> bind runtime, build, deployment and provider-policy generations
  -> resolve approved candidate from immutable manifest
  -> verify source, version and content fingerprint
  -> enforce timeout, cancellation and fallback policy
  -> evaluate module and probe required Three.js API contract
  -> publish one terminal RenderProviderResult

Accepted or FallbackAccepted
  -> construct StageKit exactly once
  -> allocate stage generation
  -> begin story boot and frame admission
  -> acknowledge first provider-backed visible frame

non-accepted result
  -> allocate no partial stage
  -> mutate no story state
  -> project provider-independent failure and bounded recovery
```

## Retained independent gaps

```txt
hotspot input and picking authority
browser save commit/reset convergence
story manifest and snapshot admission
scene progression and interlude authority
stage resource lifecycle and runtime stop
modal focus and Continue admission
Notebook channel classification
committed-frame diagnostics
```

## Proof boundary

Source inspection proves the current static import ordering and missing authority only. It does not prove a current provider outage, content mismatch, fallback behavior, recovery behavior or deployed production failure.