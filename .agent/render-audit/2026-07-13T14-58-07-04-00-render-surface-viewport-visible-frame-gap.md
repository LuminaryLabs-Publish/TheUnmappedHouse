# Render audit: render-surface viewport visible-frame gap

**Timestamp:** `2026-07-13T14-58-07-04-00`

## Summary

The visible canvas is produced from a DOM frame, WebGL drawing buffer, offscreen render target and camera that update without one shared viewport revision. A visually plausible frame does not prove that every render participant used the same accepted measurement and DPR policy.

## Plan ledger

**Goal:** define the render evidence required to prove one coherent viewport frame.

- [x] Trace DOM and GPU size mutations.
- [x] Trace target and camera updates.
- [x] Identify missing frame provenance.
- [x] Define recovery and acknowledgement requirements.
- [ ] Implement and execute render fixtures.

## Current render path

```txt
resize()
  -> renderer.setPixelRatio(dpr)
  -> applyAspectFrame()
  -> camera.updateProjectionMatrix()
  -> renderer.setSize(cssWidth, cssHeight, false)
  -> target.setSize(cssWidth*dpr, cssHeight*dpr)

animate()
  -> render scene to target
  -> render post scene to canvas
```

## Gaps

```txt
shared viewport revision: absent
actual host measurement source: absent
drawing-buffer readback: absent
render-target readback: absent
camera revision: absent
allocation budget result: absent
partial-resize classification: absent
last complete viewport recovery: absent
first matching visible-frame acknowledgement: absent
```

## Required frame envelope

```txt
FrameViewportEnvelope {
  surfaceId
  viewportRevision
  frameSequence
  cssRect
  drawingBufferSize
  renderTargetSize
  cameraAspect
  effectiveDpr
  sceneId
  stageGeneration
}
```

## Failure policy

```txt
preparation failure
  -> retain predecessor DOM and GPU participants
  -> publish rejected ViewportCommitResult

adoption failure
  -> restore predecessor participant set
  -> publish rollback receipt

zero-size or hidden host
  -> suspend allocation and presentation
  -> retain last complete frame metadata
  -> wait for a valid successor measurement
```

## Proof boundary

A passing screenshot is insufficient. Proof requires participant readback and a `FirstViewportFrameAck` whose viewport revision matches the accepted result and the visible canvas frame.
