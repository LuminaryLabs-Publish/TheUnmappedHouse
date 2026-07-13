# Project breakdown: The Unmapped House renderer-provider central reconciliation

**Timestamp:** `2026-07-13T04-47-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Scope:** documentation-only central reconciliation

## Summary

The full Publish inventory contains ten accessible repositories and nine eligible repositories after excluding `TheCavalryOfRome`. `TheUnmappedHouse` was selected because its completed renderer-provider audit at `2026-07-13T04-29-43-04-00` was newer than the central ledger. The audit identifies a static remote Three.js import that must succeed before application-owned boot, failure projection, story state, StageKit construction or visible-frame evidence can exist.

## Plan ledger

**Goal:** synchronize the complete source-backed breakdown while preserving one explicit authority boundary for renderer-provider source, integrity, compatibility, fallback, stage admission and first-frame proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Detect one repo-local audit newer than central tracking.
- [x] Select and modify only `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Identify the complete boot, story, interaction, render and deployment loop.
- [x] Identify all current and missing domains.
- [x] Preserve all 24 implemented kits and their offered services.
- [x] Preserve the 25-kit renderer-provider authority proposal.
- [x] Add a new tracker, turn ledger and reconciliation audit family.
- [x] Refresh required root `.agent` routing and machine state.
- [ ] Implement provider admission and execute browser, build and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local audit newer than central ledger: 1

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

## Complete interaction loop

```txt
browser navigation
  -> parse index.html
  -> paint fixed 16:9 shell and Loading title
  -> request src/game.js

module graph
  -> game.js statically imports StageKit
  -> StageKit statically imports Three.js 0.160.0 from unpkg
  -> browser fetches, parses and evaluates the remote provider

accepted provider
  -> load or create story state
  -> resolve authored scene
  -> construct StageKit
  -> allocate WebGL renderer, scene, camera, lighting and render target
  -> install resize, mouse and click callbacks
  -> start recursive requestAnimationFrame rendering
  -> load scene geometry and hotspot volumes
  -> render story controls and Notebook
  -> persist initial state

normal interaction
  -> mousemove updates cached pointer and camera parallax
  -> RAF updates material time and renders stage plus post pass
  -> canvas click or side-panel button inspects a hotspot
  -> inspection updates clues, log, completion and browser save
  -> completion timer opens interlude
  -> Continue advances to the next authored scene
  -> KeyR deletes the save and reloads

non-accepted provider
  -> module graph rejects before game.js evaluates
  -> no StageKit, story runtime, Notebook projection or typed failure result exists
  -> the static Loading shell can remain visible
```

## Domains in use

```txt
browser document and application shell
fixed 1920x1080 aspect composition
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
browser callbacks and recursive RAF lifetime
syntax validation and local static serving
GitHub Pages artifact deployment
repo-local and central audit tracking
```

Missing parent authority:

```txt
the-unmapped-house-render-provider-admission-authority-domain
```

It must own approved provider source classes, immutable manifest identity, version and content fingerprint admission, API-contract probes, timeout, cancellation, fallback ordering, terminal results, StageKit construction gating, provider-independent failure projection, bounded evidence and first provider-backed visible-frame acknowledgement.

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed 1920x1080 frame computation and DOM application. |
| `story-data-kit` | Three scenes, nine hotspots, clue grants, completion rules, camera, material and post descriptors. |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, continue, reset, UI projection and persistence. |
| `scene-route-kit` | Scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and clue query. |
| `notebook-log-kit` | Prepend narrative log entries and cap retained rows. |
| `interlude-timer-kit` | Delayed completion-interlude scheduling. |
| `terminal-route-kit` | Prototype-complete terminal copy. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete one browser save. |
| `stage-render-kit` | Renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post configuration. |
| `anime-material-kit` | Procedural shader materials and time-uniform updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes with attached hotspot descriptors. |
| `hotspot-picking-kit` | Cached mouse normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass and post pass to canvas. |
| `debug-json-projection-kit` | Story-field serialization into the visible Notebook. |
| `package-syntax-check-kit` | Node syntax checks over local JavaScript. |
| `static-pages-deploy-kit` | Repository-root artifact upload and Pages deployment from `main`. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Central selection mirror and findings history. |

```txt
implemented source-backed kits: 24
proposed renderer-provider authority kits: 25
```

## Required transaction

```txt
RenderProviderBootCommand
  -> bind runtime, build, deployment and provider-policy generations
  -> resolve an approved candidate from an immutable manifest
  -> verify source class, expected version and content fingerprint
  -> enforce timeout, cancellation and fallback policy
  -> evaluate the module and probe required Three.js APIs
  -> publish one terminal RenderProviderResult

Accepted or FallbackAccepted
  -> construct StageKit exactly once
  -> allocate one stage generation
  -> begin story boot and frame admission
  -> acknowledge the first provider-backed visible frame

Unavailable, TimedOut, IntegrityRejected, VersionRejected,
ContractRejected, Cancelled, Duplicate or Stale
  -> allocate no partial stage
  -> mutate no story state
  -> project provider-independent failure and bounded recovery
```

## Validation boundary

```txt
runtime JavaScript changed: no
HTML or CSS changed: no
story descriptors changed: no
provider source changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
Pages workflow changed: no
branch created: no
pull request created: no

npm run check: not run
browser provider smoke: not run
blocked-provider fixture: unavailable
provider timeout fixture: unavailable
integrity mismatch fixture: unavailable
API-contract mismatch fixture: unavailable
approved fallback fixture: unavailable
Pages provider smoke: not run
```

No current outage, compromised provider artifact, provider reliability, production readiness or executable authority claim is made.