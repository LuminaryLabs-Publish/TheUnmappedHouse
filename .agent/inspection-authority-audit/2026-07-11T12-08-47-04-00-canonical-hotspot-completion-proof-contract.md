# Inspection authority audit: Canonical hotspot and completion-proof contract

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Define the exact data and transaction contract that makes hotspot inspection deterministic, scene-scoped, idempotent, persistence-safe, and suitable for Continue admission.

## Canonical identities

```txt
StoryManifestId
ManifestFingerprint
SceneId
HotspotId
ClueId
SessionId
SessionGeneration
StoryRevision
SaveRevision
StageEpoch
FrameId
InspectionCommandId
InspectionReceiptId
CompletionProofId
```

## Canonical hotspot definition

```txt
CanonicalHotspot {
  sceneId,
  hotspotId,
  label,
  text,
  changesText?,
  grantedClueIds[],
  renderPickDescriptor,
  definitionFingerprint
}
```

Definitions are immutable after manifest admission. Commands and render observations reference them by ids only.

## Inspection receipt

```txt
InspectionReceipt {
  receiptId,
  commandId,
  source,
  sceneId,
  hotspotId,
  storyRevisionBefore,
  storyRevisionAfter,
  stageEpoch,
  observedFrameId?,
  grantedClueIds[],
  hotspotDefinitionFingerprint,
  resultFingerprint
}
```

One accepted scene/hotspot inspection may produce one receipt. Re-read presentation must not produce a second story receipt.

## Clue grant receipt

```txt
ClueGrantReceipt {
  clueId,
  sceneId,
  hotspotId,
  inspectionReceiptId,
  storyRevision,
  grantFingerprint
}
```

A clue has authority only when its provenance resolves through an admitted inspection receipt and canonical hotspot definition.

## Scene completion proof

```txt
SceneCompletionProof {
  proofId,
  sceneId,
  storyRevision,
  requiredHotspotIds[],
  acceptedInspectionReceiptIds[],
  requiredClueIds[],
  acceptedClueGrantFingerprints[],
  manifestFingerprint,
  proofFingerprint,
  consumed: false,
  consumedByTransitionId: null
}
```

## Completion policy

```txt
complete when:
  every canonical required hotspot has one accepted receipt
  every canonical required clue has valid provenance
  all receipts belong to the same scene
  all definitions match the admitted manifest fingerprint
  no receipt is stale or revoked
```

Raw global clue strings are not completion authority.

## Exactly-once rules

```txt
same commandId
  -> duplicate command result

same input sequence or lower
  -> sequence rejection

same scene/hotspot already accepted
  -> duplicate or re_read result
  -> no story revision advance
  -> no clue regrant
  -> no second completion proof

same completion condition recomputed
  -> return existing proof
  -> no second interlude lease
```

## Persistence transaction

```txt
admitted command
  -> candidate inspection receipt
  -> candidate clue grants
  -> candidate completion proof
  -> candidate StorySnapshot
  -> typed persistence attempt

success
  -> commit live story revision
  -> project DOM/debug
  -> schedule one proof-correlated interlude lease
  -> return applied result

failure
  -> keep live story state unchanged
  -> create failed result and journal row
  -> no DOM completion projection
  -> no interlude lease
```

## Journal row

```txt
InspectionJournalRow {
  command,
  admissionStatus,
  canonicalResolution,
  result,
  beforeFingerprint,
  candidateFingerprint?,
  afterFingerprint,
  persistenceResult?,
  completionProofId?,
  boundedIndex
}
```

The journal must be detached, immutable, JSON-safe, and bounded.

## Continue dependency

Continue must admit:

```txt
current scene id
current story revision
current stage epoch
one unconsumed completionProofId
```

The transition transaction consumes the proof exactly once and records `consumedByTransitionId`.

## Failure classifications

```txt
invalid_command
stale_session
stale_scene
stale_story_revision
stale_stage_epoch
duplicate_command
duplicate_sequence
unknown_hotspot
cross_scene_hotspot
invalid_manifest_definition
invalid_clue_ownership
persistence_failed
projection_failed
internal_failure
```

## Fixture gate

```txt
canonical definition resolution
exactly-once receipt
clue provenance
completion proof determinism
duplicate and stale rejection
persistence rollback
dual-ingress parity
proof-gated Continue admission
```
