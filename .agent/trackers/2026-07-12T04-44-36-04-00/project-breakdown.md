# Project Breakdown: The Unmapped House Browser Storage Conflict Authority

**Timestamp:** `2026-07-12T04-44-36-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`

## Plan ledger

**Goal:** define one failure-aware, revisioned persistence transaction so startup, inspection, Continue, reset and concurrent browser tabs cannot silently overwrite story progress or leave UI state ahead of durable state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect newer concurrent repo-local work in `ZombieOrchard` and avoid overwriting it.
- [x] Select only `TheUnmappedHouse` as the oldest stable eligible repository.
- [x] Trace startup load, startup write, inspection writes, Continue writes and reset.
- [x] Identify the complete interaction loop, all domains, all 24 implemented kits and services.
- [x] Confirm persistence has no writer identity, save revision, compare-and-swap, conflict result or storage-event reconciliation.
- [x] Confirm `setItem` and `removeItem` failures are not contained.
- [x] Define browser-storage commit, conflict and convergence authority.
- [x] Add architecture, render, gameplay, interaction, storage-authority and deploy audits.
- [x] Change documentation only.
- [ ] Runtime implementation and executable storage fixtures remain future work.

## Interaction loop

```txt
boot
  -> parse one localStorage value or create defaults
  -> shallow-merge parsed fields into mutable state
  -> select a scene
  -> create StageKit and load scene resources
  -> project DOM/debug state
  -> write state back to localStorage immediately

inspection
  -> mutate inspected, clues and log
  -> project DOM/debug state
  -> write the full mutable state

Continue
  -> mutate scene, route and log
  -> replace stage resources
  -> project DOM/debug state
  -> write the full mutable state

reset
  -> remove the key
  -> reload the current document

second tab
  -> owns an independent mutable copy
  -> receives no storage-event reconciliation
  -> can overwrite newer progress with a stale full-state write
```

## Main finding

`localStorage` is treated as an infallible single-writer side effect. The runtime has no save revision, writer/session identity, compare-and-swap admission, merge policy, typed commit/reset result or cross-tab reconciliation. `saveState()` and reset call storage directly without error containment, so durable-state failure can occur after story, DOM or renderer state has already changed.

## Required parent domain

```txt
the-unmapped-house-story-storage-commit-convergence-authority-domain
```

The complete DSK map, result contracts and fixture gate are recorded in the timestamped audit set and root registry.
