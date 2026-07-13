# Interaction audit: Save Commit, Reset and Storage Delivery Map

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

Current interaction handlers mutate story state directly and treat `localStorage` as a fire-and-forget side effect. This map introduces explicit command, admission, delivery and projection boundaries.

## Plan ledger

**Goal:** ensure every user or storage interaction produces one typed result before canonical state or visible presentation changes.

- [x] Map inspection, Continue, reset and storage-delivery entrypoints.
- [x] Define required command envelopes and terminal results.
- [x] Define ordering between durability and projection.
- [ ] Implement interaction adapters and fixtures.

## Current interaction map

```txt
canvas or side-panel hotspot
  -> inspectHotspot
  -> mutate state
  -> renderUi
  -> saveState

Continue
  -> nextScene
  -> mutate state and StageKit
  -> renderUi
  -> saveState

KeyR
  -> removeItem
  -> location.reload

storage event
  -> no handler
```

## Required command map

```txt
HotspotInspectionCommand / ContinueCommand
  -> story reducer candidate
  -> StorySaveCommitCommand
     writerId
     commandId
     expectedSaveRevision
     expectedSnapshotFingerprint
     candidateSnapshot
  -> StorySaveCommitResult
  -> visible projection

StorageEventEnvelope
  -> schema and key validation
  -> commit/reset identity validation
  -> deduplication
  -> monotonic revision/reset-generation admission
  -> CrossTabReconciliationResult
  -> visible projection

StoryResetCommand
  -> expected save revision and reset generation
  -> durable tombstone commit
  -> StoryResetResult
  -> cancel stale local work
  -> reset projection and reload policy
```

## Interaction rules

```txt
one UI intent has one command ID
one accepted command has one terminal result
repeated command IDs return the prior result
stale predecessor commands fail closed
storage delivery never directly mutates DOM
reset invalidates all predecessor writer generations
projection follows accepted durable state
failed storage effects remain visible only as explicit error state
```

## Required observations

Record bounded, immutable observations for command admission, storage write, readback verification, remote delivery, deduplication, conflict rejection, reset invalidation and first visible frame.