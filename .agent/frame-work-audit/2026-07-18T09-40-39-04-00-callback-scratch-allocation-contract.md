# Frame-work audit: callback, scratch and allocation contract

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `audited`

## Authority boundary

`the-unmapped-house-render-loop-frame-allocation-scratch-authority-domain`

## Owned identities

```txt
StageGeneration
FrameGeneration
FrameWorkManifestRevision
RafCallbackLeaseId
FrameScratchLeaseId
AllocationObservationId
RenderFrameWorkDigest
PresentationFrameId
```

## Required invariants

1. One accepted StageKit generation retains one RAF callback identity.
2. One accepted StageKit generation retains reusable camera scratch state.
3. Scratch from a retired stage generation cannot be admitted by a successor.
4. Source-owned allocation observations are separated from unknown provider/browser work.
5. An over-budget result cannot silently mutate story or interaction state.
6. A presented-frame acknowledgement references the same stage, frame-work and scratch generations used for submission.
7. Lifecycle stop retires callback and scratch leases exactly once.

## Initial budget policy

The audit does not prescribe a numeric production budget without measurement. The first proof target is steady-state elimination of the two source-visible recurring constructions:

```txt
new RAF callbacks after initialization: 0 per frame
new camera scratch vectors after initialization: 0 per frame
```

Provider and browser allocations remain observations, not assumed engine-owned failures.

## Fixture matrix

| Fixture | Required evidence |
|---|---|
| steady-state scene | stable callback and scratch identities across frames |
| pointer parallax | unchanged camera result with scratch reuse |
| scene transition | predecessor scratch retired, successor admitted |
| hidden/resume | no stale callback or scratch generation |
| terminal state | stable frame-work policy after prototype completion |
| source/artifact/Pages | matching policy and frame digest |
| browser heap observation | bounded, timestamped evidence without overclaiming causality |

## Boundary

This document defines a proposed contract only. No allocation path, scheduler, camera, renderer or lifecycle code changed.