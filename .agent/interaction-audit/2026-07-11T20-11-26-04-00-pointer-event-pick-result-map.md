# Interaction audit: Pointer event to pick result map

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

The canvas interaction path has no explicit command/result boundary. Browser events mutate shared vectors and a later click consumes those ambient values. This audit maps the required admission and result sequence.

## Plan ledger

**Goal:** turn each browser activation into one immutable observation, one admitted pick plan, one typed pick result, and one canonical activation command.

- [x] Map current mousemove, click, hover, raycast, side-panel and inspection paths.
- [x] Define admission checks and rejection classes.
- [x] Define command/result correlation.
- [ ] Implement the map and executable fixtures.

## Current map

```txt
mousemove(event)
  -> pointer.x/y mutation
  -> mouse.x/y mutation
  -> raycast
  -> hovered descriptor mutation
  -> hover DOM mutation

click(event)
  -> event ignored
  -> raycast ambient pointer
  -> descriptor dispatch
  -> story mutation
```

## Required map

```txt
PointerEventObservation
  -> lifecycle admission
  -> modality admission
  -> canvas capability admission
  -> stage/surface/camera/context/frame identity capture
  -> coordinate normalization result
  -> HotspotPickPlan
  -> raycast execution
  -> HotspotPickResult
  -> stale-result validation
  -> CanvasActivationCommand
  -> canonical hotspot resolution
  -> InspectionCommand
  -> ActivationResult
  -> observation and journal projection
```

## Admission checks

```txt
runtime session is active
stage epoch is current
surface revision is current
camera revision is current
hotspot-set revision is current
context state is ready
visible frame is acknowledged
canvas rect is nonzero and finite
event coordinates are finite
modality is supported
sample has not already been consumed
```

## Rejection classes

```txt
runtime-inactive
stage-stale
surface-stale
camera-stale
hotspot-set-stale
context-unavailable
frame-unacknowledged
invalid-canvas-rect
invalid-coordinates
unsupported-modality
duplicate-sample
miss
raycast-failed
```

## Side-panel path

The side panel should create the same `CanvasActivationCommand` semantic payload without a pick result:

```txt
SidePanelActivationObservation
  -> lifecycle and story admission
  -> canonical hotspot id resolution
  -> ActivationCommand
  -> InspectionCommand
  -> ActivationResult
```

The final accepted result must be equivalent for the same hotspot id regardless of ingress source.

## Required observation

```txt
PointerPickObservation
  activeSampleId?
  hoverHotspotId?
  lastPickResult
  lastActivationResult
  modalityCapabilities
  stageEpoch
  surfaceRevision
  cameraRevision
  hotspotSetRevision
  contextGeneration
  visibleFrameId
```

All exposed values must be detached, clone-safe, JSON-safe, and bounded.
