# Project breakdown: The Unmapped House browser save convergence and reset

**Timestamp:** `2026-07-12T23-20-51-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Source revision reviewed:** `50f316e482082e6fafb02a8788882240f0b38fe7`

## Summary

This documentation-only pass identifies a missing browser-save commit and reset authority. The game writes complete mutable snapshots directly to one `localStorage` key without a revision, writer, expected predecessor, conflict result or durable readback. It also ignores `storage` events. Concurrent tabs can overwrite each other's clues, inspections, route and log, while a stale tab can republish pre-reset state after another tab deletes the save.

## Plan ledger

**Goal:** make every save and reset one revisioned, cross-tab-convergent transaction whose durable commit matches the visible story frame.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible central entry.
- [x] Trace boot, save, inspection, Continue, reset, reload and cross-tab failure paths.
- [x] Preserve all 24 implemented kits and their offered services.
- [x] Define save identity, predecessor admission, storage delivery, reset tombstone, failure result and visible-frame contracts.
- [x] Add the timestamped architecture and system audit family.
- [x] Change documentation only.
- [ ] Implement and execute browser storage convergence fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

TheUnmappedHouse   2026-07-12T20-51-16-04-00 selected
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-31-40-04-00
IntoTheMeadow      2026-07-12T21-40-09-04-00
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-44-30-04-00
ZombieOrchard      2026-07-12T23-00-53-04-00
MyCozyIsland       2026-07-12T23-08-37-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
boot
  -> create defaults
  -> parse and shallow-merge one localStorage value
  -> resolve current scene
  -> render stage, controls and Notebook
  -> write the complete mutable state back to storage

inspection or Continue
  -> mutate the in-memory aggregate first
  -> update visible DOM or stage
  -> stringify and replace the whole saved snapshot
  -> publish no revision, commit result or readback receipt

KeyR reset
  -> remove the shared storage key
  -> reload only the current tab
  -> publish no reset generation or tombstone
  -> notify no other live tab

another tab
  -> keeps its independent in-memory state
  -> ignores storage changes
  -> may later save a stale complete snapshot
```

## Domains in use

```txt
browser application shell
fixed 16:9 composition
authored story and render descriptors
inspection, clues, route, log and completion
browser localStorage persistence and destructive reset
completion timer, interlude and terminal projection
DOM pointer, keyboard and focus behavior
Three.js WebGL presentation
hotspot raycast and camera parallax
render target and post-processing
browser callback lifetime
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing persistence authority:

```txt
save session, writer and command identity
canonical snapshot revision and fingerprint
expected-predecessor admission
durable write/readback result
write-failure result and recovery policy
storage-event envelope, deduplication and monotonic admission
cross-tab reconciliation
reset generation and durable tombstone
stale-writer and reset-resurrection rejection
save/reset observations and bounded journal
first visible durable-save/reset frame acknowledgements
browser and Pages storage-convergence fixtures
```

## Implemented kits and services

The repository retains 24 implemented source-backed kit surfaces:

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

Their services cover page mounting, fixed-aspect framing, authored scenes, routing, inspection, clue grants, Notebook logging, delayed interludes, terminal copy, whole-document browser persistence, reset/reload, Three.js stage construction, procedural materials, post-processing, hotspot volumes, raycast picking, camera parallax, debug projection, syntax checks, Pages deployment and audit tracking.

## Main findings

### Concurrent complete-snapshot writes lose updates

Each tab independently reads a snapshot, mutates it and replaces the entire storage value. No expected predecessor or conflict check exists.

```txt
Tab A and Tab B both begin from snapshot R
Tab A grants clue A and writes snapshot A
Tab B grants clue B and writes snapshot B
last writer wins
one clue, inspection and log branch disappears
```

### Storage delivery is ignored

No `storage` listener reconciles a newer commit, detects reset or rejects stale local state. A live tab can remain visually and logically behind the durable snapshot indefinitely.

### Reset can be resurrected

`KeyR` removes the shared key and reloads one tab. Another open tab retains the predecessor state and can republish it on its next inspection or scene transition. There is no durable reset tombstone or reset generation to reject that write.

### Save failure can leave visible state ahead of durability

Mutations and DOM projection occur before `localStorage.setItem()`. Storage exceptions are not converted into a typed result or rollback. The player can see a clue, route or scene that was never durably committed.

### No commit-to-frame provenance

The Notebook exposes story facts but no save revision, commit ID, writer, fingerprint, storage result or first-visible durable-frame acknowledgement.

## Required parent domain

```txt
the-unmapped-house-browser-save-commit-reset-convergence-authority-domain
```

Required transaction:

```txt
StorySaveCommitCommand
  -> validate writer, command, story-run and snapshot schema
  -> require the expected predecessor revision/fingerprint
  -> derive one normalized immutable successor
  -> allocate one monotonic revision and content fingerprint
  -> write durable bytes
  -> read back and verify the exact commit
  -> publish StorySaveCommitResult
  -> deliver one commit envelope to other tabs
  -> admit storage delivery monotonically and deduplicate it
  -> project the committed state
  -> acknowledge the first matching visible frame

StoryResetCommand
  -> validate expected predecessor and reset generation
  -> commit a durable reset tombstone
  -> invalidate stale writers and pending save work
  -> converge all tabs on the reset snapshot
  -> publish StoryResetResult
  -> acknowledge the first reset frame
```

## Proof boundary

No runtime JavaScript, browser save behavior, story content, rendering, dependency, package script or deployment workflow was changed. No multi-tab, quota-failure, reset-resurrection or Pages fixture was executed.