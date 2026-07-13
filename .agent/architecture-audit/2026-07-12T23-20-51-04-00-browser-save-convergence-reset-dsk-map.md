# Architecture audit: Browser Save Commit and Reset Convergence DSK Map

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

Browser state mutation, durable storage, reset and visible projection currently share direct functions in `src/game.js`. No parent domain owns save identity, conflict admission, storage delivery or reset invalidation.

## Plan ledger

**Goal:** separate story mutation from durable commit and make cross-tab convergence an explicit authority.

- [x] Map the current save and reset composition.
- [x] Define one missing parent domain.
- [x] Define candidate kits and ownership boundaries.
- [ ] Implement and fixture the domain.

## Current composition

```txt
browser-story-runtime-kit
  -> inspection-ledger-kit
  -> clue-ledger-kit
  -> scene-route-kit
  -> notebook-log-kit
  -> localstorage-save-kit
  -> KeyR removeItem + reload
  -> DOM and StageKit projection
```

## Missing parent domain

```txt
the-unmapped-house-browser-save-commit-reset-convergence-authority-domain
```

### Identity and canonical state

```txt
browser-save-session-id-kit
browser-save-writer-id-kit
browser-save-command-id-kit
browser-save-revision-kit
browser-save-expected-predecessor-kit
browser-save-fingerprint-kit
canonical-story-snapshot-kit
```

### Save admission and durability

```txt
story-save-commit-command-kit
story-save-commit-admission-kit
story-save-commit-result-kit
durable-save-readback-kit
save-write-failure-kit
stale-writer-rejection-kit
```

### Cross-tab delivery and convergence

```txt
storage-event-envelope-kit
storage-event-deduplication-kit
monotonic-save-admission-kit
cross-tab-reconciliation-kit
```

### Reset authority

```txt
story-reset-command-kit
story-reset-generation-kit
story-reset-tombstone-kit
story-reset-admission-kit
story-reset-result-kit
reset-resurrection-rejection-kit
```

### Observation and proof

```txt
save-observation-kit
save-journal-kit
first-visible-save-frame-ack-kit
first-visible-reset-frame-ack-kit
two-tab-lost-update-fixture-kit
reset-resurrection-fixture-kit
storage-write-failure-fixture-kit
browser-storage-convergence-smoke-kit
pages-storage-convergence-smoke-kit
```

## Boundary rules

```txt
story reducers prepare candidates but do not claim durability
localStorage is a persistence adapter, not the authority
one commit requires an exact predecessor revision and fingerprint
one successor revision belongs to one accepted command
storage events carry immutable commit envelopes
older, duplicate or reset-invalidated deliveries reject
reset is a committed tombstone, not only removeItem
stale tabs cannot write across a reset generation
visible story state cites a verified durable commit
save and reset failures produce terminal typed results
bounded journals retain no writable snapshot aliases
```

## Dependency relationship

The save authority should consume the canonical manifest/snapshot validation contract and coordinate with progression authority, but it must remain a separate parent domain. Progression owns story meaning; save convergence owns durable ordering, delivery and reset invalidation.