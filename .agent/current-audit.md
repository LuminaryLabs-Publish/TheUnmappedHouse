# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T17-20-42-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-manifest-snapshot-admission-authority-audited`

## Summary

This documentation-only audit isolates the boundary between authored story content, persisted browser state and startup consumers.

`src/story-data.js` exports raw mutable descriptors. `src/game.js` parses any JSON object, shallow-merges it over defaults and immediately lets scene, gameplay, UI, storage and render consumers act on the result. There is no manifest/snapshot schema, version, compatibility check, migration, semantic validation, immutable canonical model or typed startup outcome.

## Plan ledger

**Goal:** ensure startup either installs one compatible manifest/snapshot pair or fails closed with a typed result while preserving a recoverable predecessor.

- [x] Compare the full Publish inventory with central tracking.
- [x] Verify root `.agent/START_HERE.md` in all nine eligible repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by oldest central timestamp.
- [x] Inspect `index.html`, `package.json`, `src/game.js`, `src/story-data.js`, `src/stage-kit.js` and the existing root audit state.
- [x] Trace manifest definition, startup parsing, scene resolution, inspection, Continue, persistence and render consumption.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define DSK boundaries, commands, results, observations and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

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

## Complete interaction loop

```txt
boot
  -> import raw scene array
  -> derive defaults from scenes[0]
  -> parse localStorage value or use empty object
  -> shallow-merge parsed values into defaults
  -> resolve currentScene by id or fallback
  -> create renderer and load raw scene descriptor
  -> render UI and raw Notebook JSON
  -> persist the merged object

canvas hover/click
  -> normalize pointer
  -> raycast raw hotspot volumes
  -> dispatch attached hotspot descriptor

side-panel click
  -> dispatch the same raw hotspot descriptor

inspect
  -> read/write current scene inspection map
  -> grant clue ids
  -> write narrative log
  -> derive completion from raw requirement list
  -> schedule interlude
  -> rebuild UI
  -> save full mutable state

Continue
  -> find current scene index in raw array
  -> select index + 1
  -> update sceneId and route
  -> load raw successor descriptor
  -> rebuild UI and save

frame
  -> animate camera/materials
  -> render stage target
  -> render post pass to canvas
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Raw game title, ordered scene descriptors, hotspot descriptors, clue grants, completion requirements and render settings. |
| `src/game.js` | Defaults, raw save parse/merge, mutable snapshot, scene resolution, progression, UI, reset and persistence. |
| `src/stage-kit.js` | Consume raw scene descriptors into Three.js resources and render continuously. |
| `index.html` | Fixed shell and player-visible surfaces. |
| `src/aspect-frame.js` | Fixed design frame computation. |
| `package.json` | Syntax-only validation and local serving. |

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

Missing startup-data authority domains:

```txt
manifest identity and semantic version
manifest schema and semantic validation
scene, hotspot and clue indexes
route graph and terminal semantics
manifest freeze and fingerprint
snapshot schema version
snapshot parse result
snapshot migration chain
manifest/snapshot compatibility
snapshot reconciliation and canonicalization
unknown-field rejection
typed startup admission result
startup observation and bounded journal
first startup frame acknowledgement
browser and Pages startup fixture gates
```

## Implemented kits and offered services

| Kit | Services |
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

## Main findings

### Raw content is executable without admission

The three-scene array is the manifest in practice, but no code proves unique scene IDs, unique hotspot IDs, valid clue references, complete camera vectors, valid stage geometry, reachable route order or terminal consistency before consumers execute it.

### Parseable JSON is treated as a valid snapshot

`loadState()` catches only parse failure. Type errors, unknown fields, stale identifiers and content-version mismatches survive the shallow merge.

### Fallback can diverge runtime scene and persisted scene identity

An unknown `state.sceneId` resolves `currentScene` to `scenes[0]`, but the state field is not corrected. Boot then calls `saveState()`, preserving the invalid ID while rendering the first scene.

### Wrong field types can fail after partial startup or mutation

```txt
state.inspected = null
state.clues = "clue:blank-square"
state.route = object-instead-of-array
state.log = "entry"
```

All are parseable and admitted. They can fail during rendering, clue grants, Continue or log writes after other work has already occurred.

### No content/snapshot provenance reaches presentation

The stage, controls, narrative and Notebook do not cite a manifest fingerprint, snapshot revision, migration result or startup admission ID.

## Required parent domain

```txt
the-unmapped-house-story-manifest-snapshot-admission-authority-domain
```

Candidate kits:

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

## Required transaction

```txt
StartStoryRuntimeCommand
  -> load and validate StoryManifest candidate
  -> build canonical indexes and route graph
  -> freeze and fingerprint the accepted manifest
  -> read raw persisted bytes
  -> parse into StorySnapshotCandidate
  -> validate shape and declared schema version
  -> migrate through named deterministic steps
  -> verify manifest compatibility
  -> reconcile stale or missing ids under explicit policy
  -> reject unknown or unsafe fields
  -> produce immutable CanonicalStorySnapshot
  -> commit StoryStartupResult
  -> construct scene/UI/render consumers from accepted values only
  -> acknowledge the first visible startup frame
  -> publish detached observation and bounded journal
```

## Proof boundary

Source inspection proves the missing admission boundaries. It does not prove that any malformed save currently exists in deployed user storage, nor that every malformed value produces the same failure. Executable fixtures are required for those claims.
