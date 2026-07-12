# Render audit: startup DPR and offscreen allocation gap

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

The renderer and multisampled offscreen target are allocated at fixed design dimensions before the live aspect-frame resize. DPR is capped but total physical pixels and samples are not budgeted or correlated with a visible frame.

## Plan ledger

**Goal:** prove the exact gap between CSS layout, physical allocations and the frame presented to the user.

- [x] Trace renderer construction.
- [x] Trace offscreen target construction.
- [x] Trace constructor resize.
- [x] Trace recurring resize and two-pass submission.
- [x] Quantify representative allocation sizes.
- [ ] Add executable allocation and frame fixtures.

## Current allocation sequence

```txt
renderer = WebGLRenderer({ antialias: true })
pixelRatio = min(devicePixelRatio, 2)
renderer.setPixelRatio(pixelRatio)
renderer.setSize(1920, 1080, false)
target = WebGLRenderTarget(1920 * pixelRatio, 1080 * pixelRatio, { samples: 2 })
resize()
  -> renderer.setPixelRatio(pixelRatio)
  -> renderer.setSize(liveCssWidth, liveCssHeight, false)
  -> target.setSize(liveCssWidth * pixelRatio, liveCssHeight * pixelRatio)
```

## Representative cases

```txt
fixed startup allocation at DPR 2
  renderer physical buffer: 3840 x 2160
  offscreen target: 3840 x 2160
  pixels per surface: 8,294,400

4K live frame at DPR 2
  renderer physical buffer: 7680 x 4320
  offscreen target: 7680 x 4320
  pixels per surface: 33,177,600
  offscreen color sample positions at samples 2: 66,355,200
```

These values exclude depth, resolve storage, the default framebuffer's implementation details and other GPU overhead.

## Visible-frame gap

The frame loop renders:

```txt
scene -> offscreen target
post scene -> default framebuffer
```

It does not publish:

```txt
surface id
surface revision
CSS dimensions
requested and applied DPR
physical dimensions
target sample count
allocation status
framebuffer status
first visible frame id
```

## Failure modes

```txt
transient large startup allocation on small viewports
large high-DPR target allocation without product budget
sample count unsupported or excessive for the device
texture or renderbuffer dimension limit exceeded
renderer and target dimensions diverge after partial failure
rapid resize reallocates repeatedly
visible frame cannot be tied to the intended surface plan
```

## Required proof

```txt
one admitted boot allocation
bounded dimensions across desktop, mobile and 4K matrices
capability-aware sample selection
actual drawing-buffer and target readback
framebuffer completeness
atomic commit or predecessor rollback
first visible frame cites surface revision
```

A screenshot that looks correct at one resolution is not proof of allocation safety or surface provenance.