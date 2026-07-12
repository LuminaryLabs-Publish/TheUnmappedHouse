# START HERE: The Unmapped House

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Last updated:** `2026-07-12T04-44-36-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a fixed 16:9 shell, side-panel inspection buttons and a descriptor-driven Three.js stage.

The current audit isolates browser-storage commit and cross-tab convergence. Story state is loaded once, held as one mutable module aggregate and written as a full JSON value after startup, inspection and Continue. Writes and reset are not failure-contained, snapshots have no durable revision or writer identity, and no `storage` listener reconciles other tabs. A stale tab can therefore replace newer progress without a conflict result.

## Plan ledger

**Goal:** make persistence one failure-aware, revisioned transaction so visible story state, durable state, reset and concurrent tabs converge on an explicit accepted result.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect newer concurrent work in `ZombieOrchard` and avoid overwriting it.
- [x] Select only `TheUnmappedHouse` as the oldest stable eligible repository.
- [x] Trace startup load/write, inspection writes, Continue writes and reset.
- [x] Identify all active domains, all 24 implemented kits and offered services.
- [x] Confirm no writer identity, durable revision, compare-and-swap, conflict result or cross-tab reconciliation exists.
- [x] Confirm storage writes and reset can throw after live state has changed.
- [x] Define the storage commit, conflict, reset and browser fixture boundary.
- [x] Refresh the required root `.agent` files and add a timestamped audit family.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Current interaction loop

```txt
boot
  -> load and shallow-merge one localStorage value
  -> select current scene
  -> create StageKit and load scene
  -> project DOM/debug state
  -> write the full state immediately

inspection
  -> mutate inspected, clues and log
  -> project DOM/debug state
  -> write the full state

Continue
  -> mutate scene, route and log
  -> replace stage resources
  -> project DOM/debug state
  -> write the full state

reset
  -> remove storage key
  -> reload current tab

another tab
  -> retains an independent stale mutable copy
  -> receives no reconciliation
  -> may overwrite the newer full snapshot
```

## Main finding

```txt
storage capability result: absent
snapshot revision: absent
writer/session identity: absent
expected predecessor revision: absent
compare-and-swap admission: absent
conflict classification: absent
merge policy: absent
storage-event reconciliation: absent
write result/readback: absent
reset result/barrier: absent
volatile-session policy: absent
bounded storage journal: absent
```

`loadState()` catches parse/read failure, but `saveState()` and reset do not catch `setItem` or `removeItem` failures. The runtime can therefore mutate story, DOM or stage state and then fail the durable effect without a typed outcome.

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story and render descriptors
raw localStorage read/write/reset effects
mutable story state
scene route, inspection, clues, log and completion
DOM narrative and debug JSON projection
interlude timing and terminal copy
Three.js CDN runtime
WebGL renderer, target, stage and post passes
scene replacement and procedural resource allocation
hotspot volumes, picking and camera parallax
resize, input and recursive RAF callbacks
repo-local and central audit tracking
syntax checks and Pages deployment
```

Missing or planned authority domains include:

```txt
versioned StoryManifest and StorySnapshot
storage commit and cross-tab convergence
inspection, transition and narrative results
runtime and resource generations
render surface and WebGL context generations
committed frame diagnostics
```

## Implemented kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Services cover shell composition, story descriptors, mutable progression, inspection, clue and route tracking, persistence, scene construction, procedural materials, picking, parallax, two-pass rendering, narrative/debug projection, validation, deployment and audit tracking.

## Required parent domain

```txt
the-unmapped-house-story-storage-commit-convergence-authority-domain
```

## Required transaction

```txt
CommitStorySnapshotCommand
  -> validate runtime, manifest, writer and expected predecessor revision
  -> observe the current durable revision
  -> reject, merge or supersede under one named conflict policy
  -> serialize one immutable candidate
  -> attempt and verify the storage effect
  -> return one StorageCommitResult
  -> publish detached storage observation and journal row
  -> correlate narrative and future frames with durable or volatile status
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T04-44-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T04-44-36-04-00.md
.agent/architecture-audit/2026-07-12T04-44-36-04-00-story-storage-convergence-dsk-map.md
.agent/render-audit/2026-07-12T04-44-36-04-00-durable-state-visible-projection-gap.md
.agent/gameplay-audit/2026-07-12T04-44-36-04-00-cross-tab-lost-progress-loop.md
.agent/interaction-audit/2026-07-12T04-44-36-04-00-storage-command-result-map.md
.agent/storage-authority-audit/2026-07-12T04-44-36-04-00-revision-conflict-reset-contract.md
.agent/deploy-audit/2026-07-12T04-44-36-04-00-browser-storage-convergence-fixture-gate.md
```

Do not treat a successful in-memory mutation or DOM update as proof of durable progress. Completion requires typed storage results, revision conflict handling, reset propagation and multi-tab browser proof.
