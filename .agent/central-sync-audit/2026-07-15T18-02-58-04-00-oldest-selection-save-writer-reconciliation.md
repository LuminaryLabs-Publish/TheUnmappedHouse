# Central sync audit: oldest selection and story save writer reconciliation

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `central-reconciled`

## Summary

The full Publish inventory was compared with the central repo ledger. No new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository was identified by the freshest central comparison. TheUnmappedHouse was selected as the oldest synchronized eligible repository and its new save-writer revision audit was mirrored centrally.

## Plan ledger

**Goal:** preserve one-project selection and make the repo-local findings discoverable from `LuminaryLabs-Dev/LuminaryLabs`.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Use the freshest completed comparison to identify the oldest synchronized eligible repository.
- [x] Select only TheUnmappedHouse.
- [x] Add the timestamped repo-local audit family.
- [x] Refresh the required root `.agent` documents.
- [x] Preserve the 24-kit service inventory.
- [x] Update `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md`.
- [x] Add `internal-change-log/2026-07-15T18-02-58-04-00-the-unmapped-house-story-save-writer-revision.md`.
- [x] Push both repositories only to `main`.
- [x] Create no branch or pull request.

## Selection evidence

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
priority exceptions: 0
selected: LuminaryLabs-Publish/TheUnmappedHouse
prior central timestamp: 2026-07-15T12-59-24-04-00
fresh comparison source: ZombieOrchard ledger updated 2026-07-15T17-38-05-04-00
fresh comparison next-oldest: TheUnmappedHouse
```

## Central files

```txt
repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
internal-change-log/2026-07-15T18-02-58-04-00-the-unmapped-house-story-save-writer-revision.md
```

## Reconciled finding

```txt
one fixed localStorage slot
whole-state replacement from each document
no writer ID or writer generation
no monotonic save or base revision
no lease or compare-and-swap
no reset tombstone
no cross-document reconciliation
stale tabs can regress progress or resurrect pre-reset state
```

## Central status

```txt
story-save-writer-lease-revision-authority-central-reconciled
```

## Validation boundary

Central reconciliation records a documentation-only finding. It does not claim that multi-tab safety, stale-write rejection, reset durability, conflict recovery, artifact parity or production readiness is implemented.