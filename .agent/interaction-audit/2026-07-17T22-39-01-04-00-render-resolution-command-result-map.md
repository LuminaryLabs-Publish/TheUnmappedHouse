# Interaction audit: render-resolution command and result map

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Inputs

```txt
browser resize
orientation change
device pixel ratio change
quality policy change
allocation failure
frame-cost threshold crossing
```

## Required command and result map

```txt
RenderResolutionAdmissionCommand
  -> AcceptedExact
  -> AcceptedClamped
  -> RejectedInvalidViewport
  -> RejectedPixelBudget
  -> RejectedSampleBudget
  -> RejectedStale

RenderTargetResizeCommand
  -> Applied
  -> Unchanged
  -> FailedAllocation
  -> FellBackSamples
  -> FellBackDpr
  -> FellBackRenderScale
  -> RejectedStale

RenderBudgetSettlementCommand
  -> WithinBudget
  -> Degraded
  -> Recovered
  -> ObservationUnavailable
  -> RejectedStale

RenderResolutionProjectionCommitCommand
  -> Committed
  -> RejectedStale
  -> FirstResolutionBoundFrameAcknowledged
```

## Interaction invariant

CSS layout, pointer normalization and hotspot coordinates must continue to use the aspect-frame viewport. Render scale may change physical resolution, but it must not change semantic picking or DOM placement.

## Boundary

Proposed contracts only. No input or interaction handler changed.