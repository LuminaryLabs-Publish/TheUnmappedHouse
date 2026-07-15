# Project breakdown: The Unmapped House story save writer revision authority

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-save-writer-lease-revision-authority-audited`

## Summary

The Unmapped House is a dependency-light static browser story with three authored scenes, nine hotspots, clue-driven completion, DOM controls, localStorage persistence and a descriptor-driven Three.js stage. The current save owner loads one mutable story object per document and replaces one fixed localStorage slot after inspections, scene changes, reset recovery and initial boot.

The audit found no cross-document writer identity, monotonic save revision, base-revision comparison, lease, reset tombstone, storage-event reconciliation or conflict result. Two open tabs can therefore hold different valid snapshots and the later writer can replace newer story progress with an older whole-state object.

## Plan ledger

**Goal:** preserve the current story model while making every durable save and reset a monotonic, revision-bound transaction across tabs and document generations.

- [x] Compare the complete 11-repository Publish inventory with the central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm the freshest central comparison reported no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Inspect the HTML shell, story runtime, save calls, reset path, stage, story descriptors, package scripts and retained audit state.
- [x] Identify the complete interaction loop, all domains, all 24 implemented kits and every offered service.
- [x] Trace multi-tab progress, stale-write and reset-resurrection paths.
- [x] Define a save-slot writer lease and monotonic revision authority.
- [x] Add one timestamped tracker, turn ledger and focused audit family.
- [x] Change documentation only.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute multi-tab, reset, conflict, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
undocumented eligible repositories: 0
runtime-ahead eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheUnmappedHouse
selection reason: oldest synchronized eligible repository
prior central timestamp: 2026-07-15T12-59-24-04-00
selection evidence: the 2026-07-15T17-38-05-04-00 ZombieOrchard ledger identified TheUnmappedHouse as the next-oldest synchronized entry
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
boot
  -> parse one fixed localStorage slot
  -> shallow-merge parsed fields onto the initial story state
  -> resolve the current scene
  -> construct StageKit and hotspot volumes
  -> render story controls and Notebook
  -> unconditionally replace the save slot with the document-local state

inspection
  -> DOM button or canvas hotspot dispatches inspectHotspot
  -> mutate inspected state clues text and Notebook log
  -> render the document-local state
  -> replace the entire localStorage slot

scene completion
  -> delayed interlude opens
  -> Continue advances the document-local route
  -> replace the entire localStorage slot

reset
  -> KeyR removes the shared slot
  -> reload creates and writes a fresh initial state

cross-document path
  -> tab A and tab B load the same revision
  -> A advances and writes a newer whole-state snapshot
  -> B retains its older in-memory object
  -> B performs any later inspection or route write
  -> B replaces the shared slot with its older base plus local mutation
  -> A's newer scene route clues or reset can be lost
```

## Source-backed save facts

```txt
save slot: the-unmapped-house.stage-prototype.v1
load frequency: once per document boot
save shape: JSON.stringify of the whole mutable state object
write primitive: localStorage.setItem
reset primitive: localStorage.removeItem followed by reload
inspection save: yes
scene-transition save: yes
initial boot save: yes
storage event listener: absent
BroadcastChannel: absent
writer identity: absent
writer generation: absent
save revision: absent
base revision: absent
compare-and-swap token: absent
writer lease: absent
reset tombstone: absent
conflict result: absent
first durable save acknowledgement: absent
multi-tab fixture: absent
```

## Domains in use

```txt
static browser shell and document lifecycle
story descriptors scenes clues inspections route interlude and terminal state
DOM keyboard pointer and canvas interaction
localStorage parsing replacement deletion and cross-document visibility
save-slot identity writer identity revision admission conflicts reset and recovery
fixed-aspect viewport and semantic UI projection
Three.js scene camera materials shaders raycasting and WebGL rendering
post-processing camera parallax and render-target composition
syntax validation static artifact Pages deployment repo-local audit and central tracking
```

## Implemented kits and offered services

1. `static-page-shell-kit`: stage mount, story panel, hotspot list, Notebook, hover label and interlude.
2. `aspect-frame-kit`: fixed design aspect, window-fit calculation and DOM frame placement.
3. `story-data-kit`: scene descriptors, hotspots, clue grants, completion rules, camera, materials and post descriptors.
4. `browser-story-runtime-kit`: state boot, scene resolution, inspection, continue, reset, UI projection and persistence calls.
5. `scene-route-kit`: scene ID resolution and authored-order advancement.
6. `inspection-ledger-kit`: scene-keyed inspected hotspot state.
7. `clue-ledger-kit`: clue grant and clue query.
8. `notebook-log-kit`: prepend narrative log and bounded retention.
9. `interlude-timer-kit`: delayed completion interlude.
10. `terminal-route-kit`: prototype-complete DOM projection.
11. `localstorage-save-kit`: parse, shallow merge, whole-slot replacement and delete.
12. `stage-render-kit`: WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF.
13. `scene-descriptor-consumer-kit`: camera, geometry, material, hotspot and post configuration.
14. `anime-material-kit`: procedural shader materials and elapsed-time animation.
15. `post-process-kit`: animated grain, vignette, chromatic shift, distortion and scan lines.
16. `hotspot-volume-kit`: invisible raycast volumes and descriptor attachment.
17. `hotspot-picking-kit`: coordinate normalization, raycast and hotspot dispatch.
18. `camera-parallax-kit`: pointer-driven fixed-camera offsets.
19. `render-target-composition-kit`: offscreen stage pass, post pass and target sizing.
20. `debug-json-projection-kit`: story-field serialization and Notebook projection.
21. `package-syntax-check-kit`: Node syntax checks for all runtime modules.
22. `static-pages-deploy-kit`: static GitHub Pages delivery from `main`.
23. `repo-local-agent-ledger-kit`: root pointers and timestamped audit records.
24. `central-ledger-sync-kit`: central selection mirror and findings history.

```txt
implemented source-backed kits: 24
planned save-writer authority surfaces: 20
```

## Main finding

The save slot is durable, but save acceptance is not ordered. Every document trusts its own in-memory state and can replace the shared slot without proving that its base is still current. A checksum is not present, but even schema-valid JSON would not solve this ordering problem.

A permitted sequence is:

```txt
A and B load revision R1
A completes a scene and writes logical revision R2
B still holds R1
B re-reads a hotspot and writes R1 plus its local log change
shared durable head regresses from R2 to B's stale snapshot
next boot accepts the regressed route and clue state
```

Reset has the same boundary:

```txt
A and B load progressed state R5
A resets and writes a fresh state after removing the slot
B remains on R5
B later saves
progressed R5 is resurrected after the accepted reset
```

These are source-derived concurrency paths. No live multi-tab incident was reproduced.

## Required authority

```txt
the-unmapped-house-story-save-writer-lease-revision-authority-domain
```

```txt
StorySaveCommitCommand
  -> bind slot document writer generation commit ID and candidate base revision
  -> validate the candidate story envelope
  -> classify active read-only retiring reset and conflicted writers
  -> require one admitted writer lease
  -> read and verify the current durable head
  -> compare-and-swap one monotonic save revision
  -> reject stale duplicate expired reset-invalidated and superseded work
  -> preserve the predecessor and publish a recovery receipt
  -> broadcast the accepted head to other same-origin documents
  -> publish StorySaveCommitResult or StorySaveConflictResult
  -> publish StorySaveResetResult for a durable reset tombstone
  -> release writer ownership on retirement or lease expiry
  -> publish FirstDurableStorySaveAck
```

## Planned authority surfaces

1. `the-unmapped-house-story-save-writer-lease-revision-authority-domain`
2. `story-save-slot-identity-kit`
3. `document-save-writer-identity-kit`
4. `save-writer-generation-kit`
5. `save-writer-lease-admission-kit`
6. `durable-story-save-revision-kit`
7. `save-base-revision-cas-kit`
8. `story-save-fingerprint-kit`
9. `story-save-envelope-validation-kit`
10. `story-save-commit-command-kit`
11. `story-save-commit-result-kit`
12. `story-save-conflict-result-kit`
13. `storage-event-head-reconciliation-kit`
14. `cross-document-save-broadcast-kit`
15. `durable-reset-tombstone-kit`
16. `stale-writer-rejection-kit`
17. `save-writer-retirement-kit`
18. `save-predecessor-recovery-kit`
19. `first-durable-story-save-ack-kit`
20. `multi-tab-artifact-pages-save-fixture-kit`

## Validation boundary

This run changes documentation only. It does not alter JavaScript, HTML, CSS, story data, localStorage behavior, rendering, dependencies, package scripts, workflow or deployment. No multi-tab browser, reset-resurrection, lease-expiry, compare-and-swap, artifact or Pages fixture was executed.