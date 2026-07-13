# Next steps: The Unmapped House render-surface viewport authority

**Timestamp:** `2026-07-13T14-58-07-04-00`  
**Status:** `audited`

## Summary

Build a pure viewport preparation path before changing live DOM or GPU state. The first implementation slice should measure the actual render host, classify zero-size and hidden states, apply an explicit DPR and pixel budget, prepare every participant candidate and adopt the complete set only after validation.

## Plan ledger

**Goal:** eliminate unversioned and partially applied viewport transitions without changing the fixed 16:9 art direction.

- [ ] Add `SurfaceId`, `LifecycleGeneration` and `ViewportRevision`.
- [ ] Measure the actual host box instead of global window dimensions.
- [ ] Add `ResizeObserver` as the primary size source with bounded window fallback.
- [ ] Return `ZeroSizeDeferred` for hidden or zero-area hosts.
- [ ] Add explicit DPR cap, total-pixel budget and GPU maximum-dimension checks.
- [ ] Prepare DOM frame, renderer buffer, render target, camera and pointer-transform candidates.
- [ ] Collect participant preparation receipts.
- [ ] Atomically adopt all participants or retain all predecessors.
- [ ] Add rollback for allocation or adoption failures.
- [ ] Reject stale, duplicate and superseded commands with zero mutation.
- [ ] Publish terminal `ViewportCommitResult` statuses.
- [ ] Expose committed viewport readback to diagnostics.
- [ ] Correlate hotspot picks with the committed viewport revision.
- [ ] Publish `FirstViewportFrameAck`.
- [ ] Add source, browser, built-output and Pages fixture matrices.

## Ordered implementation

### 1. Define identities

```txt
SurfaceId
LifecycleGeneration
ViewportRevision
MeasurementSequence
FrameSequence
```

### 2. Measure and classify

Measure `#app` or the declared render host. Preserve zero as zero. Classify hidden, detached, invalid, unchanged and valid candidates before allocation.

### 3. Apply policy

```txt
host CSS box
  -> fixed 16:9 fit
  -> DPR policy
  -> GPU maximum dimensions
  -> total-pixel budget
  -> quality fallback or rejection
```

### 4. Prepare participants

```txt
DomFrameCandidate
RendererBufferCandidate
RenderTargetCandidate
CameraProjectionCandidate
PointerTransformCandidate
```

No live participant mutates during preparation.

### 5. Commit or reject

Only a fully prepared participant set may adopt. A failed participant preserves the complete predecessor set and returns one terminal result.

### 6. Prove the frame

`FirstViewportFrameAck` must carry surface ID, viewport revision, CSS dimensions, drawing-buffer dimensions, render-target dimensions, DPR and frame sequence.

### 7. Execute fixtures

```txt
initial 1920x1080-equivalent boot
portrait and landscape resizes
very small host
zero-size host then restoration
hidden tab or detached host
DPR 1 to 2 transition
DPR above cap
pixel-budget fallback
GPU maximum-dimension rejection
rapid resize supersession
render-target allocation failure
rollback after partial adoption
pointer pick during resize
first visible viewport frame
fresh built-output load
GitHub Pages load and resize
```

## Do not combine yet

Keep scene transition, provider admission, hotspot picking, persistence, interlude timing and stage-resource lifetime as bounded authorities. Viewport coordination consumes their accepted surfaces but does not absorb their internal rules.
