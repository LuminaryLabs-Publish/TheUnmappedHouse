# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T04-44-36-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The current audit isolates browser-storage commit and cross-tab convergence. `src/game.js` loads one localStorage value at module startup, shallow-merges it over defaults, owns one mutable story aggregate and writes the full aggregate after startup, inspection and Continue. The write and reset paths return no result and are not failure-contained. There is no durable revision, writer identity, compare-and-swap admission, conflict policy, storage-event reconciliation or reset barrier.

## Plan ledger

**Goal:** define one authoritative storage transaction from capability observation and snapshot revision through commit admission, conflict handling, reset propagation, durable readback and visible-state correlation.

- [x] Compare the full Publish inventory against central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip `ZombieOrchard` because newer repo-local documentation indicates concurrent work.
- [x] Select only `TheUnmappedHouse` as the oldest stable eligible repository.
- [x] Inspect `src/game.js`, `src/story-data.js`, `src/stage-kit.js`, `package.json` and current audit state.
- [x] Trace boot load/write, inspection writes, Continue writes and reset.
- [x] Confirm no writer identity, snapshot revision, expected predecessor revision or conflict result exists.
- [x] Confirm no `storage` event listener or cross-tab reconciliation exists.
- [x] Confirm `setItem` and `removeItem` failures are not caught.
- [x] Inventory all active domains, all 24 implemented kits and offered services.
- [x] Define storage commit, conflict, reset, observation and fixture kits.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
ZombieOrchard: skipped because repo-local docs advanced to 2026-07-12T04-38-12-04-00 during central lag
TheUnmappedHouse: selected as the oldest stable eligible repository
TheCavalryOfRome: excluded
```

## Product and interaction loop

```txt
module boot
  -> import authored scenes and StageKit
  -> load localStorage key once
  -> shallow-merge parsed fields over initial state
  -> resolve currentScene with fallback
  -> construct StageKit and renderer graph
  -> load current scene
  -> project DOM/debug state
  -> save the full mutable state immediately

inspection
  -> mutate inspected map
  -> grant global clues
  -> mutate log and narrative copy
  -> possibly schedule interlude
  -> project DOM/debug state
  -> save full mutable state

Continue
  -> derive successor by array order
  -> mutate sceneId, route and log
  -> replace stage scene resources
  -> project DOM/debug state
  -> save full mutable state

reset
  -> localStorage.removeItem
  -> location.reload

other browser tab
  -> loads its own independent mutable copy
  -> does not subscribe to storage changes
  -> can later save a stale full aggregate
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage, story panel, notebook/debug panel, interlude and Continue button. |
| `src/story-data.js` | Three scenes, nine hotspots, clues, camera, stage and post descriptors. |
| `src/game.js` | Mutable story state, load/save/reset, inspection, completion, Continue and DOM/debug projection. |
| `src/stage-kit.js` | Three.js resource graph, scene loading, picking, resize and recursive frame submission. |
| `src/aspect-frame.js` | Fixed 1920 by 1080 composition. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage read, write and reset effects
mutable story snapshot ownership
scene routing, inspection, clues, flags, route and log
completion and interlude timing
synchronous DOM narrative projection
synchronous debug JSON projection
Three.js CDN runtime
WebGL renderer, target, scene, camera, lights and post composition
live scene replacement and procedural resource allocation
hotspot volumes, raycasting and camera parallax
resize, input and recursive RAF callbacks
syntax validation, Pages deployment and audit tracking
```

Missing authority domains:

```txt
storage capability and failure classification
writer session and durable snapshot revision
storage commit admission and compare-and-swap
cross-tab conflict detection and reconciliation
reset barrier and propagation
volatile-session policy
storage observation and bounded journal
narrative/frame correlation with durable revision
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspection, completion, Continue, reset-by-reload, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Allocate procedural shader materials and advance time uniforms. |
| `post-process-kit` | Allocate and render grain, vignette, chromatic, distortion, memory and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate mutable story state into the notebook panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding

### Durable effects are unobserved

`saveState()` calls `localStorage.setItem()` directly and returns nothing. Reset calls `removeItem()` directly and then reloads. A quota, security or serialization failure can propagate after live story and visible UI state have already changed.

### Stale full-state writers are admissible

Every tab owns an independent mutable aggregate and writes the complete object. With no expected predecessor revision or compare-and-swap, a stale tab can overwrite newer clues, inspections, route and log rows.

### Cross-tab events are ignored

No `storage` listener validates or reconciles remote changes. Reset in one tab does not retire stale state in another tab, and the stale tab can later recreate the removed snapshot.

### Startup claims no durable mode

Boot always calls `saveState()` after stage and UI initialization. There is no typed distinction between durable mode, volatile in-memory mode, rejected stale state or unavailable storage.

## Required parent domain

```txt
the-unmapped-house-story-storage-commit-convergence-authority-domain
```

Candidate kits:

```txt
story-storage-key-kit
storage-capability-observation-kit
storage-writer-session-id-kit
story-snapshot-revision-kit
storage-read-command-kit
storage-read-result-kit
storage-commit-command-kit
storage-commit-admission-kit
storage-compare-and-swap-kit
storage-conflict-detection-kit
storage-conflict-policy-kit
storage-merge-plan-kit
storage-commit-result-kit
storage-reset-command-kit
storage-reset-result-kit
storage-event-adapter-kit
cross-tab-reconciliation-kit
storage-effect-journal-kit
storage-observation-kit
storage-unavailable-fixture-kit
cross-tab-lost-update-fixture-kit
reset-propagation-fixture-kit
browser-storage-convergence-smoke-kit
```

## Required transaction

```txt
CommitStorySnapshotCommand
  -> validate runtime session, manifest and writer identity
  -> cite expected predecessor revision
  -> observe current durable revision
  -> reject, merge or supersede under one named policy
  -> serialize one immutable candidate
  -> attempt and verify storage effect
  -> return one StorageCommitResult
  -> publish detached observation and journal row
  -> correlate narrative and future frames with durable or volatile status
```

## Ordered implementation queue

```txt
1. StoryManifest Authority
2. StorySnapshot startup authority
2a. Browser Storage Commit and Cross-Tab Convergence Authority
3. Pointer and hotspot-pick authority
4. Inspection and completion authority
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Validation boundary

Documentation only. Runtime source, story content, storage behavior, rendering, package scripts, dependencies and deployment were not changed. No current fixture proves write-failure containment, stale-writer rejection, cross-tab convergence or reset propagation.
