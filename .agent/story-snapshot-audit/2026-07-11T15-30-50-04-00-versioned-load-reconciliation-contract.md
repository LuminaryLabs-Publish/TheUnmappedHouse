# StorySnapshot audit: versioned load and reconciliation contract

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

The current `.v1` object is not a versioned persistence contract. This audit defines the minimum envelope, snapshot, migration, semantic admission, reconciliation, load result, save result, and journal rules required before browser state can become story authority.

## Plan ledger

**Goal:** convert raw storage into one immutable, canonical, manifest-bound StorySnapshot with explicit evidence for every migration, reconciliation, rejection, fallback, save, and clear decision.

- [x] Identify all current persisted fields.
- [x] Identify structural and semantic failure classes.
- [x] Define the versioned envelope and canonical snapshot.
- [x] Define migration and reconciliation limits.
- [x] Define typed results and journaling.
- [x] Define non-destructive rejection and reset behavior.
- [ ] Implement and prove the contract.

## Current raw shape

```txt
save key: the-unmapped-house.stage-prototype.v1

{
  sceneId,
  clues,
  flags,
  inspected,
  route,
  log
}
```

No schema version, manifest identity, save id, revisions, phase, provenance, fingerprint, result, migration, reconciliation, or corruption-retention metadata exists.

## Required envelope

```txt
StorySaveEnvelopeV2
  schemaVersion: 2
  manifestId
  manifestFingerprint
  saveId
  saveRevision
  storyRevision
  snapshotFingerprint
  snapshot
```

## Required snapshot semantics

```txt
phase
  active | interlude | terminal

sceneId
  must resolve through the admitted manifest

route
  canonical scene-order prefix ending at sceneId

inspectedByScene
  only canonical scene and hotspot ids

clueReceipts
  immutable receipts linking clue grants to admitted inspections

flags
  known keys and admitted value types

log
  bounded canonical strings

completionProof
  optional, scene-scoped, revision-scoped and consumption-aware

storyRevision
  monotonic within one save lineage
```

## Load pipeline

```txt
1. raw read
2. exact raw retention
3. parse
4. envelope version admission
5. manifest identity admission
6. ordered pure migration
7. structural validation
8. semantic validation
9. deterministic reconciliation
10. canonicalization
11. fingerprint verification
12. detached bootstrap candidate
13. stage/UI preparation
14. typed persistence decision
15. atomic bootstrap commit
16. first-frame acknowledgement
17. immutable result and bounded journal publication
```

## Migration policy

A migration may transform a known prior schema into the current schema without consulting mutable runtime state. It must return a receipt containing source version, target version, migration id, input fingerprint, output fingerprint, and warnings.

Unknown future versions must be rejected. Migration must never overwrite the source payload before the migrated snapshot has been admitted and committed.

## Reconciliation policy

Reconciliation may:

```txt
sort canonical sets
remove duplicate route entries when the canonical meaning is unambiguous
rebuild derived lookup maps from accepted receipts
truncate logs to the documented budget
fill newly introduced optional defaults
map known renamed ids through an explicit alias table
```

Reconciliation may not:

```txt
invent missing scene completion
invent inspection or clue provenance
accept unknown scenes or hotspots
skip required predecessor scenes
change manifest identity silently
convert malformed JSON into a successful load
advance story or save revisions without a committed result
```

## Rejection and quarantine

A rejected save remains byte-for-byte recoverable. The runtime must not overwrite or remove it until an explicit clear or quarantine command succeeds. Quarantine should retain:

```txt
raw payload
storage key
raw read id
rejection reason
schema version if parseable
manifest identity if parseable
payload fingerprint
rejected-at session generation
```

## Load result

```txt
StoryLoadResult
  resultId
  commandId
  status
  rawReadId
  manifestId
  manifestFingerprint
  sourceSchemaVersion?
  committedSchemaVersion?
  saveId?
  saveRevision?
  storyRevision?
  migrationReceipts[]
  reconciliationReceipts[]
  warnings[]
  rejectionReason?
  snapshotFingerprint?
  bootstrapGeneration?
  stageEpoch?
  firstVisibleFrameId?
  rollbackResult?
```

## Save result

```txt
StorySaveResult
  resultId
  commandId
  status: committed | duplicate | stale_revision | serialization_failed |
          storage_unavailable | write_failed | verification_failed | rolled_back
  saveId
  previousSaveRevision
  committedSaveRevision?
  storyRevision
  manifestFingerprint
  snapshotFingerprint
  storedEnvelopeFingerprint?
```

## Required invariants

```txt
accepted snapshot is detached and immutable
manifest fingerprint matches the admitted manifest
snapshot fingerprint matches canonical content
save revision advances exactly once per committed write
story revision never regresses
route, scene, inspection, clue, phase and proof state are coherent
rejected input remains recoverable
failed writes do not alter committed in-memory authority
load/save/clear results are detached and JSON-safe
persistence journal is bounded
```

## Required fixture matrix

```txt
absent save
current valid save
malformed JSON
valid JSON wrong top-level type
unknown schema version
known legacy migration
manifest mismatch
unknown scene
impossible route
unknown hotspot
forged clue
invalid field types
oversized log
storage read failure
storage write failure
migration failure
reconciliation failure
fingerprint mismatch
roundtrip fingerprint equality
explicit clear success and failure
quarantine and recovery
```

## Validation status

The contract is documentation only. The repository currently has no pure StorySnapshot validator, migrator, reconciler, typed load/save result, quarantine store, or executable persistence fixture.