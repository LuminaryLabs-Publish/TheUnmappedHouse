# Render-resolution audit: DPR, framebuffer and sample-budget contract

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Current policy

```txt
CSS design aspect: 1920x1080
viewport: largest 16:9 area inside browser window
DPR: min(devicePixelRatio, 2)
default drawing buffer: viewport x DPR
offscreen target: viewport x DPR
offscreen samples: 2
scene passes per RAF: 1
post passes per RAF: 1
```

## Authority contract

The accepted generation must include:

```txt
ViewportGeneration
QualityPolicyRevision
DevicePixelRatioSample
RenderScale
DrawingBufferWidth
DrawingBufferHeight
TargetWidth
TargetHeight
TargetSamples
FrameGeneration
```

## Invariants

1. CSS layout and semantic pointer space remain independent of physical render scale.
2. Drawing-buffer and target dimensions remain within explicit dimension and area limits.
3. Target pixel area multiplied by sample count remains within the accepted sample budget.
4. Rapid resize samples cannot commit stale allocations.
5. Allocation failure triggers a typed fallback sequence instead of an unclassified crash.
6. A quality change is not complete until the first matching presented frame is acknowledged.

## Recommended fallback order

```txt
reduce offscreen samples
  -> reduce admitted DPR
  -> reduce render scale
  -> retain CSS viewport and interaction semantics
  -> report the accepted degraded result
```

Exact thresholds require browser measurements and are not selected by this documentation audit.

## Boundary

No runtime policy was implemented and no device budget was measured.