# Interaction audit: viewport observation to surface result map

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

Viewport changes currently bypass command admission and mutate Three.js resources directly. This audit maps the typed observation, planning and result surfaces required for deterministic resize behavior.

## Plan ledger

**Goal:** convert raw window resize callbacks into ordered, stale-rejectable surface commands and results.

- [x] Identify raw observation inputs.
- [x] Identify direct resource mutations.
- [x] Identify missing identities and statuses.
- [x] Define command/result projection.
- [ ] Implement and prove interaction parity.

## Current path

```txt
window resize event
  -> read innerWidth
  -> read innerHeight
  -> read devicePixelRatio
  -> computeAspectFrame
  -> applyAspectFrame
  -> renderer.setPixelRatio
  -> renderer.setSize
  -> target.setSize
  -> no result
```

## Required command path

```txt
ViewportObservation
  observationId
  sourceKind
  resizeGeneration
  cssAvailableWidth
  cssAvailableHeight
  requestedDpr
  expectedSurfaceRevision
  observedAtMs

  -> RenderSurfacePlan
  -> RenderSurfaceCommand
  -> RenderSurfaceResult
```

## Required result statuses

```txt
Committed
Duplicate
RejectedStaleGeneration
RejectedInvalidDimensions
RejectedPixelBudget
RejectedTextureLimit
RejectedRenderbufferLimit
RejectedSampleLimit
AllocationFailed
FramebufferIncomplete
RolledBack
```

## Admission rules

```txt
width and height must be finite and positive
observation generation must not precede the committed generation
expected surface revision must match
requested DPR must be normalized through policy
physical dimensions must fit product pixel budget
physical dimensions must fit WebGL texture and renderbuffer limits
sample count must fit product and WebGL limits
candidate allocation must be readable and framebuffer-complete
```

## Side-effect rule

Rejected observations perform zero renderer, target, camera, CSS-frame or story mutation. Failed candidate allocation must preserve the predecessor renderer-target pair.

## Observation projection

```txt
surfaceId
surfaceRevision
resizeGeneration
cssWidth
cssHeight
requestedDpr
appliedDpr
physicalWidth
physicalHeight
sampleCount
capabilityFingerprint
lastResult
firstVisibleFrameId
```

## Required parity

```txt
initial boot and later resize use the same planner
browser and Pages use the same policy
orientation and window resize use the same command path
manual test hooks cannot bypass surface admission
```

The interaction boundary should expose intent and results, not live Three.js resources.