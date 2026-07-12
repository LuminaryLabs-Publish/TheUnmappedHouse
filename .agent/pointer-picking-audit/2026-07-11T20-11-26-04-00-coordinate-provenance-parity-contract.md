# Pointer-picking audit: Coordinate provenance and activation parity

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

Canvas picking needs a provenance contract. Coordinates must be captured from the activation event, normalized against one admitted canvas rectangle, interpreted through one committed camera and hotspot set, and correlated with one visible frame. Side-panel and canvas activation must then produce the same canonical inspection semantics.

## Plan ledger

**Goal:** define the exact data and invariants required for deterministic pointer picking and dual-ingress parity.

- [x] Define coordinate spaces and identities.
- [x] Define hover, activation and cancellation policies.
- [x] Define stale-result and parity rules.
- [x] Define pure and browser fixture rows.
- [ ] Implement and execute them.

## Coordinate spaces

```txt
client space
  browser viewport CSS pixels

canvas-local space
  CSS pixels relative to the current canvas rect

normalized device coordinates
  x and y in [-1, 1] for the current camera projection

render-buffer space
  internal drawing-buffer pixels for diagnostics only
```

Normalization must return requested and applied values plus the canvas-rect revision used. Render-buffer dimensions must not be substituted for CSS hit coordinates.

## Provenance tuple

```txt
sessionId
sessionGeneration
stageEpoch
surfaceRevision
cameraRevision
hotspotSetRevision
contextGeneration
resourceGeneration
visibleFrameId
sampleId
```

Every accepted pick result must cite this tuple. Any change before result commit makes the result stale.

## Hover policy

```txt
move or supported pointer update
  -> create sample
  -> pick current hotspot set
  -> publish hover id or null

leave, cancel, blur, hidden, suspended or disposed
  -> clear hover id
  -> hide hover label
  -> return parallax toward neutral under declared policy
```

Hover is presentation state only. It cannot authorize a later click.

## Activation policy

```txt
activation event
  -> create a new sample from that event
  -> never reuse the hover sample as activation authority
  -> pick once
  -> miss returns without story mutation
  -> hit returns one canonical hotspot id
  -> submit id-only activation and inspection commands
```

## Modality policy

```txt
mouse
  pointer move, leave and activation supported

touch
  activation uses event-local position; hover is optional and must not be required

pen
  activation uses event-local position; hover capability is declared explicitly

keyboard or assistive technology
  side-panel buttons use canonical hotspot ids and share activation semantics
```

## Parity invariant

For a canonical hotspot id, accepted canvas and side-panel activations must produce equivalent:

```txt
inspection receipt
clue receipts
notebook mutation
completion proof
persistence candidate
story revision
visible-frame projection
```

Only source, modality, sample and pick evidence may differ.

## Pure fixture rows

```txt
client-to-canvas-normalization-correct
canvas-to-ndc-normalization-correct
zero-size-canvas-rejected
nonfinite-coordinates-rejected
click-sample-independent-from-hover-sample
resize-makes-old-sample-stale
stage-change-makes-old-sample-stale
camera-change-makes-old-sample-stale
hotspot-set-change-makes-old-sample-stale
context-change-makes-old-sample-stale
miss-cannot-create-activation-command
hit-produces-one-canonical-hotspot-id
journal-bounded-and-detached
```

## Browser fixture rows

```txt
mouse-click-before-first-move-correct
touch-activation-without-mousemove-correct
pen-activation-without-mousemove-correct
pointer-leave-clears-hover
window-blur-clears-hover
resize-between-hover-and-click-uses-click-event
continue-between-hover-and-click-rejects-stale-sample
context-restore-between-hover-and-click-rejects-stale-sample
all-nine-hotspots-canvas-side-panel-parity
visible-frame-correlation-present
```

## Observation contract

```txt
getPointerPickObservation()
  -> detached immutable data
  -> no Three.js objects
  -> no DOM nodes
  -> no event objects
  -> no mutable hotspot descriptors
  -> bounded current state and recent journal only
```
