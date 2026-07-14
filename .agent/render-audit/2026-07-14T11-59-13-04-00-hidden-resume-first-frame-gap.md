# Render audit: hidden-page resume and first-frame gap

**Timestamp:** `2026-07-14T11-59-13-04-00`

## Summary

The Three.js stage submits frames through an unbounded recursive RAF and advances shader time through `THREE.Clock`. There is no application-level suspension, restoration probe or first resumed-frame acknowledgement.

## Plan ledger

**Goal:** ensure a resumed visible canvas is produced by one accepted stage, context, viewport, scene and clock generation.

- [x] Trace renderer, target, camera, material and RAF ownership.
- [x] Trace resize and elapsed-time behavior.
- [x] Identify hidden-page and restored-page evidence gaps.
- [ ] Implement suspension, revalidation and frame acknowledgement.

## Current render loop

```txt
animate()
  -> request the next frame immediately
  -> read THREE.Clock elapsed time
  -> update all stage material time uniforms
  -> update post-process time
  -> render scene into WebGLRenderTarget
  -> render post scene to the canvas
```

## Gaps

```txt
RAF request ID: not retained
render-submission lease: absent
visibility suspension: absent
clock pause/rebase result: absent
pagehide/pageshow handling: absent
BFCache persisted classification: absent
renderer/context revalidation: absent
render-target revalidation: absent
viewport revision on restore: absent
scene revision probe: absent
first resumed source frame: absent
first resumed post-process frame: absent
```

## Required frame acknowledgement

```txt
FirstResumedStageFrameAck
  documentGeneration
  lifecycleAttemptId
  stageGeneration
  sceneId
  storyStateRevision
  rendererGeneration
  webglContextGeneration
  renderTargetGeneration
  viewportRevision
  clockRevision
  renderLeaseId
  frameSequence
  timestamp
```

## Failure behavior

If the prior renderer or context is invalid after restoration, interaction must remain suspended while a candidate stage is rebuilt. A failed candidate must not publish a partial canvas or start a second RAF loop. A DOM-owned fallback should remain visible until one accepted frame is acknowledged.

## Validation gap

Syntax checking cannot prove background suspension, duplicate RAF prevention, context survival, clock rebasing, viewport restoration or the first visible frame after BFCache restore.