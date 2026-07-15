# Current audit: The Unmapped House story save writer revision authority

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-save-writer-lease-revision-authority-audited`  
**Branch:** `main`

## Summary

The story runtime loads one fixed localStorage slot into a document-local mutable object and replaces the entire slot after inspections, route changes and initial boot. The repository has no cross-document writer identity, durable save revision, base-revision compare-and-swap, writer lease, reset tombstone, conflict result or head synchronization. A stale open tab can therefore regress newer progress or recreate pre-reset progress.

## Plan ledger

**Goal:** require one typed durable result for each story save or reset while keeping story truth independent of the localStorage adapter.

- [x] Compare all Publish repositories and central ledgers.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect shell, runtime, story descriptors, StageKit, package and retained audit state.
- [x] Identify the interaction loop, domains, all 24 implemented kits and all offered services.
- [x] Trace every save-producing action and the reset path.
- [x] Define slot, writer, lease, revision, reset, conflict and proof surfaces.
- [x] Add timestamped audit documents.
- [x] Change documentation only.
- [ ] Implement and execute multi-document save fixtures.

## Complete interaction loop

```txt
boot
  -> load the fixed save key once
  -> shallow-merge parsed fields onto initial state
  -> resolve current scene
  -> create Three.js stage and hotspot volumes
  -> render scene title text hotspot buttons and Notebook
  -> replace the save key with the document-local state

inspection
  -> DOM or canvas input resolves hotspot
  -> inspectHotspot accepts first or repeated inspection
  -> mutate inspected clues text and log
  -> render accepted document-local state
  -> replace the entire save key

completion and route
  -> schedule and open interlude
  -> Continue advances scene or terminal copy
  -> load successor visible stage when present
  -> replace the entire save key

reset
  -> KeyR removes the shared key
  -> reload creates and writes initial state

multi-document conflict
  -> another open document still holds an older state
  -> its next accepted action writes the older whole-state base
  -> newer durable route clues or reset can be lost
```

## Domains in use

```txt
static browser shell and document lifecycle
story state scenes clues inspections route interlude and terminal state
DOM keyboard pointer and canvas interaction
localStorage persistence and same-origin cross-document visibility
save slot writer generation lease revision conflict reset and recovery admission
fixed-aspect viewport and semantic UI projection
Three.js scene camera materials shaders raycasting and WebGL rendering
post-processing and camera parallax
syntax validation static artifact and Pages deployment
repo-local and central audit governance
```

## Implemented kits and services

- `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label and interlude.
- `aspect-frame-kit`: fixed design aspect, window-fit calculation and DOM frame placement.
- `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials and post descriptors.
- `browser-story-runtime-kit`: state boot, scene resolution, inspection, continue, reset, UI projection and persistence calls.
- `scene-route-kit`: scene ID resolution and authored-order advancement.
- `inspection-ledger-kit`: scene-keyed inspected hotspot state.
- `clue-ledger-kit`: clue grant and clue query.
- `notebook-log-kit`: prepend narrative log and bounded retention.
- `interlude-timer-kit`: delayed completion interlude.
- `terminal-route-kit`: prototype-complete DOM projection.
- `localstorage-save-kit`: parse, shallow merge, whole-slot replacement and delete.
- `stage-render-kit`: WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF.
- `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot and post configuration.
- `anime-material-kit`: procedural shader materials and elapsed-time animation.
- `post-process-kit`: animated grain, vignette, chromatic shift, distortion and scan lines.
- `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
- `hotspot-picking-kit`: coordinate normalization, raycast and hotspot dispatch.
- `camera-parallax-kit`: pointer-driven fixed-camera offsets.
- `render-target-composition-kit`: offscreen stage pass, post pass and target sizing.
- `debug-json-projection-kit`: story-field serialization and Notebook projection.
- `package-syntax-check-kit`: Node syntax checks.
- `static-pages-deploy-kit`: static Pages delivery.
- `repo-local-agent-ledger-kit`: root pointers and timestamped audit records.
- `central-ledger-sync-kit`: central selection mirror and findings history.

```txt
implemented kits: 24
planned save-writer authority surfaces: 20
```

## Main findings

- `SAVE_KEY` identifies one shared durable slot for every same-origin document.
- `loadState()` reads the slot only during document boot.
- `saveState()` returns no result and unconditionally replaces the whole slot.
- Accepted first and repeated inspections call `saveState()`.
- Accepted scene changes call `saveState()`.
- Initial boot calls `saveState()` even when no gameplay action occurred.
- KeyR deletes the shared slot, but no reset epoch prevents an older tab from recreating prior progress.
- No `storage` listener or BroadcastChannel reconciles external head changes.
- No writer ID, writer generation, lease, save revision, base revision or compare-and-swap token exists.
- No stale-write, conflict, reset, retirement or durable-frame acknowledgement exists.

## Required authority

```txt
the-unmapped-house-story-save-writer-lease-revision-authority-domain
```

```txt
StorySaveCommitCommand
  -> bind slot document writer generation lease commit and base revision
  -> validate the candidate story envelope
  -> classify active read-only retiring reset and conflicted writers
  -> read and verify the current durable head
  -> compare-and-swap one monotonic revision
  -> reject stale duplicate expired reset-invalidated and superseded work
  -> preserve and verify the predecessor
  -> broadcast the accepted head
  -> publish StorySaveCommitResult or StorySaveConflictResult
  -> publish StorySaveResetResult with a durable reset epoch
  -> publish FirstDurableStorySaveAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story data, persistence behavior, rendering, dependencies, scripts, workflow and deployment did not change. No multi-tab, reset-resurrection, writer-lease, compare-and-swap, artifact or Pages fixture was run.