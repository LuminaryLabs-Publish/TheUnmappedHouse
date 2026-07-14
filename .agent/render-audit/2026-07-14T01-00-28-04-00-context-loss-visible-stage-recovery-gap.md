# Render audit: Context loss and visible stage recovery gap

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

The visible stage is produced by one WebGL renderer, one offscreen target and one post-processing pass. Context loss has no application-owned fallback, generation identity, reconstruction result or first recovered visible-frame acknowledgement.

## Plan ledger

**Goal:** make visible stage continuity and recovery evidence explicit without confusing story-state continuity with renderer readiness.

- [x] Trace renderer, target, scene, camera, materials and post resources.
- [x] Trace frame submission and pointer-driven presentation.
- [x] Confirm no context-loss or restoration listener exists.
- [x] Confirm no fallback or recovered-frame proof exists.
- [x] Define the required render envelope and acknowledgement.
- [ ] Implement browser recovery proof.

## Current render path

```txt
scene descriptor
  -> clear current StageKit group
  -> build layer, prop and hotspot meshes
  -> configure camera, fog and post uniforms
  -> recursive RAF
  -> render scene into WebGLRenderTarget
  -> render post scene to canvas
```

## Failure path

```txt
WebGL context becomes lost
  -> application receives no normalized event
  -> no readiness downgrade
  -> no DOM fallback
  -> no explicit halt of frame submission
  -> no context or stage generation change
  -> story UI and hotspot buttons remain live
  -> restoration is not followed by an application-owned probe
  -> visible correctness is unknown
```

## Missing render identities

```txt
SurfaceId
WebGLContextGeneration
StageResourceGeneration
SceneDescriptorRevision
ViewportRevision
RenderSubmissionGeneration
RecoveryAttemptId
RecoveryProbeFrameId
RecoveredFrameSequence
```

## Required frame envelope

```txt
RecoveredStageFrameEnvelope
  surfaceId
  contextGeneration
  stageResourceGeneration
  sceneId
  sceneDescriptorRevision
  viewportRevision
  renderSubmissionGeneration
  frameSequence
  fallbackRetired
  presentationReady
```

## Required visible proof

`FirstRecoveredStageFrameAck` must be published only after:

```txt
accepted context is current
all required stage resources are adopted
scene and post passes submit successfully
canvas is connected and visible
frame uses the accepted viewport
frame sceneId matches current story truth
fallback remains until the frame is acknowledged
```

## Important distinction

This audit does not assert that Three.js performs no internal restoration work. It identifies the absence of application-owned evidence establishing which context generation, resource generation, scene descriptor and viewport produced the recovered visible canvas.

## Required fixtures

```txt
loss before first frame
loss during each authored scene
loss while interlude is open
loss during resize
loss after DPR change
loss while pointer is over a hotspot
repeated loss before restoration
restoration with shader preparation failure
restoration with target allocation failure
restoration with geometry preparation failure
restoration after scene transition
fallback visibility
interaction suspension
successful first recovered frame
failed recovery with preserved fallback
built-output and Pages origins
```

## Completion boundary

Do not claim render recovery because the browser or Three.js may recreate internal objects. Completion requires application-owned context identity, a complete resource manifest, candidate preparation, probe, atomic adoption or rollback and a first visible frame tied to the accepted generation.