# Storage Authority Audit: Revision, Conflict and Reset Contract

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Current contract

```txt
key: the-unmapped-house.stage-prototype.v1
read: JSON.parse with fallback on exception
reconcile: shallow object spread over defaults
write: JSON.stringify + localStorage.setItem
reset: localStorage.removeItem + reload
```

## Missing authority

```txt
storage capability status
snapshot schema and durable revision
writer/session identity
expected predecessor revision
compare-and-swap admission
conflict classification
manifest-aware merge policy
write/readback result
reset barrier or tombstone
storage-event reconciliation
volatile-session policy
bounded effect journal
```

## Required snapshot envelope

```txt
StoryStorageEnvelope
  schemaId
  schemaVersion
  manifestId
  manifestVersion
  manifestFingerprint
  snapshotRevision
  writerSessionId
  previousRevision
  committedAtMs
  payload
  payloadFingerprint
```

## Required commit statuses

```txt
accepted
accepted-volatile
rejected-stale-writer
rejected-manifest-mismatch
rejected-invalid-payload
conflict-requires-reload
merged
storage-unavailable
quota-exceeded
serialization-failed
verification-failed
```

## Conflict policy

The initial safe policy should reject stale full-aggregate writers and require reload/reconciliation. Automatic merge should be limited to explicitly commutative fields after manifest validation. `sceneId`, ordered `route`, terminal/interlude state and reset barriers must not be merged by generic object spread.

## Reset policy

A reset must advance a durable reset revision or tombstone. Other tabs must observe the reset barrier and retire stale state before another commit. A predecessor snapshot must not be able to recreate progress after reset.

## Observability

Expose detached, JSON-safe storage observations only. Do not expose the raw `Storage` object as a public capability.
