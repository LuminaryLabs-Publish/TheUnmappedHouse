# Architecture audit: render-surface viewport authority DSK map

**Timestamp:** `2026-07-13T14-58-07-04-00`

## Summary

Viewport changes cross layout, rendering, camera and interaction participants but have no coordinating domain. The correct architecture is a narrow composition authority that prepares and commits participant revisions together while leaving CSS layout, Three.js allocation, camera math and picking semantics in their bounded owners.

## Plan ledger

**Goal:** define the smallest DSK boundary that closes the viewport divergence and allocation gap.

- [x] Identify participant ownership.
- [x] Separate bounded domains from coordination.
- [x] Define command, receipts, result and frame acknowledgement.
- [x] Define candidate kits and proof gates.
- [ ] Implement after contract review.

## Existing bounded ownership

```txt
Shell and CSS domain
  owns #app, #aspect-frame and responsive overlay rules

Aspect-frame domain
  owns fixed 1920x1080 fit calculations

Stage domain
  owns renderer, target, camera and frame submission

Interaction domain
  owns canvas-relative pointer normalization and raycasting

Diagnostics domain
  owns visible Notebook projection
```

## Missing coordinator

```txt
the-unmapped-house-render-surface-viewport-authority-domain
```

It coordinates accepted participant revisions. It does not own authored story meaning, Three.js implementation, CSS aesthetics or hotspot semantics.

## DSK decomposition

```txt
Identity and lifecycle
  render-surface-identity-kit
  viewport-revision-kit
  viewport-change-command-kit
  surface-visibility-lifecycle-kit

Measurement and policy
  host-box-measurement-kit
  resize-observer-source-kit
  aspect-fit-policy-kit
  dpr-policy-kit
  pixel-budget-policy-kit
  gpu-dimension-admission-kit
  zero-size-deferral-kit

Preparation
  viewport-candidate-kit
  dom-frame-candidate-kit
  renderer-buffer-candidate-kit
  render-target-candidate-kit
  camera-projection-candidate-kit
  pointer-transform-candidate-kit
  viewport-participant-prepare-kit
  viewport-participant-receipt-kit

Commit and recovery
  viewport-atomic-commit-kit
  viewport-rollback-kit
  viewport-result-kit

Observation and proof
  viewport-observation-kit
  frame-viewport-envelope-kit
  first-viewport-frame-ack-kit
  viewport-fixture-matrix-kit
```

## Command contract

```txt
ViewportChangeCommand {
  surfaceId
  lifecycleGeneration
  expectedViewportRevision
  measurementSequence
  hostRect
  sampledDpr
  visibility
  gpuLimits
  reason
}
```

## Participant preparation receipt

```txt
ViewportParticipantReceipt {
  surfaceId
  viewportRevision
  participantId
  predecessorFingerprint
  candidateFingerprint
  status
  failureReason?
}
```

## Terminal result

```txt
ViewportCommitResult {
  surfaceId
  status
  predecessorRevision
  viewportRevision?
  cssRect?
  drawingBufferSize?
  renderTargetSize?
  cameraAspect?
  effectiveDpr?
  participantReceipts
  rollbackReceipt?
}
```

## Commit ordering

```txt
measure actual host
  -> classify lifecycle and zero size
  -> apply aspect, DPR and pixel policies
  -> prepare all participant candidates
  -> validate receipts and allocation limits
  -> adopt one viewport revision
  -> publish terminal result
  -> render accepted revision
  -> publish FirstViewportFrameAck
```

## Invariants

```txt
zero size never becomes a valid one-pixel surface
no live participant mutates during prepare
rejection preserves every predecessor revision
accepted result references one coherent participant set
drawing buffer and target sizes follow one effective DPR
camera and pointer transforms cite the accepted revision
visible frame cannot acknowledge a rejected viewport
```

## Promotion boundary

Keep the aspect-frame policy product-specific. Reuse generic surface identity, measurement, revision, participant receipt, atomic commit, budget and frame-ack primitives from Nexus Engine where available.
