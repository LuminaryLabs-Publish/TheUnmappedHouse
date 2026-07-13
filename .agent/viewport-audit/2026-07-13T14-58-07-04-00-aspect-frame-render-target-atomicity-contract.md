# Viewport audit: aspect-frame and render-target atomicity contract

**Timestamp:** `2026-07-13T14-58-07-04-00`

## Summary

The existing fixed-aspect math is small and reusable, but live application is not transactional. The contract below keeps 16:9 behavior while separating pure policy from measurement, allocation and adoption.

## Plan ledger

**Goal:** define an atomic contract for DOM frame, renderer, target, camera and pointer transforms.

- [x] Preserve the 1920x1080 design aspect.
- [x] Preserve a capped effective DPR policy.
- [x] Add zero-size and allocation admission.
- [x] Add participant receipts and rollback.
- [x] Add visible proof.
- [ ] Implement.

## Pure preparation

```txt
prepareViewportChange(input) -> ViewportCandidate | ViewportRejection
```

Input:

```txt
surfaceId
lifecycleGeneration
expectedViewportRevision
hostRect
visibility
sampledDpr
dprCap
pixelBudget
gpuMaxTextureSize
```

Candidate:

```txt
cssRect
effectiveDpr
drawingBufferSize
renderTargetSize
cameraAspect
pointerTransform
candidateFingerprint
```

## Admission rules

```txt
non-finite or negative dimensions -> InvalidMeasurement
zero width or height -> ZeroSizeDeferred
hidden surface -> HiddenDeferred
candidate exceeds GPU maximum -> GpuLimitRejected or approved reduced quality
candidate exceeds total pixel budget -> PixelBudgetReduced or rejected
older measurement sequence -> Stale
superseded preparation -> Superseded
```

## Atomic participants

```txt
DOM frame styles
renderer pixel ratio
renderer drawing buffer
offscreen render target
camera projection
pointer transform
viewport diagnostics
```

## Rollback

Capture predecessor fingerprints before adoption. If any live participant fails, restore every already-adopted participant, publish `CommitFailedRolledBack`, retain the predecessor viewport revision and do not acknowledge a successor frame.

## Readback

```txt
CommittedViewportSnapshot {
  surfaceId
  viewportRevision
  measurementSequence
  measurementSource
  cssRect
  effectiveDpr
  drawingBufferSize
  renderTargetSize
  cameraAspect
  pixelCount
  policyRevision
}
```

## Invariants

```txt
CSS size and renderer CSS size match
drawing buffer and target follow effective DPR
camera and pointer transforms cite the same revision
zero-size surfaces allocate nothing new
failed work cannot advance viewport revision
frame acknowledgement cannot precede accepted adoption
```
