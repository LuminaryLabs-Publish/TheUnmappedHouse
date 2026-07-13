# START HERE: The Unmapped House Browser Save Commit and Reset Convergence Authority

Last updated: `2026-07-12T23-20-51-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, local browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates browser-save ordering and destructive reset. Every interaction mutates a tab-local story aggregate and replaces one complete `localStorage` snapshot without a revision, writer, expected predecessor, conflict result or verified readback. The runtime ignores `storage` events, and `KeyR` only deletes the shared key before reloading the current tab. Concurrent tabs can lose clues or route progress, a stale tab can resurrect reset data, and storage failure can leave the visible scene ahead of durable state.

## Plan ledger

**Goal:** make every save and reset one revisioned, cross-tab-convergent transaction whose durable commit matches the visible story frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible central entry.
- [x] Trace boot, inspection, Continue, save, reset, reload and cross-tab failure paths.
- [x] Identify the complete interaction loop, all active domains, all 24 implemented kits and every offered service.
- [x] Define save identity, predecessor admission, durable readback, storage delivery, reset tombstone and visible-frame contracts.
- [x] Add a timestamped tracker and architecture/system audit family.
- [x] Refresh all required root `.agent` files and the machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable storage-convergence fixtures remain future work.

## Selection

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

## Active persistence loop

```txt
boot
  -> parse and shallow-merge one localStorage value
  -> resolve and render the current scene
  -> immediately replace the complete stored snapshot

inspection or Continue
  -> mutate tab-local state first
  -> update DOM and StageKit
  -> replace the complete stored snapshot
  -> publish no revision or terminal save result

KeyR reset
  -> remove the shared key
  -> reload only this tab
  -> publish no reset generation or tombstone

another live tab
  -> receives no admitted storage update
  -> retains predecessor state
  -> can later overwrite or recreate the shared save
```

## Main findings

1. Two tabs can read the same predecessor and write different complete successors. The last write silently removes the other tab's clues, inspections, route and log.
2. No `storage` listener deduplicates, orders or reconciles remote commits or resets.
3. Reset is represented only by key absence. Another tab can republish its pre-reset in-memory snapshot and recreate the save.
4. Story mutation and visible projection occur before `localStorage.setItem()`. An exception can leave the stage and Notebook ahead of the durable snapshot.
5. No save revision, commit ID, writer, predecessor fingerprint, reset generation or durable readback is exposed.
6. No first-visible-frame acknowledgement proves that the visible scene matches the accepted durable commit.

## Required authority

```txt
the-unmapped-house-browser-save-commit-reset-convergence-authority-domain
```

It must own save session/writer/command identity, canonical snapshot revision and fingerprint, expected-predecessor admission, durable write/readback, typed failure results, storage-event envelopes, deduplication, monotonic cross-tab reconciliation, reset generations and tombstones, stale-writer and reset-resurrection rejection, bounded observations and first-visible save/reset frame acknowledgements.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T23-20-51-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T23-20-51-04-00-browser-save-convergence-reset-dsk-map.md`
5. `persistence-audit/2026-07-12T23-20-51-04-00-revision-storage-event-reset-tombstone-contract.md`
6. `interaction-audit/2026-07-12T23-20-51-04-00-save-commit-reset-delivery-map.md`
7. `gameplay-audit/2026-07-12T23-20-51-04-00-multi-tab-lost-update-reset-resurrection-loop.md`
8. `render-audit/2026-07-12T23-20-51-04-00-durable-save-visible-story-gap.md`
9. `next-steps.md`
10. `validation.md`

## Next safe ledge

Introduce a pure canonical snapshot encoder and a `StorySaveCommitCommand` carrying `writerId`, `commandId`, expected save revision and expected fingerprint. Add a two-tab fixture before changing gameplay: one same-predecessor write must conflict, and a stale tab must be unable to recreate state after a reset tombstone.