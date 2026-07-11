# Render Audit: Context Generation and Recovered Frame Gap

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

The renderer graph has no application-visible context generation. A frame can only be described by mutable Three.js objects and story state; it cannot prove which WebGL context/resource generation produced the visible canvas.

## Plan ledger

**Goal:** define the render evidence required to distinguish lost, restoring, failed, and visibly recovered context states.

- [x] Trace renderer, target, post texture, materials, geometries, hotspots, resize, and RAF submission.
- [x] Identify missing context and resource identities.
- [x] Define frame admission and first-recovered-frame evidence.
- [x] Define stale-generation and partial-rebuild failure boundaries.
- [ ] Implement and run the render gate.

## Current render path

```txt
StageKit.animate()
  -> schedule next RAF without retaining the request id
  -> mutate camera from pointer state
  -> mutate stage and post time uniforms
  -> setRenderTarget(current target)
  -> render current scene and camera
  -> setRenderTarget(null)
  -> render current post scene and post camera
```

No step checks:

```txt
context state
context generation
resource generation
target generation
stage generation
surface revision readiness
restoration transaction state
recovered frame status
```

## Context-bound resources without generation identity

```txt
WebGLRenderer and canvas context
renderer internal state and programs
WebGLRenderTarget storage
postMaterial tDiffuse binding
stage ShaderMaterials and uniforms
post ShaderMaterial and uniforms
plane, box, cylinder and hotspot geometries
hotspot MeshBasicMaterials
shadow and texture/renderbuffer state
```

## Main gap

```txt
story and stage may advance
  -> visible frame may be unavailable or stale
  -> no typed render failure is published
  -> no last-good-frame identity is retained
  -> no recovered resource registry is committed
  -> no first recovered frame proves convergence
```

A context restoration that appears visually successful would still lack proof that the post pass samples the rebuilt target, that scene and hotspot resources belong to the active context generation, or that pointer selection references the recovered frame.

## Required frame descriptor

```txt
CommittedRenderFrame
  frameId
  sessionId
  sessionGeneration
  storyRevision
  sceneId
  stageEpoch
  surfaceRevision
  resizeGeneration
  contextGeneration
  resourceGeneration
  targetGeneration
  hotspotSetRevision
  cameraRevision
  status: ready | suspended | failed | recovered
  presentedAt
```

## Required recovered frame gate

```txt
context state == RESTORING
  -> candidate resource registry complete
  -> renderer, target, post binding and scene resources share candidate generation
  -> one frame renders successfully
  -> actual canvas/target dimensions are read back
  -> visible frame observation carries candidate generation
  -> context state becomes READY
  -> RecoveredFrameAck is committed
```

## Required failure behavior

```txt
loss during frame
  -> no ready-frame commit

failure during rebuild
  -> dispose partial candidate resources
  -> keep context state FAILED or RESTORING
  -> keep render-dependent input fenced
  -> publish rollback/failure result

newer loss during restore
  -> supersede candidate generation
  -> reject stale restore result
```

## Required render fixtures

```txt
lost-context-produces-no-ready-frame
last-good-frame-id-remains-stable-during-loss
restore-creates-new-context-generation
post-target-rebuilt-for-new-generation
post-material-samples-new-target
scene-and-hotspot-resources-ready-before-frame
stale-resource-generation-cannot-render-ready
partial-rebuild-never-commits-frame
first-recovered-frame-carries-all-generations
second-frame-remains-on-same-generation
repeated-loss-restore-does-not-grow-live-resource-count
```
