# Render audit: Unversioned Content to Visible Scene Gap

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

The canvas can show a scene built from a fallback raw descriptor while persistence still carries an invalid scene id. No frame receipt identifies the manifest fingerprint or snapshot revision behind the visible stage.

## Plan ledger

**Goal:** require visible scene output to cite the same admitted manifest and snapshot installed by startup.

- [x] Trace `currentScene` fallback.
- [x] Trace `StageKit.loadScene(currentScene)`.
- [x] Trace UI projection and immediate save.
- [x] Confirm no manifest/snapshot provenance reaches rendering.
- [ ] Add presentation adapters and frame acknowledgement.

## Current gap

```txt
persisted sceneId: unknown value
currentScene: scenes[0] fallback
stage resources: built from scenes[0]
UI title/hotspots: built from scenes[0]
saved state: still carries unknown sceneId
visible frame: no manifest fingerprint or snapshot revision
```

StageKit also receives raw mutable scene data and attaches raw hotspot descriptors to `mesh.userData`.

## Required render contract

```txt
AcceptedStoryStartup
  manifestFingerprint
  snapshotRevision
  activeSceneId
  sceneGeneration

ScenePresentationPlan
  sceneDescriptorDigest
  cameraDescriptorDigest
  hotspotDescriptorDigest
  postDescriptorDigest

FirstStartupFrameAck
  frameId
  manifestFingerprint
  snapshotRevision
  sceneGeneration
  sceneDescriptorDigest
  presentedAtMs
```

## Gate

Do not claim the displayed scene matches persisted startup state until the fallback divergence is eliminated and the first visible frame acknowledges the accepted manifest/snapshot pair.
