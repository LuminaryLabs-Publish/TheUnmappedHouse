# Architecture audit: story save writer lease and revision DSK map

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `story-save-writer-lease-revision-authority-audited`

## Summary

The current architecture treats localStorage durability as a direct side effect of the browser story runtime. It has no explicit save-slot command/result boundary and no owner capable of ordering writes from multiple documents. The minimal architecture change is one composed save authority around the existing story state and localStorage adapter.

## Plan ledger

**Goal:** separate accepted story state from durable save admission so one stale document cannot replace a newer durable head.

- [x] Map existing story and persistence ownership.
- [x] Preserve all current game and render kits.
- [x] Identify missing save identities, commands, results and lifecycle policies.
- [x] Define one parent domain and focused subkits.
- [x] Keep localStorage as an adapter rather than game truth.
- [ ] Implement the authority and prove multi-document ordering.

## Current ownership

```txt
browser-story-runtime-kit
  owns mutable in-memory state
  calls loadState during module boot
  calls saveState after accepted mutations
  calls saveState again during initial boot
  calls removeItem during KeyR reset

localstorage-save-kit
  parses one key
  shallow-merges onto initial state
  replaces the entire key
  deletes the key

missing
  durable head identity
  writer identity and generation
  admitted writer ownership
  base revision comparison
  conflict and reset settlement
  cross-document synchronization
```

## Proposed parent domain

```txt
the-unmapped-house-story-save-writer-lease-revision-authority-domain
```

### Parent responsibilities

```txt
register one StorySaveSlotId
observe or create one durable head
admit one active writer generation
accept StorySaveCommitCommand
validate candidate envelope and base revision
compare-and-swap one monotonic revision
publish accepted conflict reset and retired results
broadcast accepted durable heads
retain predecessor recovery data
acknowledge the first durable accepted save
```

## Proposed DSK composition

```txt
the-unmapped-house-story-save-writer-lease-revision-authority-domain
  -> story-save-slot-identity-kit
  -> document-save-writer-identity-kit
  -> save-writer-generation-kit
  -> save-writer-lease-admission-kit
  -> durable-story-save-revision-kit
  -> save-base-revision-cas-kit
  -> story-save-fingerprint-kit
  -> story-save-envelope-validation-kit
  -> story-save-commit-command-kit
  -> story-save-commit-result-kit
  -> story-save-conflict-result-kit
  -> storage-event-head-reconciliation-kit
  -> cross-document-save-broadcast-kit
  -> durable-reset-tombstone-kit
  -> stale-writer-rejection-kit
  -> save-writer-retirement-kit
  -> save-predecessor-recovery-kit
  -> first-durable-story-save-ack-kit
  -> multi-tab-artifact-pages-save-fixture-kit
```

## Command contract

```txt
StorySaveCommitCommand {
  slotId
  documentId
  writerId
  writerGeneration
  leaseId
  commitId
  baseRevision
  candidateEnvelope
  candidateFingerprint
  intent: autosave | inspection | route | reset | boot-repair
  issuedAt
}
```

## Result contract

```txt
StorySaveCommitResult {
  status
  slotId
  writerId
  writerGeneration
  commitId
  baseRevision
  acceptedRevision
  acceptedFingerprint
  predecessorRevision
  conflictHeadRevision
  resetEpoch
  durableAt
}
```

Required statuses:

```txt
StorySaveCommitAccepted
StorySaveCommitAcceptedNoChange
StorySaveCommitRejectedStaleBase
StorySaveCommitRejectedWriterLease
StorySaveCommitRejectedExpiredLease
StorySaveCommitRejectedResetEpoch
StorySaveCommitRejectedDuplicate
StorySaveCommitRejectedInvalidEnvelope
StorySaveCommitConflict
StorySaveResetAccepted
StorySaveResetRejectedStale
StorySaveWriterRetired
StorySaveCommitFailed
FirstDurableStorySaveAcknowledged
StorySaveArtifactParityConfirmed
```

## Existing domain boundaries preserved

```txt
story-data-kit remains authored content
inspection and clue kits remain game truth
scene-route-kit remains route truth
browser-story-runtime-kit emits candidate save commands
localstorage-save-kit becomes the browser durable adapter
StageKit remains presentation only
debug JSON remains a projection, not durable authority
```

## Admission sequence

```txt
accepted story mutation
  -> produce immutable candidate envelope
  -> read current durable head
  -> validate writer lease and reset epoch
  -> compare candidate base revision with durable revision
  -> reject or commit revision + 1
  -> retain predecessor
  -> publish result
  -> broadcast accepted head
  -> update document-local accepted save revision
  -> acknowledge durable convergence
```

## Reset sequence

```txt
accepted reset command
  -> validate writer authority
  -> increment reset epoch
  -> commit an initial-state envelope as a new revision
  -> publish a durable reset tombstone/result
  -> broadcast the reset head
  -> invalidate writers based on older reset epochs
```

Deleting the key alone is insufficient because an older document can recreate it from stale memory.

## Render relation

Rendering consumes accepted in-memory story state. Durable save admission must not block every visual frame, but the UI or debug surface should expose whether the visible story revision is durable, pending or conflicted. A visible frame must never be used as proof that persistence succeeded.

## Validation boundary

This is an architecture contract only. No DSK, storage adapter, command, result, lease, revision or fixture was implemented.