# Central sync audit: oldest selection and hotspot availability reconciliation

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

The full accessible `LuminaryLabs-Publish` inventory contains 11 repositories. `TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger records and root `.agent` state. No eligible repository was new, ledger-missing, root-agent-missing, undocumented or runtime-ahead. TheUnmappedHouse had the oldest synchronized central timestamp and was the only repository changed.

## Plan ledger

**Goal:** preserve deterministic single-repository selection and bind the new repo-local finding into the central ledger.

- [x] Enumerate the current Publish inventory.
- [x] Compare all eligible names with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/`.
- [x] Verify root `.agent` coverage and documentation-head synchronization.
- [x] Exclude TheCavalryOfRome.
- [x] Select TheUnmappedHouse only.
- [x] Add timestamped repo-local documentation on `main`.
- [ ] Bind the final repo-local documentation head in the central ledger and add the central change log.

## Selection snapshot

```txt
accessible Publish repositories: 11
eligible after exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/TheUnmappedHouse
prior central timestamp: 2026-07-16T04-02-40-04-00
next oldest: LuminaryLabs-Publish/PhantomCommand
next timestamp: 2026-07-16T04-27-44-04-00
```

## Central result

Expected central status: `hotspot-availability-discovery-projection-authority-central-reconciled`.

No branch or pull request was created.