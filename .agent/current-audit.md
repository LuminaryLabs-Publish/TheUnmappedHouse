# Current audit: The Unmapped House

Timestamp: `2026-07-11T21-48-44-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, a fixed 16:9 shell, side-panel inspection buttons, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** make authored story content an admitted runtime authority with stable identity, explicit progression, canonical lookup, immutable descriptors and render-consumption proof.

- [x] Trace story-data export, raw save hydration, current-scene fallback, scene completion, Continue, terminal projection, side-panel descriptor closures, StageKit scene consumption and hotspot `userData`.
- [x] Confirm the runtime has no root manifest object, schema version, canonical indexes, explicit successor graph, deep freeze, fingerprint or typed admission result.
- [x] Inventory all active domains, all 24 implemented kits, and their services.
- [x] Define manifest schema, canonicalization, indexing, graph, ownership, render-descriptor validation, freeze, fingerprint, result, observation, journal and fixture kits.
- [ ] Implement StoryManifest, StorySnapshot, pointer/pick, inspection, transition, lifecycle, surface, context-recovery and committed-frame authorities.
- [ ] Run schema, duplicate-id, requirement-ownership, graph, freeze, fingerprint and render-parity fixtures.

## Interaction loop

```txt
module evaluation
  -> export gameTitle and mutable scenes array
  -> parse raw localStorage object
  -> shallow-merge persisted fields over defaults
  -> find scene by persisted sceneId
  -> fall back visually to scenes[0] when not found
  -> keep the unreconciled persisted sceneId in state
  -> construct StageKit before content admission exists
  -> pass the selected mutable scene descriptor into StageKit
  -> attach mutable hotspot descriptor references to mesh.userData
  -> close side-panel buttons over the same hotspot objects

inspection
  -> mutate global clues and scene-keyed inspected state
  -> evaluate scene requirements through global clue strings

Continue
  -> find current scene array index
  -> use scenes[index + 1] as successor
  -> infer terminal state from missing next array element
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, side panel, hotspot list, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Separate title export plus mutable scene, hotspot, clue, stage, camera, material, post, requirement and interlude descriptors. |
| `src/game.js` | Raw load, fallback scene resolution, mutable story state, inspection, completion, array-order Continue, reset, projection, persistence, and StageKit calls. |
| `src/stage-kit.js` | Renderer, scene, camera, target, mutable scene descriptor reference, materials, hotspot volumes, descriptor-bearing `userData`, pointer listeners, resize, live replacement and RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and CSS frame fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story source descriptors
raw browser storage and mutable story state
scene route, inspection, clue, flags and notebook log
scene completion, interlude timing, Continue and terminal projection
DOM, hover, interlude and debug projection
Three.js CDN runtime
WebGL renderer, scene, camera, lights, target and post composition
live scene replacement and procedural geometry allocation
procedural anime shader materials
hotspot volume creation and descriptor-bearing userData
mousemove observation, canvas click and side-panel activation
pointer camera parallax
resize event admission and render-surface mutation
recursive RAF and visible frame submission
runtime callback and resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical StoryManifest root
manifest id, schema version and fingerprint
canonical scene, hotspot and clue indexes
explicit successor graph and terminal descriptor
requirement ownership and reachability validation
render descriptor schema and capability admission
deep-frozen descriptor graph
typed manifest admission result
legacy story-data compatibility adapter
manifest observation and bounded journal
manifest-to-stage and manifest-to-frame provenance
manifest fixture and deployed parity gate
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply mouse-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: authored content is ambient mutable authority

### There is no root manifest

`gameTitle` and `scenes` are separate exports. No object binds title, schema version, story identity, initial scene, terminal policy, scene graph or content fingerprint.

### Scene progression is array position

`nextScene()` calls `findIndex()` and selects `scenes[index + 1]`. Reordering or inserting scenes changes the progression graph and old-save interpretation without a declared migration.

### Startup fallback does not reconcile state

An unknown persisted `sceneId` renders `scenes[0]`, but `state.sceneId` remains the unknown value and is saved again. Visible story authority and persisted story authority can therefore disagree from the first frame.

### Definitions are shared by reference

StageKit stores the supplied scene object, hotspot meshes store complete hotspot objects in `userData`, and side-panel buttons capture complete hotspot objects. The same mutable source descriptors act as content, render input and interaction authority.

### Requirements are not admitted

No validation proves:
- scene ids are unique;
- hotspot ids are unique inside their scene;
- grants resolve to known clue ids;
- each required clue is reachable and correctly owned;
- every nonterminal scene has one valid successor;
- terminal scenes are explicit;
- camera vectors, geometry dimensions, material colors and post values are finite and supported.

### Rendering cannot cite content identity

A visible frame has no manifest id, version, fingerprint, scene descriptor hash, hotspot-set hash or stage-plan receipt.

## Required parent domain

```txt
the-unmapped-house-story-manifest-authority-domain
```

Candidate kits:

```txt
story-manifest-schema-kit
story-manifest-id-kit
story-manifest-version-kit
story-manifest-canonicalization-kit
story-scene-index-kit
story-hotspot-index-kit
story-clue-index-kit
story-successor-graph-kit
story-terminal-descriptor-kit
story-requirement-ownership-kit
story-render-descriptor-schema-kit
story-manifest-deep-freeze-kit
story-manifest-fingerprint-kit
story-manifest-admission-kit
story-manifest-result-kit
legacy-story-data-adapter-kit
story-manifest-observation-kit
story-manifest-journal-kit
story-manifest-fixture-kit
story-manifest-render-parity-fixture-kit
```

## Required StoryManifest shape

```txt
StoryManifest
  manifestId
  schemaVersion
  contentVersion
  title
  initialSceneId
  terminalPolicy
  scenes[]
  sceneIndex
  hotspotIndexByScene
  clueIndex
  successorGraph
  requirementOwnership
  renderDescriptorCapabilities
  fingerprint
```

## Required authority flow

```txt
legacy story-data exports
  -> build manifest candidate
  -> structural validation
  -> semantic validation
  -> canonicalize order and ids
  -> build indexes and successor graph
  -> validate clue reachability and requirement ownership
  -> validate render descriptors and supported capabilities
  -> deep-freeze the complete graph
  -> compute deterministic fingerprint
  -> publish ManifestAdmissionResult
  -> only then hydrate StorySnapshot and allocate StageKit
```

## Ordered implementation queue

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. InspectionCommand, receipts, clue provenance and scene-completion proof
5. Atomic Continue transition and first-visible-frame acknowledgement
6. Runtime session lifecycle and scene-resource retirement
7. Render Surface Resolution Authority
8. WebGL Context Recovery Authority
9. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse StoryManifest Authority
+ Schema / Canonical Index / Successor Graph / Freeze / Fingerprint / Render-Parity Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves schema validity, unique ids, clue ownership, explicit progression, terminal declaration, stable fingerprinting, descriptor immutability, old-save compatibility or manifest-to-visible-frame parity.
