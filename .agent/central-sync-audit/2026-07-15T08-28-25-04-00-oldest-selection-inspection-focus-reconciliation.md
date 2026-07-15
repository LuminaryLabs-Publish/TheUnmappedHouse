# Central sync audit: oldest-selection inspection focus reconciliation

**Timestamp:** `2026-07-15T08-28-25-04-00`

## Summary

The complete current Publish inventory contained 11 repositories. After excluding TheCavalryOfRome, all ten eligible repositories had central ledgers and root `.agent` state, and none was runtime-ahead. TheUnmappedHouse had the oldest synchronized central timestamp and was the only repository selected.

## Plan ledger

**Goal:** mirror this repo-local inspection-control audit into the central repository ledger without changing any other Publish project.

- [x] Enumerate all accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Compare eligible ledger timestamps and documented heads.
- [x] Select TheUnmappedHouse only.
- [x] Add the timestamped repo-local audit family.
- [x] Prepare central ledger and change-log reconciliation.
- [x] Use `main` only.
- [x] Create no branch or pull request.

## Selection evidence

```txt
selected: LuminaryLabs-Publish/TheUnmappedHouse
prior central timestamp: 2026-07-15T02-59-31-04-00
reason: oldest synchronized eligible repository
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Central status

```txt
inspection-control-focus-continuity-authority-central-reconciled
```

The central ledger must record the final repo-local documentation head after all root `.agent` files are committed.