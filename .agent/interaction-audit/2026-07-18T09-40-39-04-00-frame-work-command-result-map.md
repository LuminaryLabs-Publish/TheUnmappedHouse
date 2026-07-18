# Interaction audit: render frame-work command and result map

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `audited`

## Current path

```txt
browser RAF
  -> anonymous callback
  -> StageKit.animate()
  -> shared pointer/parallax state
  -> cloned camera position
  -> camera mutation
  -> two render submissions
  -> no typed result
```

## Proposed path

```txt
browser RAF evidence
  -> RenderFrameWorkAdmissionCommand
  -> RenderFrameWorkAdmissionResult

accepted frame
  -> FrameScratchLeaseCommand
  -> FrameScratchLeaseResult
  -> update reusable scratch
  -> submit stage and post passes

observed source-owned work
  -> FrameAllocationObservationCommand
  -> FrameAllocationObservationResult
  -> RenderFrameWorkSettlementCommand
  -> RenderFrameWorkSettlementResult

presented frame
  -> RenderFrameProjectionCommitCommand
  -> RenderFrameWorkDigest
  -> FirstFrameWorkBoundPresentationAck
```

## Required result statuses

```txt
FrameWorkAccepted
FrameWorkRejectedStaleStage
FrameWorkRejectedStaleFrame
FrameScratchLeaseCreated
FrameScratchLeaseReused
FrameScratchLeaseRetired
FrameAllocationWithinBudget
FrameAllocationOverBudget
FrameWorkSettled
FrameWorkPresentationCommitted
FirstFrameWorkBoundPresentationAcknowledged
```

## Interaction invariants

- Pointer parallax must preserve the same visible camera offsets.
- Canvas and DOM hotspot actions must retain existing behavior.
- Interlude and terminal interaction must not depend on allocation instrumentation.
- Hidden-page and resumed-page frames must not reinterpret stale stage or scratch generations.
- Diagnostic counters must remain outside player-facing story state unless explicitly admitted.