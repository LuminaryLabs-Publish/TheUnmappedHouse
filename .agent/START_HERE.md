# START HERE: The Unmapped House story save writer revision authority

**Last updated:** `2026-07-15T18-02-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-save-writer-lease-revision-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, browser persistence, semantic DOM controls and a descriptor-driven Three.js stage.

The active audit isolates cross-document save ordering. Every open document owns a mutable story object and can replace one fixed localStorage slot after inspections, scene changes and boot. No writer identity, lease, monotonic revision, base-revision comparison, reset tombstone or conflict result exists, so a stale tab can regress newer progress or resurrect progress after another tab resets.

## Plan ledger

**Goal:** make every durable story save and reset a monotonic, revision-bound transaction while preserving the existing story and render architecture.

- [x] Compare the complete Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace boot, inspection, scene transition, save replacement, reset and cross-document paths.
- [x] Identify the full interaction loop, domains, all 24 kits and services.
- [x] Define 20 save-writer authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, HTML, CSS, story, persistence, rendering and deployment unchanged.
- [ ] Implement writer admission and execute multi-tab, reset, conflict, artifact and Pages fixtures.

## Active loop

```txt
tab A and tab B load the same durable state
  -> each keeps an independent mutable story object
  -> A advances and replaces the shared localStorage slot
  -> B remains based on the older state
  -> B later inspects or changes route
  -> B replaces the entire shared slot
  -> A's newer route clues or reset can be lost
```

## Required authority

```txt
the-unmapped-house-story-save-writer-lease-revision-authority-domain
```

```txt
StorySaveCommitCommand
  -> bind slot document writer generation lease commit and base revision
  -> validate the candidate story envelope
  -> read and verify the current durable head
  -> compare-and-swap one monotonic revision
  -> reject stale duplicate expired reset-invalidated and superseded work
  -> retain predecessor recovery data
  -> broadcast the accepted head to same-origin documents
  -> publish StorySaveCommitResult or StorySaveConflictResult
  -> publish StorySaveResetResult with a durable reset epoch
  -> publish FirstDurableStorySaveAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-15T18-02-58-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-15T18-02-58-04-00-story-save-writer-revision-dsk-map.md`
5. `save-concurrency-audit/2026-07-15T18-02-58-04-00-writer-lease-revision-cas-contract.md`
6. `interaction-audit/2026-07-15T18-02-58-04-00-save-commit-command-result-map.md`
7. `gameplay-audit/2026-07-15T18-02-58-04-00-multi-tab-story-regression-loop.md`
8. `render-audit/2026-07-15T18-02-58-04-00-save-head-visible-story-frame-gap.md`
9. `deploy-audit/2026-07-15T18-02-58-04-00-multi-document-save-fixture-gate.md`
10. `central-sync-audit/2026-07-15T18-02-58-04-00-oldest-selection-save-writer-reconciliation.md`
11. `turn-ledger/2026-07-15T18-02-58-04-00.md`
12. `next-steps.md`
13. `validation.md`

## Retained audits

Story audio, inspection focus continuity, motion preference, story announcements, interlude focus/route admission, page lifecycle, terminal settlement, WebGL recovery, save schema admission, viewport, scene transition, renderer-provider admission, hotspot picking, same-document save/reset convergence, interlude timing and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Add a small save envelope and browser-native writer authority around the existing localStorage adapter. Use a monotonic revision, reset epoch, writer lease and stale-base rejection before adding merge behavior.