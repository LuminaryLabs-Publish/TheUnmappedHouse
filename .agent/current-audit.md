# Current audit: The Unmapped House

Timestamp: `2026-07-11T15-30-50-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** identify the authority and fixture boundary required to turn raw browser storage into one admitted StorySnapshot before stage, UI, persistence, and first-frame state become live.

- [x] Trace localStorage read, parse, shallow merge, and fallback.
- [x] Trace scene resolution and unknown-scene behavior.
- [x] Trace StageKit allocation, listener installation, RAF start, live stage construction, UI projection, and startup write.
- [x] Trace KeyR clear and reload.
- [x] Inventory all active domains, implemented kits, and offered services.
- [x] Define manifest, version, migration, semantic validation, reconciliation, quarantine, bootstrap, rollback, first-frame, result, journal, and fixture kits.
- [ ] Implement StoryManifest and StorySnapshot authority.
- [ ] Run pure admission, storage failure, browser rollback, and first-frame fixtures.

## Interaction loop

```txt
boot
  -> read raw `.v1` localStorage value
  -> parse inside a broad catch
  -> shallow-merge candidate fields over defaults
  -> resolve currentScene separately from state.sceneId
  -> construct StageKit
       -> create renderer, target, post resources and canvas
       -> install resize, pointer and click listeners
       -> start recursive RAF
  -> build current scene directly in live stage ownership
  -> project UI using assumed field shapes
  -> write the mutable state back unconditionally

inspection
  -> side-panel button or raycast submits full hotspot descriptor
  -> mutate scene inspection, global clues, text and log
  -> derive completion from clue strings
  -> schedule anonymous 450 ms timeout
  -> project UI and write full state

Continue
  -> mutate scene identity, route and log
  -> replace live stage
  -> project UI
  -> write full state

reset
  -> remove save key
  -> reload document
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, side-panel, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Scene order, hotspots, clue requirements, stage descriptors, camera, materials, post settings, and interlude copy. |
| `src/game.js` | Raw load, mutable story state, inspection, completion, timeout scheduling, Continue, reset, projection, and persistence. |
| `src/stage-kit.js` | Renderer allocation, live stage replacement, Three.js resources, hotspot meshes, input, camera parallax, and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and browser fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, stage, material, post and copy descriptors
raw browser storage read, parse, write and clear effects
mutable story state and route
scene-keyed inspection and global clue state
flags and notebook log
scene completion and interlude timing
Continue and terminal routing
DOM, hover, interlude and debug projection
Three.js CDN runtime
renderer, scene, camera, lights, render target, post scene and canvas
live stage-group replacement
procedural anime material construction
hotspot volume creation and raycast picking
pointer camera parallax
recursive RAF and render-target composition
runtime listener, timeout, frame and WebGL resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical StoryManifest schema, indexes, deep freeze and fingerprint
versioned save envelope
raw read, parse and quarantine results
pure save migration
StorySnapshot structural and semantic admission
manifest-aware reconciliation
story phase, story revision and save revision
inspection and clue provenance validation
canonical snapshot fingerprint
typed load, save and clear results
bootstrap candidate and detached stage/UI preparation
atomic bootstrap commit and rollback
first-bootstrap-frame acknowledgement
bounded persistence journal
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

## Main finding: startup accepts untrusted state before resources are safe

### Broad catch destroys malformed input

`loadState()` wraps storage read and JSON parse in one broad catch and returns defaults on any failure. The module later calls `saveState()` unconditionally, so malformed input or a read failure can be replaced by a new default save without a typed rejection, retained raw payload, quarantine record, or user recovery decision.

### Shallow merge admits invalid field shapes

The loader does not verify arrays, objects, strings, ids, bounds, revisions, or semantic relationships. A valid JSON object can cause later failures or impossible state:

```txt
clues: null/object        -> `.includes` failure
inspected: null           -> property access failure
route: string/object      -> `.push` failure during Continue
log: null/object          -> `.unshift` or `.slice` failure
unknown sceneId           -> visible fallback scene, unrepaired persisted id
later sceneId             -> direct progression skip
forged required clues     -> completion without inspection evidence
unknown inspections       -> noncanonical UI state
```

### Manifest and snapshot are not bound

No manifest id or fingerprint proves the save belongs to the current authored scene graph. No canonical indexes validate scene, hotspot, clue, successor, or requirement identities.

### Progression fields can disagree

`sceneId`, `route`, `inspected`, and `clues` are independently trusted. The route need not be a canonical prefix, inspections need not grant clues, clues need not have inspection provenance, and the current scene need not match route or predecessor completion.

### Renderer work starts before admission completes

`StageKit` starts its RAF in the constructor. A later `renderUi()` or `saveState()` exception can leave renderer, target, canvas, listeners, live resources, and recursive frame work active after story bootstrap failed.

### Storage write failure has no rollback

The startup write is untyped and uncaught. A quota or security error can occur after stage and UI state are visible, with no bootstrap commit result, rollback, disposal, or explicit offline mode.

### First frame has no snapshot provenance

No bootstrap generation, load result id, manifest fingerprint, snapshot fingerprint, stage epoch, or first-frame acknowledgement correlates the visible stage with the admitted story state.

## Required parent domain

```txt
the-unmapped-house-story-snapshot-startup-authority-domain
```

Candidate kits:

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

## Required load contract

```txt
StoryLoadResult
  status: absent_defaulted | loaded | migrated | reconciled |
          rejected_malformed | rejected_schema | rejected_manifest |
          rejected_semantic | storage_unavailable | prepare_failed |
          persistence_failed | commit_failed | rolled_back | committed
  resultId
  commandId
  rawReadId
  manifestId
  manifestFingerprint
  sourceSchemaVersion?
  committedSchemaVersion?
  migrationReceipts[]
  reconciliationReceipts[]
  rejectionReason?
  snapshotFingerprint?
  bootstrapGeneration?
  stageEpoch?
  firstVisibleFrameId?
  rollbackResult?
```

## Required authority flow

```txt
admit canonical StoryManifest
  -> read and retain exact raw save
  -> parse detached envelope
  -> validate version and manifest identity
  -> migrate known version
  -> structurally validate fields
  -> semantically validate progression
  -> reconcile only through explicit deterministic policy
  -> canonicalize and fingerprint snapshot
  -> prepare stage and UI off-line
  -> commit one bootstrap generation
  -> acknowledge first visible frame
  -> publish immutable load result and bounded journal row

failure before commit
  -> preserve raw save
  -> keep committed state unchanged
  -> dispose candidate stage, renderer, listeners and RAF work
  -> publish typed rejection or rollback
```

## Ordered implementation queue

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. InspectionCommand, receipts, clue provenance and scene-completion proof
4. Atomic Continue transition and first-visible-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse StorySnapshot Startup Admission Authority
+ Migration, Reconciliation, Bootstrap Rollback, and First-Frame Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves malformed-save retention, semantic rejection, migration, reconciliation, storage failure rollback, resource disposal, retry, or first-bootstrap-frame correlation.