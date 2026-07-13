# Interaction audit: viewport change participant result map

**Timestamp:** `2026-07-13T14-58-07-04-00`

## Summary

The current resize callback is an untyped side effect. This map defines one command and result path across measurement, policy, participant preparation, atomic adoption and visible proof.

## Plan ledger

**Goal:** make each viewport request produce exactly one terminal result.

- [x] Map request sources.
- [x] Map participants.
- [x] Define result statuses.
- [x] Define observer and frame receipts.
- [ ] Implement and test.

## Request sources

```txt
initial boot
window resize fallback
ResizeObserver measurement
DPR change
visibility restoration
editor or embedding host resize
manual recovery retry
```

## Participant map

```txt
ViewportChangeCommand
  -> host measurement
  -> aspect fit
  -> DPR and pixel budget
  -> DOM frame candidate
  -> renderer buffer candidate
  -> render target candidate
  -> camera projection candidate
  -> pointer transform candidate
  -> participant receipt set
  -> atomic commit or rejection
  -> ViewportCommitResult
  -> FirstViewportFrameAck
```

## Required result statuses

```txt
Accepted
Unchanged
ZeroSizeDeferred
HiddenDeferred
InvalidMeasurement
GpuLimitRejected
PixelBudgetReduced
PreparationFailed
CommitFailedRolledBack
Duplicate
Stale
Superseded
Cancelled
Disposed
```

## Observer contract

Subscribers receive the immutable terminal result after adoption or rejection. They do not sample mutable renderer or DOM participants to infer success.

## Duplicate and stale policy

The authority keys work by surface, lifecycle generation and measurement sequence. Repeated identical candidates return `Unchanged` or `Duplicate`; older work returns `Stale` or `Superseded` with zero mutation.

## Visible acknowledgement

`FirstViewportFrameAck` is emitted only after a rendered frame presents the exact accepted viewport revision. It includes the result ID, frame sequence, CSS size, drawing-buffer size, target size and effective DPR.
