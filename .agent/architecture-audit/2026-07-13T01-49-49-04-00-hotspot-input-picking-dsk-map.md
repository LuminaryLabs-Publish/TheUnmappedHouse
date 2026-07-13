# Architecture audit: hotspot input and picking DSK map

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The current implementation splits browser input, camera motion, raycast selection and story mutation across callback-local code without one domain owning their shared identity or ordering. The proposed parent domain keeps renderer math in the stage provider and story mutation in the story runtime, while owning the admission contract that binds a user event to one exact hotspot and visible frame.

## Plan ledger

**Goal:** define a composable parent domain and kit boundaries for deterministic, source-equivalent hotspot inspection.

- [x] Map current ownership.
- [x] Separate input sampling, viewport normalization, camera-frame correlation, hit selection and story execution.
- [x] Preserve existing stage and story responsibilities.
- [x] Define candidate kits and transaction order.
- [ ] Implement the authority.

## Current ownership

```txt
browser-story-runtime-kit
  owns story mutation and UI projection

stage-render-kit
  owns canvas, camera, raycaster, listeners and RAF

hotspot-picking-kit
  currently combines cached pointer state, raycast and direct callback dispatch

camera-parallax-kit
  consumes mouse state on RAF and mutates the camera

hotspot-volume-kit
  creates invisible scene-bound hit volumes

side-panel controls
  bypass picking and invoke the same mutation callback directly
```

## Required parent domain

```txt
the-unmapped-house-hotspot-input-picking-authority-domain
```

The parent domain owns:

```txt
input source identity
pointer sample identity
scene and hotspot-set revision
viewport and canvas-rect revision
camera and rendered-frame revision
pick command identity
normalized coordinates
candidate hit evidence
deterministic target selection
stale and duplicate rejection
shared inspection-command admission
hover lifecycle result
first visible inspection-result acknowledgement
```

It does not own:

```txt
Three.js implementation details
story clue semantics
scene descriptor authorship
save durability
interlude progression
```

## Candidate kit map

```txt
hotspot-input-session-id-kit
pointer-source-id-kit
pointer-sample-id-kit
pointer-event-normalization-kit
canvas-rect-revision-kit
viewport-revision-kit
camera-pose-revision-kit
rendered-frame-revision-kit
hotspot-set-revision-kit
hotspot-pick-command-kit
hotspot-pick-admission-kit
raycast-candidate-result-kit
hotspot-hit-selection-kit
hotspot-hit-tie-policy-kit
stale-pointer-sample-rejection-kit
stale-camera-frame-rejection-kit
outside-canvas-rejection-kit
hotspot-inspection-command-kit
hotspot-inspection-result-kit
inspection-source-equivalence-kit
duplicate-inspection-rejection-kit
hover-state-command-kit
hover-state-result-kit
pointer-leave-retirement-kit
first-visible-inspection-frame-ack-kit
pointer-observation-kit
pointer-journal-kit
mouse-first-click-fixture-kit
touch-tap-fixture-kit
stylus-tap-fixture-kit
parallax-click-correlation-fixture-kit
pointer-leave-fixture-kit
canvas-button-equivalence-fixture-kit
browser-hotspot-input-smoke-kit
pages-hotspot-input-smoke-kit
```

## Required command flow

```txt
RawPointerEvent or ExactHotspotButtonEvent
  -> allocate command and source identity
  -> bind runtime, scene, hotspot-set and viewport revisions
  -> capture coordinates from the event that submitted the command
  -> bind the camera pose and rendered frame used for selection
  -> normalize once against the admitted canvas rect
  -> derive immutable raycast candidates
  -> apply deterministic target selection
  -> reject outside, stale, duplicate or unavailable commands
  -> produce HotspotPickResult
  -> execute one shared HotspotInspectionCommand
  -> produce HotspotInspectionResult
  -> project hover/story/Notebook feedback
  -> publish FirstVisibleInspectionFrameAck
```

## Composition boundary

```txt
Input provider
  emits raw mouse, touch, stylus or exact-button intent

Hotspot input/picking authority
  decides which exact hotspot command is admitted

Stage provider
  supplies viewport, camera, raycast candidates and visible-frame receipts

Story authority
  applies inspection semantics exactly once

Persistence authority
  durably commits accepted story successors
```

## Invariants

```txt
one accepted command has one source and one command ID
canvas coordinates come from the submitting event
pick and camera pose cite the same admitted frame or explicit interpolation policy
side-panel and canvas commands resolve through one inspection-result contract
stale pointer, scene, viewport and camera revisions reject
pointer leave clears hover state
one command cannot inspect two hotspots
one hotspot result is projected at most once
visible feedback cites the accepted inspection result
```

## Proof boundary

This file defines the architecture only. No DSK, event adapter, raycast policy, reducer, result surface or fixture is implemented.