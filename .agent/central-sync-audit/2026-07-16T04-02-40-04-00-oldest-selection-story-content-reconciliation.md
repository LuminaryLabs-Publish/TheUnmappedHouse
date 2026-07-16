# Central sync audit: oldest selection and story content reconciliation

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Selected repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Central repository:** `LuminaryLabs-Dev/LuminaryLabs`  
**Branch policy:** `main` only

## Summary

The current Publish inventory contains 11 repositories. After excluding TheCavalryOfRome, all ten eligible repositories have central ledger entries, root `.agent` state, and synchronized documentation heads. TheUnmappedHouse had the oldest central timestamp and was the only repository selected.

## Plan ledger

**Goal:** record the selection proof and the central changes required after the repo-local audit.

- [x] Enumerate the complete Publish repository list.
- [x] Exclude TheCavalryOfRome.
- [x] Compare central ledger coverage.
- [x] Confirm root `.agent` coverage.
- [x] Compare current documentation heads with ledger-bound heads.
- [x] Select TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Add the repo-local story-content audit.
- [x] Bind the final repo-local documentation head in the central ledger.
- [x] Add the central internal change-log entry.

## Selection evidence

```txt
accessible: 11
eligible: 10
ledger missing: 0
root .agent missing: 0
undocumented: 0
runtime ahead: 0

oldest: TheUnmappedHouse @ 2026-07-15T23-00-03-04-00
next: PhantomCommand @ 2026-07-16T00-00-40-04-00
```

## Central reconciliation target

```txt
repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
internal-change-log/2026-07-16T04-02-40-04-00-the-unmapped-house-story-content-graph-validation.md
```

The central ledger must preserve all retained statuses and bind the final repo-local documentation head produced by this run.
