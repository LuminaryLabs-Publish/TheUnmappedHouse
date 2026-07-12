# Render-surface audit: pixel budget, capability and commit contract

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

A fixed DPR cap is not a render-surface contract. The product needs an explicit planner that combines CSS dimensions, requested DPR, quality policy, total pixel and sample budgets, WebGL capabilities and predecessor state before any allocation occurs.

## Plan ledger

**Goal:** define the canonical render-surface model and invariants required for safe allocation and presentation.

- [x] Define surface identity and revision.
- [x] Define capability and budget inputs.
- [x] Define plan, result and rollback records.
- [x] Define frame acknowledgement requirements.
- [ ] Implement pure planners and browser adapters.

## Canonical surface plan

```txt
RenderSurfacePlan
  planId
  surfaceId
  expectedSurfaceRevision
  resizeGeneration
  cssWidth
  cssHeight
  requestedDpr
  appliedDpr
  renderScale
  physicalWidth
  physicalHeight
  sampleCount
  pixelCount
  samplePositionCount
  pixelBudget
  sampleBudget
  maxTextureSize
  maxRenderbufferSize
  maxSamples
  fallbackTier
  capabilityFingerprint
  planFingerprint
```

## Allocation result

```txt
RenderSurfaceResult
  resultId
  planId
  status
  priorSurfaceRevision
  committedSurfaceRevision?
  actualDrawingBufferWidth?
  actualDrawingBufferHeight?
  actualTargetWidth?
  actualTargetHeight?
  actualSampleCount?
  framebufferStatus?
  rollbackResult?
  retirementResult?
  firstVisibleFrameId?
```

## Planning policy

```txt
1. normalize finite positive CSS dimensions
2. normalize requested DPR
3. query WebGL capabilities
4. apply product pixel budget
5. apply product sample-position budget
6. reduce samples before exceeding device capability
7. reduce render scale or DPR through declared fallback tiers
8. reject when no valid tier exists
9. fingerprint the immutable plan
```

## Prepare and commit

```txt
prepare candidate renderer dimensions
prepare candidate offscreen target
read back actual dimensions
check framebuffer completeness
verify plan fingerprint and predecessor revision
commit renderer and target as one surface revision
retire predecessor target exactly once
render first frame
publish visible acknowledgement
```

## Rollback

Rollback must preserve:

```txt
prior surface revision
prior renderer dimensions
prior offscreen target
prior camera projection
prior visible frame eligibility
```

A failed candidate must not partially replace the renderer or target authority.

## Invariants

```txt
one committed surface revision has one renderer-target pair
physical width x height does not exceed product pixel budget
physical dimensions do not exceed device texture/renderbuffer limits
sample count does not exceed product or device limits
actual dimensions equal admitted dimensions
framebuffer is complete before commit
stale resize generations cannot commit
predecessor remains usable until candidate commit
retirement happens after commit and at most once
visible frame cites committed surface revision
```

## Observation and journal

Public observations are detached, JSON-safe and bounded. They may expose plans, results and numeric dimensions, but never live renderer, target, texture, framebuffer or WebGL context objects.

## Required fixtures

```txt
planner-deterministic
planner-pixel-budget
planner-sample-budget
planner-device-limits
planner-fallback-tier
stale-revision-rejected
allocation-readback-match
framebuffer-incomplete-rollback
predecessor-preserved
retirement-once
visible-frame-surface-provenance
observation-detached
journal-bounded
```

The contract is renderer-neutral at the domain boundary and Three.js-specific only inside the allocation adapter.