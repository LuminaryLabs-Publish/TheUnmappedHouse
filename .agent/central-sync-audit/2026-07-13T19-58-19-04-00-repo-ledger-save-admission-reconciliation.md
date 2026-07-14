# Central-sync audit: Repo-ledger save-admission reconciliation

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

This run selected `TheUnmappedHouse` by the oldest eligible central timestamp and added a documentation-only story-save schema and manifest-admission audit. No other Publish repository is in scope.

## Plan ledger

**Goal:** keep repo-local and central records aligned on selection evidence, source findings, kit inventory, authority boundaries and validation limits.

- [x] Compare ten Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify nine central ledgers and root `.agent` states.
- [x] Verify repository heads match recorded documentation heads.
- [x] Add the timestamped repo-local tracker and audit family.
- [x] Refresh root `.agent` state.
- [ ] Record the final repo-local documentation head in `LuminaryLabs-Dev/LuminaryLabs`.
- [ ] Add the paired central internal change log.

## Central files

```txt
update repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
add internal-change-log/2026-07-13T19-58-19-04-00-the-unmapped-house-story-save-schema-manifest-admission.md
```

## Findings to publish

```txt
successfully parsed localStorage data is shallow-merged without shape validation
unknown scene IDs can remain durable while scenes[0] is visible
clues, inspected, route and log shapes are assumed by reducers
saved identifiers are not checked against the current story manifest
no schema version, manifest fingerprint, migration or quarantine result exists
startup rewrites the admitted raw shape
syntax checks do not execute save admission
```

## Boundary

Central tracking must record this as documentation-only and must not claim runtime remediation, migration safety, quarantine, first-frame proof or deployment readiness.