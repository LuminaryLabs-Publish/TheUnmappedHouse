# Render audit: DPR and multisample target budget gap

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Prove that visible composition, renderer drawing-buffer dimensions, post-target dimensions, sampling quality, and first-frame output share one bounded surface revision.

## Source-backed behavior

```txt
pixelRatio = min(devicePixelRatio, 2)
renderer.setPixelRatio(pixelRatio)
renderer.setSize(viewport.width, viewport.height)
target.setSize(floor(viewport.width * pixelRatio), floor(viewport.height * pixelRatio))
target.samples = 2
```

The constructor first allocates design-sized renderer and target resources, then immediately calls `resize()` and can allocate another size.

## Concrete scale

```txt
viewport: 3840 x 2160
admitted DPR: 2
requested post target: 7680 x 4320
requested pixels: 33,177,600
samples: 2
```

This does not include depth and implementation-specific backing overhead. No pixel budget or capability gate is consulted before allocation.

## Current gaps

- No distinction between CSS frame dimensions and internal render resolution.
- No maximum renderer or post-target pixel count.
- No quality tiers or immutable baseline.
- No capability query for maximum texture/renderbuffer size or samples.
- No detached allocation or predecessor preservation.
- No typed allocation result or failure classification.
- No automatic lower-resolution fallback.
- No surface revision or resize generation.
- No stale resize-result rejection.
- No actual drawing-buffer or target-size diagnostics.
- No visible-frame acknowledgement tied to the new surface.

## Required render invariant

```txt
A visible frame may claim surfaceRevision N only when:
  CSS frame N is applied
  camera aspect N is applied
  renderer drawing buffer N is active
  post target N is active
  post material samples target N
  all dimensions satisfy the admitted budget
  the predecessor remains recoverable until commit
```

## Required evidence

```txt
requested and applied DPR
CSS frame dimensions
renderer CSS size
drawing-buffer dimensions
post-target dimensions and samples
pixel count and budget decision
fallback tier and reason
resize generation and surface revision
allocation and rollback results
first visible frame id
```
