# Persistence audit: Revision, Storage Event and Reset Tombstone Contract

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

The current localStorage adapter replaces one unversioned document and deletes it for reset. This audit defines the minimum durable protocol needed for conflict detection, cross-tab convergence and reset invalidation.

## Plan ledger

**Goal:** turn localStorage from an implicit side effect into a verified adapter behind one save/reset authority.

- [x] Identify current persistence semantics.
- [x] Define canonical commit and reset envelopes.
- [x] Define conflict, delivery and readback rules.
- [x] Define required failure fixtures.
- [ ] Implement and execute the contract.

## Canonical commit envelope

```txt
StorySaveCommitEnvelope
  schemaVersion
  manifestFingerprint
  storyRunId
  saveRevision
  resetGeneration
  writerId
  commandId
  predecessorRevision
  predecessorFingerprint
  snapshotFingerprint
  committedAtLogicalSequence
  canonicalSnapshot
```

## Canonical reset envelope

```txt
StoryResetTombstone
  schemaVersion
  storyRunId
  resetGeneration
  commandId
  predecessorRevision
  predecessorFingerprint
  reason
  terminalResult
```

Deleting the key alone is insufficient because absence carries no reset generation and cannot reject a later stale write.

## Commit rules

```txt
validate snapshot and manifest compatibility
compare exact predecessor revision and fingerprint
reject a stale or duplicate writer before mutation
allocate one monotonic successor revision
serialize one immutable envelope
write the complete value
read the value back
verify revision, command ID and fingerprint
publish COMMITTED only after verification
```

Because localStorage has no compare-and-swap primitive, the browser adapter must detect races through predecessor/readback checks and define a retry or rejection policy. A stronger future adapter may use IndexedDB transactions or a single elected writer, but the domain contract should remain adapter-neutral.

## Storage-event rules

```txt
accept only the configured save key
parse into a validated commit or reset envelope
deduplicate by command/commit identity
reject revisions older than the admitted local revision
reject commits from an older reset generation
reconcile newer commits through the domain reducer
never project unvalidated event payloads directly
```

## Reset rules

```txt
commit a tombstone with next reset generation
invalidate predecessor save commands and pending timers
broadcast/deliver the tombstone through storage semantics
converge every tab to one reset snapshot
reject any later predecessor-generation write
retain enough tombstone state to prevent resurrection
```

## Required terminal results

```txt
StorySaveCommitResult
StorySaveConflictResult
StorySaveWriteFailureResult
StorySaveReadbackMismatchResult
CrossTabReconciliationResult
StoryResetResult
ResetResurrectionRejectionResult
```

## Required proof

Two-tab same-predecessor writes, duplicate storage delivery, reordered delivery, storage write failure, readback mismatch, reset with another tab open, stale post-reset write and visible-frame parity must all be executable fixtures.