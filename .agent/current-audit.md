# Current audit: The Unmapped House renderer-provider central reconciliation

**Timestamp:** `2026-07-13T04-47-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `render-provider-admission-authority-central-reconciled`  
**Branch:** `main`

## Summary

This documentation-only reconciliation synchronizes the source-backed renderer-provider audit with central tracking. `src/stage-kit.js` statically imports Three.js `0.160.0` from unpkg, and `src/game.js` statically imports StageKit. The remote module must therefore fetch, parse and evaluate before game-owned boot code can load story state, construct StageKit, replace the static `Loading` shell, publish a typed failure or expose recovery.

## Plan ledger

**Goal:** require one approved, verified and terminal renderer-provider result before allocating stage resources or beginning story interaction, while keeping repo-local and central records on the same documented head.

- [x] Compare the complete ten-repository Publish inventory with central tracking.
- [x] Confirm root `.agent` coverage for all nine eligible repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` because its local provider audit was newer than central tracking.
- [x] Inspect HTML boot, static imports, Three.js use, package checks and Pages deployment.
- [x] Preserve the complete interaction loop, domain list and 24-kit service map.
- [x] Preserve provider identities, policies, results, fallback and proof gates.
- [x] Add the `2026-07-13T04-47-00-04-00` reconciliation family.
- [x] Synchronize the central ledger and internal change log.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 1

TheUnmappedHouse   central 2026-07-13T01-49-49-04-00
                   local   2026-07-13T04-29-43-04-00 selected unsynchronized
AetherVale         central 2026-07-13T02-15-51-04-00
TheOpenAbove       central 2026-07-13T02-18-03-04-00
IntoTheMeadow      central 2026-07-13T02-39-44-04-00
PhantomCommand     central 2026-07-13T02-49-07-04-00
PrehistoricRush    central 2026-07-13T03-20-58-04-00
HorrorCorridor     central 2026-07-13T03-38-31-04-00
ZombieOrchard      central 2026-07-13T03-59-28-04-00
MyCozyIsland       central 2026-07-13T04-21-10-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` was modified in the Publish organization.

## Complete interaction loop

```txt
browser navigation
  -> parse index.html
  -> paint fixed 16:9 shell
  -> expose scene title Loading
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
  -> install resize, mouse and click callbacks
  -> start recursive RAF
  -> load scene and hotspot volumes
  -> render story controls and Notebook
  -> persist initial snapshot

normal interaction
  -> mousemove updates cached pointer and parallax
  -> RAF mutates camera and renders stage plus post pass
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
| `src/aspect-frame.js` | Fixed 1920x1080 viewport calculation and application. |
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
integrity and provenance admission
module timeout and cancellation
required API-contract probe
approved fallback order
boot phase and typed terminal result
StageKit construction admission
provider-independent failure and retry UI
bounded observation and journal
first provider-backed visible-frame acknowledgement
source, build, browser and Pages provider fixtures
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Compute and apply the fixed 1920x1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve scene, inspect, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected-hotspot booleans. |
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

The URL contains `0.160.0`, but the repository has no provider manifest, expected artifact fingerprint, vendored bytes or recorded API-contract result.

### No provider-independent failure projection exists

`index.html` starts with a `Loading` title and depends on `game.js` to project meaningful story state. No bootstrap module or inline failure adapter can report why the renderer provider was rejected.

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

## Repo-local output

```txt
.agent/trackers/2026-07-13T04-47-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T04-47-00-04-00.md
.agent/architecture-audit/2026-07-13T04-47-00-04-00-render-provider-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T04-47-00-04-00-provider-visible-boot-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T04-47-00-04-00-provider-failure-story-central-reconciliation.md
.agent/interaction-audit/2026-07-13T04-47-00-04-00-provider-command-result-central-reconciliation-map.md
.agent/render-provider-audit/2026-07-13T04-47-00-04-00-provider-manifest-integrity-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T04-47-00-04-00-provider-fixture-central-reconciliation-gate.md
.agent/central-sync-audit/2026-07-13T04-47-00-04-00-repo-ledger-render-provider-reconciliation.md
```

## Validation boundary

Documentation and machine state changed. Runtime JavaScript, HTML, CSS, story content, provider source, WebGL behavior, package scripts, dependencies and Pages workflow did not change. No provider, browser or Pages fixture was executed. No branch or pull request was created.