# Known gaps: The Unmapped House render-surface viewport authority

**Timestamp:** `2026-07-13T14-58-07-04-00`  
**Status:** `audited`

## Summary

The render surface has no shared viewport identity, preparation barrier, atomic commit, rollback result or visible-frame receipt. CSS, DOM, renderer, target, camera and pointer consumers can observe different size generations.

## Plan ledger

**Goal:** make every viewport divergence explicit and testable.

- [x] Trace CSS and JavaScript frame ownership.
- [x] Trace drawing-buffer, render-target and camera mutation order.
- [x] Identify allocation, zero-size and pointer-correlation gaps.
- [x] Define the authority and result contract.
- [ ] Implement and execute it.

## Identity gaps

```txt
SurfaceId: absent
LifecycleGeneration: absent
ViewportRevision: absent
MeasurementSequence: absent
FrameSequence correlation: absent
expected predecessor revision: absent
```

## Measurement and policy gaps

```txt
actual host-box measurement: absent
ResizeObserver authority: absent
zero-size deferral: absent
visibility classification: absent
explicit DPR policy revision: absent
total-pixel budget: absent
GPU maximum-dimension admission: absent
quality fallback result: absent
```

## Preparation and commit gaps

```txt
detached DOM frame candidate: absent
detached renderer-buffer candidate: absent
detached render-target candidate: absent
detached camera candidate: absent
detached pointer-transform candidate: absent
participant preparation receipts: absent
atomic participant adoption: absent
zero-mutation rejection: absent
rollback result: absent
stale or superseded rejection: absent
terminal ViewportCommitResult: absent
```

## Reachable divergence windows

```txt
render-target resize failure
  -> DOM frame and renderer may already use successor dimensions
  -> target may remain predecessor or fail
  -> no rollback result

rapid resize
  -> anonymous callbacks mutate shared participants
  -> no revision rejects stale or superseded work

hidden or zero-sized host
  -> dimensions clamp to one pixel
  -> surface is treated as valid instead of deferred

pointer event during transition
  -> canvas rectangle can cite one size
  -> camera or target can cite another size
  -> no viewport revision ties the pick to a committed frame
```

## Presentation gaps

```txt
committed viewport readback: absent
drawing-buffer and target parity diagnostics: absent
viewport provenance in frame: absent
first viewport frame acknowledgement: absent
last complete viewport recovery: absent
visible Notebook viewport diagnostics: absent
```

## Validation gaps

```txt
host measurement fixtures: absent
zero-size restoration fixture: absent
DPR transition fixture: absent
pixel-budget fixture: absent
GPU-limit fixture: absent
rapid-resize supersession fixture: absent
allocation failure and rollback fixture: absent
pointer correlation fixture: absent
browser visible-frame fixture: absent
built-output smoke: absent
Pages viewport smoke: absent
```

## Retained independent gaps

```txt
scene-transition composition
renderer-provider admission
hotspot input and raycast picking
browser save commit and reset convergence
interlude progression and modal focus
stage resource lifecycle and runtime stop
Notebook channel classification
```

## Completion boundary

Do not claim viewport reliability because normal desktop resizing appears correct. Completion requires actual host measurement, zero-size deferral, bounded allocation, participant preparation, atomic adoption or rollback, stale-work rejection, pointer correlation, committed diagnostics and a first visible frame tied to the accepted viewport revision.
