# Render audit: unbounded DPR and offscreen-target frame gap

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Source path

```txt
computeAspectFrame(innerWidth, innerHeight)
  -> viewport width and height
  -> renderer.setPixelRatio(min(devicePixelRatio, 2))
  -> renderer.setSize(viewport.width, viewport.height)
  -> target.setSize(viewport.width * pixelRatio, viewport.height * pixelRatio)
  -> target samples=2
  -> full scene pass
  -> full post-process pass
```

## Finding

The CSS viewport and physical render surfaces share no explicit quality or capacity policy. Physical work scales with viewport area multiplied by DPR squared, while the offscreen target additionally carries a two-sample policy. The code does not publish the accepted dimensions or prove that the presented frame used them.

## Missing controls

```txt
renderScale: absent
maximum drawing-buffer area: absent
maximum target area: absent
maximum dimension: absent
sample-count admission: absent
resize coalescing: absent
allocation fallback: absent
adaptive quality settlement: absent
RenderResolutionDigest: absent
FirstResolutionBoundFrameAck: absent
```

## Required frame proof

A frame proof must record CSS viewport, admitted DPR, render scale, default drawing-buffer dimensions, offscreen target dimensions, sample count, scene-pass cost, post-pass cost and frame generation.

## Boundary

No visual defect or performance regression is claimed. Runtime rendering was not changed or executed.