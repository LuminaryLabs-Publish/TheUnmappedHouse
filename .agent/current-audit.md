# Current audit: The Unmapped House

Timestamp: `2026-07-11T08-11-14-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene and nine total required clues. Completion opens a delayed interlude; Continue advances to the next scene; the final Continue projects prototype-complete copy.

## Interaction loop

```txt
load `the-unmapped-house.stage-prototype.v1`
  -> JSON.parse or fall back to initial state
  -> shallow-merge parsed fields over the initial object
  -> resolve currentScene by saved sceneId or scene zero fallback
  -> leave state.sceneId unreconciled
  -> construct StageKit and start recursive RAF
  -> consume scene descriptors directly
  -> inspect via side-panel or canvas descriptor payload
  -> mutate inspections, clues and notebook log
  -> derive completion from global clue strings
  -> schedule optional 450 ms interlude
  -> write the mutable state object to localStorage
  -> Continue mutates story and live stage
  -> R clears the key and reloads
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three mutable scene descriptors, nine hotspots, requirements, copy, camera, stage, material and post data. |
| `src/game.js` | Initial state, untyped localStorage load/write/clear, current-scene fallback, inspection, clues, completion, timers, Continue and DOM projection. |
| `src/stage-kit.js` | Direct descriptor consumption, Three.js resources, pick payloads, resize/listeners and recursive RAF. |
| `src/aspect-frame.js` | Canonical fixed 1920×1080 framing and DOM sizing. |
| `package.json` | Syntax-only validation and a local static server. |

## Domains in use

```txt
browser shell
fixed-aspect layout
story source descriptors
scene order and identity
hotspot and clue identity
mutable story state
route, inspection, clue and notebook ledgers
scene completion policy
implicit story phase
interlude and terminal projection
side-panel, raycast and keyboard input
localStorage load, write and clear effects
story and debug projection
Three.js CDN runtime
stage construction and live replacement
anime materials and post processing
hotspot volumes and picking
camera parallax and render target composition
RAF, listener and stage resource lifecycle
syntax validation and Pages deployment
repo-local and central audit ledgers
```

Missing authority domains:

```txt
versioned story manifest
canonical scene/hotspot/clue indexes
manifest validation and fingerprinting
versioned StorySnapshot
save envelope and revision
save admission and typed load result
legacy save migration
persisted-state reconciliation
story-state fingerprint
bounded persistence journal
behavioral fixture execution
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel and interlude shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspect, Continue, reset, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve the active scene, retain route ids and silently fall back for unknown saved scene ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot flags. |
| `clue-ledger-kit` | Grant unique global clue strings and evaluate requirements. |
| `notebook-log-kit` | Prepend and cap recent story rows. |
| `interlude-timer-kit` | Schedule an unretained delayed DOM transition. |
| `terminal-route-kit` | Project prototype-complete copy without persisted terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, stringify, write and clear browser state without typed results. |
| `stage-render-kit` | Renderer, camera, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert mutable story descriptors directly into Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes with attached full descriptor objects. |
| `hotspot-picking-kit` | Hover and click raycasts that return descriptor payloads. |
| `camera-parallax-kit` | Pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Stage target plus post-process pass. |
| `debug-json-projection-kit` | Aggregate mutable story-state projection. |
| `package-syntax-check-kit` | Syntax-check the four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Central selection and findings history. |

## Main finding: version labels exist without version authority

`SAVE_KEY` ends in `.v1`, but the stored object has only:

```txt
sceneId
clues
flags
inspected
route
log
```

It does not carry:

```txt
schemaVersion
storyManifestId
storyManifestFingerprint
storyRevision
saveRevision
storyPhase
migrationVersion
stateFingerprint
```

`loadState()` returns `{ ...createInitialState(), ...parsedValue }`. This verifies neither the top-level object nor any field type. Concrete failure and divergence cases include:

```txt
clues is not an array
  -> `includes` fails during completion evaluation

log is not an array
  -> `unshift` fails on the next inspection

route is not an array
  -> `includes` fails on Continue

unknown sceneId
  -> currentScene displays scene zero
  -> state.sceneId remains unknown
  -> saveState writes the unknown id again

forged clue strings
  -> scene completion can become true without canonical inspections

unknown or cross-scene inspected keys
  -> retained with no ownership reconciliation
```

The catch block also collapses missing data, malformed JSON and incompatible data into the same silent reset result. `saveState()` has no error result; live state and DOM mutate before a storage write that may throw.

## Definition-integrity gap

`scenes` is an exported array of mutable nested objects. There is no startup proof for:

```txt
unique scene ids
unique hotspot ids within each scene
globally owned clue ids
requirements that resolve to scene-owned clues
valid scene order
valid camera, stage, material and post shapes
canonical serialization order
definition fingerprint
```

StageKit consumes the same descriptor objects directly, so story authority and rendered geometry have no shared immutable manifest identity.

## Required parent domain

```txt
the-unmapped-house-story-manifest-persistence-domain
```

Update existing story-data, browser-runtime, route, inspection, clue, persistence and debug kits first. Add these coordinating kits:

```txt
story-manifest-schema-kit
story-manifest-index-kit
story-manifest-fingerprint-kit
story-snapshot-schema-kit
story-snapshot-normalizer-kit
versioned-save-envelope-kit
save-admission-kit
save-reconciliation-kit
save-migration-kit
story-load-result-kit
story-save-result-kit
story-state-fingerprint-kit
story-persistence-journal-kit
manifest-persistence-fixture-kit
```

## Ordered implementation queue

```txt
1. Versioned Story Manifest and StorySnapshot
2. Save admission, migration and reconciliation
3. Inspection Command Authority
4. Atomic Story/Stage Continue Transition
5. Runtime Session Lifecycle and Resource Retirement
6. Committed frame and diagnostics proof
```

## Next safe ledge

```txt
TheUnmappedHouse Versioned Story Manifest Authority
+ Save Admission, Migration and Reconciliation Fixture Gate
```
