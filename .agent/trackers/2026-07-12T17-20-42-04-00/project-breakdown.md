# Project breakdown: The Unmapped House Story Manifest and Snapshot Admission

**Timestamp:** `2026-07-12T17-20-42-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`

## Summary

The product has a coherent three-scene interaction loop and 24 identifiable kit surfaces, but its content and saved state do not pass through an authoritative startup boundary. This audit defines the missing manifest/snapshot DSK and records the exact consumer and proof gaps.

## Plan ledger

**Goal:** document one canonical startup contract before runtime implementation changes.

- [x] Inventory the Publish organization and central ledger.
- [x] Verify root `.agent` coverage.
- [x] Select one repository only.
- [x] Trace the complete interaction loop.
- [x] Identify every active domain.
- [x] Identify every implemented kit and offered service.
- [x] Define the missing DSK/domain boundary.
- [x] Add architecture, render, gameplay, interaction, story-authority and deploy audits.
- [x] Update required root documentation.
- [x] Push directly to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation remains future work.

## Selection

```txt
TheUnmappedHouse   2026-07-12T15-08-07-04-00 selected
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-40-04-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
ZombieOrchard      2026-07-12T16-51-47-04-00
MyCozyIsland       2026-07-12T17-10-31-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot -> raw manifest import -> raw save parse -> shallow merge -> scene fallback
     -> StageKit load -> UI/Notebook projection -> immediate full-state save

hover/canvas click -> raycast raw hotspot descriptor -> inspection
side-panel click    -> raw hotspot descriptor -> inspection

inspection -> mutate inspected/clues/log -> derive completion
           -> delayed interlude -> UI rebuild -> save

Continue -> array-index successor -> scene/route mutation
         -> StageKit replacement -> UI rebuild -> save

frame -> camera/material animation -> stage pass -> post pass
reset -> delete key -> reload
```

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage read, write and reset effects
mutable story snapshot ownership
scene routing, inspection, clues, flags, route and notebook log
scene-completion derivation
unretained completion timeout
interlude visibility, Continue and terminal projection
global keyboard and pointer input
native focus and button activation
player-visible notebook and raw diagnostic projection
Three.js CDN runtime
WebGL renderer and two-pass presentation
procedural geometry and anime materials
hotspot volumes and raycast picking
camera parallax
resize, timeout, input and recursive RAF callbacks
syntax validation
static Pages deployment
repo-local audit tracking
central ledger synchronization
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount the stage, story panel, hotspot list, Notebook, hover label and interlude surfaces. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 x 1080 design frame inside the browser viewport. |
| `story-data-kit` | Provide the three scene descriptors, nine hotspot descriptors, clue grants, completion requirements, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve the current scene, inspect hotspots, derive completion, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve the current scene from sceneId and advance through array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap player-readable narrative log rows. |
| `interlude-timer-kit` | Schedule the delayed completion interlude. |
| `terminal-route-kit` | Project the prototype-complete terminal copy. |
| `localstorage-save-kit` | Read one browser key, parse JSON, shallow-merge defaults, write the full object and delete on reset. |
| `stage-render-kit` | Create the Three.js renderer, camera, lights, target, listeners and recursive RAF. |
| `scene-descriptor-consumer-kit` | Turn scene camera, stage, hotspot and post descriptors into live Three.js resources. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Create invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize pointer input, raycast current volumes and dispatch a selected hotspot. |
| `camera-parallax-kit` | Apply pointer-driven offsets to the fixed camera. |
| `render-target-composition-kit` | Render the stage to an offscreen target and the post pass to the canvas. |
| `debug-json-projection-kit` | Serialize internal aggregate fields into the visible Notebook pre element. |
| `package-syntax-check-kit` | Run Node syntax checks over the four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the static route from main. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and change history into LuminaryLabs-Dev/LuminaryLabs. |

## Main finding

`story-data.js` is an unversioned executable manifest and `loadState()` is an untyped admission function. Any parseable state fields survive the shallow merge and are immediately consumed or repersisted. The system cannot state which manifest version, fingerprint, snapshot schema, migration or reconciliation produced the current runtime.

## Required parent domain

```txt
the-unmapped-house-story-manifest-snapshot-admission-authority-domain
```

## Candidate kits

```txt
story-manifest-id-kit
story-manifest-version-kit
story-manifest-schema-kit
story-manifest-validation-kit
scene-index-kit
hotspot-index-kit
clue-index-kit
story-route-graph-kit
story-manifest-freeze-kit
story-manifest-fingerprint-kit
story-snapshot-schema-version-kit
story-snapshot-parser-kit
story-snapshot-shape-validation-kit
story-snapshot-migration-kit
story-snapshot-reconciliation-kit
story-snapshot-admission-kit
canonical-story-snapshot-kit
unknown-snapshot-field-rejection-kit
manifest-snapshot-compatibility-kit
story-startup-result-kit
story-startup-observation-kit
story-startup-journal-kit
first-startup-frame-ack-kit
story-manifest-fixture-kit
story-snapshot-fixture-kit
browser-startup-smoke-kit
pages-startup-smoke-kit
```

## Proof boundary

Documentation is source-backed. No runtime source, content, save behavior, render behavior, dependency or deployment change was made. No executable startup fixture was run.
