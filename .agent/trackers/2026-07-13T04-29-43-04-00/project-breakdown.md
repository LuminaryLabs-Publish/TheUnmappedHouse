# Project breakdown: The Unmapped House render-provider admission

**Timestamp:** `2026-07-13T04-29-43-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-provider-admission-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine inspectable hotspots, local browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The current breakdown isolates renderer-provider boot admission. `src/stage-kit.js` imports Three.js directly from `https://unpkg.com/three@0.160.0/build/three.module.js`. Because `src/game.js` statically imports `StageKit`, a provider fetch, integrity or module-evaluation failure occurs before the application can create story state, replace the visible `Loading` title, expose a typed failure or start the rendering loop. The repository has no local provider artifact, provider manifest, content fingerprint, approved fallback, timeout result, contract probe, boot phase, failure projection or first provider-backed visible-frame acknowledgement.

This is a source-derived availability and provenance gap. No provider outage, compromise or production failure was observed during this documentation-only run.

## Plan ledger

**Goal:** make renderer-provider resolution an explicit, revisioned and observable boot transaction before stage construction, story interaction or visible-frame claims begin.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs` central tracking.
- [x] Confirm all nine eligible repositories have root `.agent` entrypoints.
- [x] Confirm no repository is new, central-ledger-missing, root-agent-missing or repo-local-newer than central tracking.
- [x] Select only `LuminaryLabs-Publish/TheUnmappedHouse`, the oldest eligible synchronized repository.
- [x] Trace HTML boot, module loading, Three.js provider import, stage construction, story startup, syntax validation and Pages deployment.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 24 implemented kit surfaces and offered services.
- [x] Define one renderer-provider admission parent domain and candidate kits.
- [x] Add architecture, render, gameplay, interaction, provider and deployment audits.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Modify no runtime, story, render, package or workflow source.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement provider admission and executable source/build/Pages fixtures.

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
  -> paint static fixed-frame shell
  -> display scene title "Loading"
  -> request src/game.js as an ES module

module graph admission
  -> src/game.js statically imports StageKit
  -> src/stage-kit.js requests Three.js 0.160.0 from unpkg.com
  -> browser fetches, parses and evaluates the external provider
  -> any fetch, policy, integrity, MIME or evaluation failure rejects the module graph

accepted provider path
  -> evaluate StageKit
  -> load or create story state
  -> construct renderer, scene, camera, lights, target and post pass
  -> install resize, mousemove and click callbacks
  -> start recursive RAF
  -> load current scene descriptors and hotspot volumes
  -> project story panel and Notebook
  -> persist initial snapshot

normal interaction
  -> pointer movement updates hover and parallax state
  -> RAF updates camera/materials and renders stage/post pass
  -> canvas or side-panel inspection mutates story state
  -> completion schedules interlude
  -> Continue advances scene
  -> KeyR deletes the save and reloads

non-accepted provider path
  -> src/stage-kit.js does not evaluate
  -> src/game.js does not evaluate
  -> StageKit is never constructed
  -> no story state or diagnostics are projected
  -> static title can remain "Loading"
  -> no typed boot result or recovery control is shown
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Static fixed-frame shell, stage mount, story panel, Notebook, hover label, interlude and module entrypoint. |
| `src/game.js` | Static StageKit import, story aggregate, localStorage, inspection, progression, UI, reset and boot. |
| `src/stage-kit.js` | External Three.js import, WebGL stage, scene resources, pointer cache, picking, parallax, render target and RAF. |
| `src/story-data.js` | Three scene descriptors, nine hotspots, completion requirements and render settings. |
| `src/aspect-frame.js` | Fixed 1920 × 1080 viewport calculation and DOM application. |
| `src/styles.css` | Static shell, side panel, Notebook, hover and interlude presentation. |
| `package.json` | Node syntax checks and local Python static serving. |
| `.github/workflows/deploy.yml` | Upload repository root and deploy it to GitHub Pages after pushes to `main`. |
| `.agent/` | Repo-local audit state and timestamped evidence. |

## Domains in use

```txt
browser document and static application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
browser persistence and destructive reset
story inspection, clues, Notebook log and completion
completion timers, interludes and terminal routing
DOM mouse, click, keyboard, focus and modal behavior
external ES-module provider resolution
Three.js WebGL renderer and presentation
scene graph and GPU resource allocation
procedural geometry and shader materials
hotspot volumes and raycast picking
camera parallax and hover projection
offscreen render target and post-processing
browser callback and RAF lifetime
syntax validation and local serving
GitHub Pages artifact deployment
repo-local and central audit tracking
```

Missing renderer-provider authority:

```txt
provider policy and approved source set
provider identity and generation
local or vendored artifact ownership
provider version and content fingerprint
integrity and provenance admission
module MIME and evaluation result
required Three.js API contract probe
bounded timeout and cancellation
approved fallback or last-known-good policy
renderer boot phase and typed terminal result
provider failure projection and recovery affordance
bounded provider observation and journal
first provider-backed visible-frame acknowledgement
source, build and Pages provider fixtures
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
| `render-target-composition-kit` | Render the stage to an offscreen target and the post pass to canvas. |
| `debug-json-projection-kit` | Serialize story fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over local JavaScript sources. |
| `static-pages-deploy-kit` | Publish repository root to GitHub Pages after pushes to `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

```txt
implemented source-backed kit surfaces: 24
planned renderer-provider authority kits: 25
```

## Main source-backed finding

`src/stage-kit.js` imports the runtime provider from a remote URL at module-evaluation time. The URL names Three.js `0.160.0`, but the repository does not own or fingerprint the returned bytes. `src/game.js` cannot enter its own failure path because its dependency graph must finish evaluating before its body runs.

The static page initially exposes `Loading`, while the runtime has no pre-module bootstrap capable of changing that state when the provider is unavailable. `npm run check` validates local JavaScript syntax only. The Pages workflow uploads the source tree without resolving, vendoring, hashing or smoke-testing the provider.

## Reachable failure path

```txt
navigate to deployed page
  -> index.html paints static shell and "Loading"
  -> browser requests src/game.js
  -> module loader follows StageKit import
  -> Three.js provider request is blocked, unavailable, malformed or contract-incompatible
  -> module graph rejects before game.js executes
  -> no StageKit, story projection, Notebook evidence or retry result exists
  -> user receives a static incomplete boot state
```

This does not establish that unpkg is presently failing. It establishes that the repository has no authority or proof boundary for that dependency.

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
  -> resolve an approved local, vendored or pinned provider candidate
  -> identify source, version and expected content fingerprint
  -> enforce timeout, cancellation and fallback policy
  -> verify fetched artifact integrity and module evaluation
  -> probe the required Three.js API contract
  -> return Accepted, FallbackAccepted, Unavailable,
     TimedOut, IntegrityRejected, ContractRejected or Cancelled

Accepted or FallbackAccepted
  -> construct StageKit exactly once
  -> start story boot and frame admission
  -> publish provider ID, generation and fingerprint
  -> acknowledge the first provider-backed visible frame

non-accepted result
  -> construct no partial stage
  -> project a typed failure and retry/recovery affordance
  -> append bounded provider evidence without leaking secrets
```

## Repo-local output

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Added:

```txt
.agent/trackers/2026-07-13T04-29-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T04-29-43-04-00.md
.agent/architecture-audit/2026-07-13T04-29-43-04-00-render-provider-admission-dsk-map.md
.agent/render-audit/2026-07-13T04-29-43-04-00-external-provider-blank-boot-visible-gap.md
.agent/gameplay-audit/2026-07-13T04-29-43-04-00-provider-failure-before-story-loop.md
.agent/interaction-audit/2026-07-13T04-29-43-04-00-provider-boot-result-admission-map.md
.agent/render-provider-audit/2026-07-13T04-29-43-04-00-source-integrity-fallback-contract.md
.agent/deploy-audit/2026-07-13T04-29-43-04-00-render-provider-pages-fixture-gate.md
```

## Validation boundary

```txt
runtime JavaScript changed: no
HTML or CSS changed: no
story content changed: no
render behavior changed: no
browser persistence changed: no
package scripts or dependencies changed: no
Pages workflow changed: no
branch created: no
pull request created: no

npm run check: not run
browser provider smoke: not run
blocked-provider fixture: unavailable
integrity-mismatch fixture: unavailable
contract-mismatch fixture: unavailable
fallback fixture: unavailable
Pages provider smoke: not run
```

No provider availability, integrity, provenance, fallback correctness, boot recovery, visible-frame or production-readiness claim is made.