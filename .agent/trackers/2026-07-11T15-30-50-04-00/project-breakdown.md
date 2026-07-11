# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

This pass isolates the startup persistence boundary. The browser parses one raw localStorage value, shallow-merges it into defaults, resolves a scene separately, allocates the renderer and recursive RAF, projects the candidate state, and then writes the same mutable state back without schema, semantic, manifest, migration, reconciliation, typed result, or rollback authority.

## Plan ledger

**Goal:** admit one versioned StorySnapshot against one canonical StoryManifest before any renderer, listener, RAF, stage, UI, or persistence mutation becomes live.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible repository.
- [x] Trace raw storage read, JSON parse, shallow merge, scene fallback, renderer allocation, live stage construction, UI assumptions, startup save, reset, and reload.
- [x] Identify the complete interaction loop, active domains, implemented kits, and offered services.
- [x] Define StoryManifest admission, versioned save envelope, migration, semantic validation, reconciliation, bootstrap preparation, rollback, first-frame, result, journal, and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, persistence, deploy, tracker, and turn-ledger records.
- [x] Refresh the required root `.agent` files.
- [x] Change no runtime source.
- [x] Push directly to `main` and create no branch or pull request.
- [ ] Implement the documented authority and executable fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

TheUnmappedHouse   2026-07-11T13-49-30-04-00 selected
AetherVale         2026-07-11T14-00-01-04-00
IntoTheMeadow      2026-07-11T14-08-51-04-00
PrehistoricRush    2026-07-11T14-31-27-04-00
MyCozyIsland       2026-07-11T14-41-28-04-00
TheOpenAbove       2026-07-11T14-50-59-04-00
HorrorCorridor     2026-07-11T15-01-33-04-00
PhantomCommand     2026-07-11T15-08-41-04-00
ZombieOrchard      2026-07-11T15-20-27-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` was changed in the Publish organization.

## Interaction loop

```txt
module boot
  -> read one raw localStorage key
  -> parse JSON inside a broad catch
  -> shallow-merge candidate fields over defaults
  -> resolve currentScene separately from state.sceneId
  -> construct StageKit
       -> allocate renderer, render target, post resources and canvas
       -> install resize, pointer and click listeners
       -> start recursive RAF immediately
  -> build the selected scene directly in live ownership
  -> project UI using assumed array/object field shapes
  -> write the mutable state back to localStorage unconditionally

runtime inspection
  -> side-panel button or raycast submits a full hotspot descriptor
  -> mutate inspected, clues, text and log
  -> derive completion from global clue strings
  -> schedule an anonymous 450 ms interlude timeout
  -> project UI
  -> write full mutable state

Continue
  -> mutate story identity and route
  -> replace live stage resources
  -> project UI
  -> write state

Reset
  -> remove the save key
  -> reload the document
```

## Source-backed startup findings

### Malformed JSON is silently destroyed

`loadState()` catches every read or parse failure and returns defaults. Module boot later calls `saveState()` unconditionally, replacing the malformed or unreadable value with the default state without a rejection result, quarantine record, recovery choice, or retained raw payload.

### Semantically invalid JSON is admitted

The shallow merge accepts arbitrary field shapes. Examples:

```txt
clues: null or object       -> sceneComplete() can throw on .includes
inspected: null             -> renderUi() can throw on property access
route: string or object     -> nextScene() can fail on .push
log: null or object         -> writeLog() or debug projection can fail
sceneId: unknown string     -> visible scene falls back, persisted sceneId stays unknown
sceneId: later scene        -> startup skips prior story without route/proof admission
clues: required clue names  -> completion can be forged without inspection receipts
```

### Renderer work starts before state admission succeeds

`StageKit` starts its recursive RAF in the constructor. A later `renderUi()` or `saveState()` exception can therefore leave an active canvas, renderer, render target, listeners, RAF and live stage after module initialization has failed.

### Scene identity can split at startup

`currentScene` falls back to the first authored scene when `state.sceneId` is unknown, but the state field is not repaired before the unconditional save. The stage and UI can show scene one while persistence continues to identify an unknown scene.

### Storage write failure has no startup rollback

Storage reads are caught, but the startup write is not. A denied or quota-failing `setItem()` can fail after the renderer, canvas, listeners, RAF, scene resources and UI are live.

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, stage, material, post and copy descriptors
raw browser storage read, parse, write and clear effects
mutable story state, scene route, inspection, clues, flags and notebook log
scene completion and interlude timing
Continue and terminal routing
DOM, hover, interlude and debug projection
Three.js CDN runtime
renderer, scene, camera, lights, render target, post scene and canvas
live stage-group replacement
procedural anime material construction
hotspot volume creation and raycast picking
pointer-driven camera parallax
recursive RAF and render-target composition
runtime listener, timer, frame and WebGL resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical StoryManifest admission and fingerprint
versioned save envelope
raw save read result and corrupt-payload quarantine
save schema migration
StorySnapshot structural and semantic admission
manifest-aware reconciliation
story phase, story revision and save revision
inspection and clue provenance validation
canonical snapshot fingerprint
bootstrap candidate, preparation, commit and rollback
first-bootstrap-frame acknowledgement
storage write and clear results
persistence journal and detached read model
runtime session lifecycle and resource retirement
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, render target, post scene, canvas, listeners, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected hotspots. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Required parent domain

```txt
the-unmapped-house-story-snapshot-startup-authority-domain
```

Candidate coordinating kits:

```txt
story-manifest-schema-kit
story-manifest-index-kit
story-manifest-fingerprint-kit
story-save-envelope-kit
story-save-raw-read-kit
story-save-parse-kit
story-save-migration-kit
story-snapshot-schema-kit
story-snapshot-semantic-admission-kit
story-snapshot-reconciliation-kit
story-snapshot-fingerprint-kit
story-load-result-kit
story-save-result-kit
corrupt-save-quarantine-kit
bootstrap-candidate-kit
bootstrap-stage-preparation-kit
bootstrap-commit-kit
bootstrap-rollback-kit
first-bootstrap-frame-ack-kit
story-persistence-journal-kit
story-snapshot-fixture-kit
browser-bootstrap-failure-smoke-kit
```

## Required startup flow

```txt
read raw save without mutating storage
  -> publish typed raw-read result
  -> parse into detached envelope candidate
  -> validate envelope version and manifest identity
  -> migrate known prior versions
  -> structurally validate all fields
  -> semantically reconcile scene, route, inspections, clues, phase and revisions
  -> compute canonical snapshot fingerprint
  -> choose accepted snapshot or typed fallback without destroying rejected raw input
  -> prepare stage, UI and persistence candidate off-line
  -> commit one bootstrap generation
  -> acknowledge first visible frame
  -> publish immutable StoryLoadResult and bounded journal row

failure before commit
  -> retain raw storage value
  -> dispose candidate renderer, stage and listeners
  -> publish typed rejection or rollback result
  -> expose an explicit retry, reset, or quarantine recovery path
```

## Required validation rows

```txt
absent-save-defaults-with-typed-result
malformed-json-rejected-without-overwrite
storage-read-unavailable-reported
unknown-schema-version-rejected
known-version-migrated-once
manifest-fingerprint-mismatch-reconciled-or-rejected
unknown-scene-id-rejected-or-canonically-repaired
route-is-canonical-prefix-ending-at-current-scene
unknown-scene-and-hotspot-inspection-ids-rejected
clues-require-known-provenance
invalid-field-types-rejected-before-stage-allocation
log-and-route-budgets-enforced
snapshot-fingerprint-stable-after-roundtrip
storage-write-failure-rolls-back-bootstrap
stage-preparation-failure-disposes-all-candidate-resources
first-bootstrap-frame-correlates-snapshot-and-stage
reset-clear-result-typed
load-and-save-results-detached-json-safe
persistence-journal-bounded
```

## Ordered implementation queue

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. InspectionCommand, receipts, clue provenance and scene-completion proof
4. Atomic Continue transition and first-successor-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Validation status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
StorySnapshot admission fixture: unavailable
migration/reconciliation fixture: unavailable
bootstrap rollback fixture: unavailable
first-bootstrap-frame fixture: unavailable
```

No startup, persistence, migration, reconciliation, render-readiness, or recovery correctness claim is made.