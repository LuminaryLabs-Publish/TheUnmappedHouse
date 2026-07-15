# Save concurrency audit: writer lease, revision and compare-and-swap contract

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `audited`

## Summary

The fixed localStorage key provides shared durability but no shared writer protocol. This contract defines the smallest browser-native authority needed to reject stale writers, make reset durable and synchronize same-origin documents without introducing a server.

## Plan ledger

**Goal:** turn the single localStorage key into a monotonic durable slot with explicit writer ownership, conflict handling and recovery.

- [x] Define slot, writer, lease, revision and reset identities.
- [x] Define compare-and-swap admission.
- [x] Define storage-event and BroadcastChannel reconciliation.
- [x] Define reset tombstones and writer retirement.
- [x] Define predecessor recovery.
- [ ] Implement and execute the contract.

## Durable envelope

```txt
StorySaveEnvelope {
  schemaVersion
  slotId
  saveRevision
  baseRevision
  resetEpoch
  commitId
  writerId
  writerGeneration
  writtenAt
  payloadFingerprint
  payload {
    sceneId
    clues
    flags
    inspected
    route
    log
  }
}
```

## Writer lease

```txt
StorySaveWriterLease {
  leaseId
  slotId
  writerId
  writerGeneration
  acquiredAt
  expiresAt
  heartbeatAt
  mode: active | read-only | retiring
}
```

Policy:

- Only the active unexpired lease can commit.
- A document without the lease may render and inspect in read-only mode only if product policy permits.
- Hidden, pagehide, replaced and crashed writers lose ownership through explicit retirement or expiry.
- Lease takeover must observe the current durable head before committing.
- A lease never authorizes a candidate based on an older reset epoch.

## Compare-and-swap sequence

```txt
1. read durable envelope D
2. verify lease and writer generation
3. verify candidate.resetEpoch == D.resetEpoch
4. verify candidate.baseRevision == D.saveRevision
5. verify candidate fingerprint and schema
6. assign accepted revision D.saveRevision + 1
7. retain D as predecessor recovery data
8. replace the slot with the accepted envelope
9. read back and verify accepted revision + fingerprint
10. publish result and broadcast head
```

Because localStorage has no native atomic compare-and-swap primitive, the implementation must serialize writers through a browser lock or lease protocol and verify the write. Preferred order:

```txt
navigator.locks when available
  -> named origin-scoped save lock

fallback
  -> revisioned lease record with expiry, heartbeat and post-write verification
```

## Cross-document reconciliation

Use both browser surfaces when available:

```txt
storage event
  -> authoritative observation that another document changed the durable key

BroadcastChannel
  -> low-latency semantic head, lease, conflict and reset messages
```

A document receiving a newer head must:

```txt
cancel pending commits based on older revisions
update its known durable revision
enter reconcile or read-only mode if local state differs
never overwrite the new head automatically
```

## Reset tombstone

Reset commits an initial-state payload at a new `resetEpoch` and `saveRevision`. It must not rely on `removeItem` alone.

```txt
reset epoch N
  -> reset accepted
  -> commit initial state at epoch N + 1
  -> broadcast reset head
  -> reject every candidate from epoch N or older
```

## Conflict policy

```txt
no local divergence
  -> adopt external head

local divergence and stale base
  -> preserve local state in memory
  -> block automatic saves
  -> publish StorySaveConflictResult
  -> offer reload current head or isolated export

explicit takeover
  -> acquire writer lease
  -> rebase or replace only through an authored product decision
```

## Recovery policy

Retain one verified predecessor envelope or a small bounded history. A failed or corrupt newest envelope can fall back only after schema, fingerprint and revision validation. Recovery must never accept a lower reset epoch than the current tombstone.

## Proof requirements

```txt
two-tab stale writer rejection
three-tab lease contention
writer crash and lease expiry
storage-event head adoption
BroadcastChannel head adoption
reset tombstone rejection
conflict recovery export
predecessor recovery
source/build/Pages parity
FirstDurableStorySaveAck
FirstDurableStorySaveFrameAck
```

## Validation boundary

No lock, lease, revision, envelope, broadcast, storage listener, reset tombstone or recovery history was implemented.