# Render audit: pointer, camera and visible-frame gap

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The raycast uses mutable camera and pointer objects without recording which rendered frame they represent. Pointer movement changes the parallax target immediately, while the camera consumes that target on the next RAF. A click can therefore be resolved with a new pointer sample and an older camera pose, and no visible-frame receipt proves that the selected hotspot matched the image the player acted on.

## Plan ledger

**Goal:** correlate every visual hotspot pick with one admitted viewport, camera pose and visible frame.

- [x] Trace pointer mutation and RAF camera application.
- [x] Trace canvas sizing and raycaster inputs.
- [x] Identify missing frame provenance.
- [x] Define render-side contracts.
- [ ] Implement and execute frame-correlated picking proof.

## Current render order

```txt
mousemove
  -> update pointer clip coordinates
  -> update parallax mouse target

next RAF
  -> derive camera position from parallax mouse target
  -> render stage to offscreen target
  -> render post pass to canvas

click at any point
  -> raycast with cached pointer
  -> raycast with camera object's current pose
  -> publish no camera/frame identity
```

## Concrete gap

The visual state has no immutable record containing:

```txt
render frame sequence
scene revision
hotspot-set revision
CSS viewport dimensions
canvas bounding rect
pixel ratio
drawing-buffer dimensions
camera projection revision
camera world pose revision
pointer sample ID
normalized pointer coordinates
raycast candidate list
selected hotspot ID
```

The renderer snapshot surface is absent, so inspection results cannot cite the frame the player saw.

## Required render contracts

### `PickFrameState`

```txt
runtimeSessionId
sceneRevision
hotspotSetRevision
viewportRevision
canvasRectRevision
cameraPoseRevision
projectionRevision
renderFrameSequence
presentedAt
```

### `RaycastCandidateResult`

```txt
commandId
pointerSampleId
pickFrameState
normalizedCoordinates
candidate hotspot IDs
intersection distances
selected hotspot ID or null
tie policy
terminal status
```

### `FirstVisibleInspectionFrameAck`

```txt
inspectionResultId
sceneRevision
hotspotId
renderFrameSequence
cameraPoseRevision
viewportRevision
storyRevision
```

## Required behavior

```txt
pointer sample and click coordinates are captured from the same submitting event
pick uses an explicitly committed camera pose
pick frame is either the last presented frame or a documented current-frame policy
resize invalidates older canvas-rect and projection revisions
scene load invalidates older hotspot-set revisions
render feedback cites the accepted inspection result
```

## Additional presentation gap

The hover label is updated only during mouse movement. No leave event clears it, and no render or interaction revision proves whether the label corresponds to the current camera, scene or pointer position.

## Validation boundary

No renderer, camera, shader, post-processing, canvas sizing or raycast code changed. No frame capture or browser render proof was executed.