# Interaction audit: pointer sample to raycast command map

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The browser adapter currently stores pointer state globally inside `StageKit` and later reuses it when a click occurs. This is stateful sampling, not event-bound command admission. The map below defines the missing identities and rejection points required to turn browser events into deterministic hotspot commands.

## Plan ledger

**Goal:** replace cached mutable pointer dispatch with explicit event-bound inspection commands.

- [x] Map current callback boundaries.
- [x] Identify all missing identities and revisions.
- [x] Define fail-closed admission outcomes.
- [x] Separate hover from activation.
- [ ] Implement the interaction reducer and fixtures.

## Current callback map

```txt
mousemove(event)
  -> canvas rect
  -> cached pointer clip coordinates
  -> cached parallax coordinates
  -> hover raycast
  -> hover label

click(event)
  -> event ignored
  -> cached pointer clip coordinates
  -> current camera
  -> activation raycast
  -> direct story callback

button click(event)
  -> exact descriptor closure
  -> direct story callback
```

## Required input envelope

```txt
PointerInputEnvelope
  inputSessionId
  eventSequence
  sourceType
  pointerId
  pointerType
  buttons
  clientX
  clientY
  eventTimestamp
  sceneRevision
  viewportRevision
  canvasRectRevision
```

## Required activation admission

```txt
HotspotPickCommand
  -> reject unsupported or cancelled sources
  -> reject outside-canvas coordinates
  -> reject stale scene, viewport or canvas rect
  -> select explicit camera-frame policy
  -> normalize coordinates once
  -> raycast active hotspot set
  -> apply deterministic candidate ordering
  -> produce accepted hit, accepted miss or typed rejection
```

## Required statuses

```txt
ACCEPTED_HIT
ACCEPTED_MISS
REJECTED_OUTSIDE_CANVAS
REJECTED_STALE_SCENE
REJECTED_STALE_VIEWPORT
REJECTED_STALE_CAMERA
REJECTED_DUPLICATE
REJECTED_UNSUPPORTED_SOURCE
REJECTED_NO_ACTIVE_HOTSPOT_SET
```

## Hover lifecycle

Hover is observational and must not reuse activation commands.

```txt
pointerenter or pointermove
  -> HoverStateCommand
  -> current hit or null
  -> hover label projection

pointerleave, pointercancel, scene change or runtime retirement
  -> clear hover state
  -> hide hover label
  -> retire pointer sample
```

## Source equivalence

Canvas, side-panel and accessibility activation should differ only in target-evidence production:

```txt
canvas
  -> accepted pick result proves target

side-panel
  -> exact active control proves target

accessibility command
  -> exact active hotspot identity proves target

all
  -> one HotspotInspectionCommand
  -> one HotspotInspectionResult
```

## Ordering constraints

```txt
scene load commits before new hotspot commands admit
resize commits before commands using the new rect
camera frame policy is explicit
activation event coordinates are never borrowed from hover state
pointer leave cannot preserve an active hover label
story mutation begins only after target admission
```

## Proof boundary

No browser event adapter, pointer API, focus path, raycast implementation or story reducer changed.