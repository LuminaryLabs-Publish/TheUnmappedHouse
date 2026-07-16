# Central sync audit: oldest selection and startup readiness reconciliation

**Timestamp:** `2026-07-15T23-00-03-04-00`

## Summary

The current Publish installation contains 11 repositories. After excluding TheCavalryOfRome, all ten eligible repositories have central ledgers, root `.agent` state, and repository heads matching their documented heads. TheUnmappedHouse has the oldest synchronized central timestamp and is the only repository selected for this run.

## Plan ledger

**Goal:** preserve deterministic single-repository selection and mirror the new startup-readiness finding into the central ledger.

- [x] Enumerate the full current Publish installation.
- [x] Compare eligible repository names with central ledger paths.
- [x] Compare current heads with documented repo-local heads.
- [x] Confirm no higher-priority new, missing, undocumented, or runtime-ahead repository exists.
- [x] Select TheUnmappedHouse only.
- [x] Add the timestamped repo-local audit family.
- [x] Update the central TheUnmappedHouse ledger and internal change log.
- [x] Push only to main and create no branch or pull request.

## Selection state

```txt
accessible: 11
excluded: 1
eligible: 10
central-ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/TheUnmappedHouse
prior timestamp: 2026-07-15T18-02-58-04-00
next oldest: LuminaryLabs-Publish/PhantomCommand at 2026-07-15T18-39-30-04-00
```

## Central reconciliation target

```txt
status: browser-startup-readiness-failure-authority-central-reconciled
repo ledger: repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
change log: internal-change-log/2026-07-15T23-00-03-04-00-the-unmapped-house-browser-startup-readiness-failure.md
```

Runtime implementation remains unchanged and proof-gated.