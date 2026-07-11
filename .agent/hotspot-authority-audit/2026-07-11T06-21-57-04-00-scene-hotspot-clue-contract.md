# Hotspot authority audit: scene, hotspot and clue contract

Timestamp: `2026-07-11T06-21-57-04-00`

## Authority rule

Only the versioned story manifest may define which hotspot belongs to which scene, which clues it grants and which copy it projects. Input and render surfaces may carry identities and observations, but never authority-bearing story payloads.

## Canonical indexes

```txt
sceneById
hotspotBySceneAndId
clueById
requiredCluesByScene
hotspotFingerprintBySceneAndId
storyManifestFingerprint
```

## Canonical hotspot definition

```txt
HotspotDefinition {
  sceneId
  hotspotId
  label
  text
  changesText
  grantClueIds
  renderVolume
  definitionFingerprint
}
```

## Inspection ledger row

```txt
InspectionReceipt {
  commandId
  source
  sceneId
  hotspotId
  definitionFingerprint
  storyRevisionBefore
  storyRevisionAfter
  stageEpoch
  grantedClueIds
  status
  reason
}
```

## Clue grant row

```txt
ClueGrantReceipt {
  clueId
  ownerSceneId
  sourceHotspotId
  inspectionCommandId
  storyRevision
}
```

## Completion proof

```txt
SceneCompletionProof {
  proofId
  sceneId
  storyManifestFingerprint
  storyRevision
  requiredClueIds
  grantReceiptIds
  completedAtCommandId
}
```

## Invariants

- A hotspot id is interpreted only inside a scene id.
- A caller cannot supply or modify clue grants, text or completion requirements.
- A clue grant must point to one canonical hotspot and accepted inspection receipt.
- Old-scene and future-scene receipts cannot complete the active scene.
- One command yields at most one committed inspection receipt.
- One canonical first inspection yields at most one grant receipt per clue.
- One scene revision yields at most one completion proof.
- Continue admission consumes the completion proof, not the mutable clue array.
- Persistence stores the manifest fingerprint and rejects incompatible authority data.

## Migration from current state

```txt
current inspected object
  -> validate scene ids
  -> validate hotspot ids against manifest
  -> create reconciled inspection receipts

current clues array
  -> accept only clues derivable from validated inspections
  -> discard orphaned, unknown or cross-scene clues

current completion
  -> recompute from reconciled grant receipts
```

## Rejection reasons

```txt
unknown_scene
unknown_hotspot
hotspot_not_in_scene
stale_story_revision
stale_stage_epoch
invalid_phase
duplicate_command
already_inspected
manifest_mismatch
persistence_failed
```

## Relationship to transition authority

The atomic Continue transaction should require a committed `SceneCompletionProof`. This prevents the transition system from treating unproven global clue strings or stale inspection payloads as admission evidence.
