# Next steps: The Unmapped House story save writer revision authority

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is a revisioned save envelope around the existing story payload, plus one browser-native writer authority that rejects stale bases and makes reset a durable epoch change rather than a key deletion.

## Plan ledger

**Goal:** add cross-document save ordering without restructuring story, rendering or authored content.

- [ ] Define `StorySaveSlotId`, `SaveWriterId`, `SaveWriterGeneration`, `SaveWriterLeaseId`, `StorySaveRevision`, `StorySaveCommitId` and `ResetEpoch`.
- [ ] Wrap the existing payload in a versioned `StorySaveEnvelope`.
- [ ] Include the candidate base revision and payload fingerprint in every save command.
- [ ] Add one origin-scoped writer lock using `navigator.locks` when available.
- [ ] Add a revisioned lease with expiry and post-write verification as the fallback.
- [ ] Replace void `saveState()` calls with `StorySaveCommitCommand` and typed results.
- [ ] Read and verify the durable head before every commit.
- [ ] Reject stale-base, expired-lease, duplicate and reset-invalidated candidates.
- [ ] Convert reset into an initial-state commit at a new reset epoch.
- [ ] Add `storage` event reconciliation for external durable-head changes.
- [ ] Add BroadcastChannel messages for low-latency head, lease, conflict and reset events.
- [ ] Move stale documents to explicit reconcile or read-only state before their next write.
- [ ] Retain one verified predecessor for recovery.
- [ ] Publish `FirstDurableStorySaveAck` and `FirstDurableStorySaveFrameAck`.
- [ ] Add two-tab, three-tab, crash, reset, conflict, recovery, artifact and Pages fixtures.

## Ordered implementation

### 1. Envelope and identities

Add schema version, slot ID, save revision, base revision, reset epoch, commit ID, writer ID, writer generation, written timestamp and payload fingerprint around the existing story payload. Preserve the current payload fields and migration boundary.

### 2. Writer admission

Use a named `navigator.locks` lock when available. The fallback must use a revisioned lease record with expiry, heartbeat and read-back verification. Only one active writer generation may commit.

### 3. Compare-and-swap save

Read the current head, compare the candidate base revision and reset epoch, assign the next revision, retain the predecessor, write once and verify the accepted revision and fingerprint. Do not silently merge stale whole-state objects.

### 4. Cross-document settlement

Observe storage events and BroadcastChannel messages. Cancel pending stale commits, update the known head, and enter reconcile/read-only mode when local state diverges.

### 5. Durable reset

Commit initial state at a new reset epoch. Reject all candidates based on older reset epochs so an open stale tab cannot resurrect prior progress.

### 6. Prove behavior

Run source, built artifact and Pages fixtures for stale-write rejection, lease contention, writer retirement, reset resurrection, storage-event reconciliation, BroadcastChannel fallback, corrupt-head recovery and visible/durable convergence.

## Do not combine yet

Keep story audio, inspection-focus continuity, story announcements, interlude modal focus, motion preference, page lifecycle, save schema, WebGL recovery, viewport, hotspot picking and resource lifecycle as retained independent authorities.