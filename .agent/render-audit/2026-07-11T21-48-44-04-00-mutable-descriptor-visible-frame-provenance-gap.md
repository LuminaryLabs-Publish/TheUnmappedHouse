# Mutable descriptor visible-frame provenance gap

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Prove that each visible scene frame was built from one admitted, immutable StoryManifest and one canonical scene plan.

## Current flow

```txt
mutable scene object
  -> StageKit.sceneData reference
  -> geometry and material allocation
  -> mutable hotspot object in mesh.userData
  -> side-panel closure over the same object
  -> recursive RAF
  -> visible frame with no content identity
```

## Gaps

- Stage resources do not cite manifest id, version or fingerprint.
- StageKit does not return a scene-plan result.
- Hotspot resources store complete mutable descriptors.
- No canonical hotspot-set fingerprint exists.
- No resource set or frame can detect descriptor mutation.
- Unsupported descriptors fail after live renderer construction.
- No barrier joins manifest admission, scene-plan preparation, resource commit and first visible frame.

## Required render contract

```txt
AdmittedStoryManifest
  -> CanonicalScenePlan
  -> SceneResourcePreparationResult
  -> SceneResourceCommitResult
  -> HotspotSetFingerprint
  -> FirstVisibleFrameReceipt
```

The frame receipt must cite:

```txt
manifestId
schemaVersion
contentVersion
manifestFingerprint
sceneId
scenePlanFingerprint
hotspotSetFingerprint
stageEpoch
resourceGeneration
visibleFrameId
```

## Proof gate

- Equivalent canonical content yields the same plan fingerprint.
- Semantic descriptor changes yield a new fingerprint.
- Source-object mutation cannot change admitted or visible state.
- Unsupported descriptors fail before resource allocation.
- Side-panel and mesh hotspot ids match the admitted canonical index.
- The first visible frame cites the exact admitted manifest fingerprint.
