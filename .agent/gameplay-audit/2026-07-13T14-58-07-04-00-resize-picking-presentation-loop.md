# Gameplay audit: resize, picking and presentation loop

**Timestamp:** `2026-07-13T14-58-07-04-00`

## Summary

Gameplay is text-first and scene-locked, but canvas hotspot picking depends on the current canvas rectangle and camera. A resize can change layout, renderer, target and camera state without a shared revision, so a pick has no evidence that its pointer transform and rendered hotspot volumes came from the same viewport generation.

## Plan ledger

**Goal:** preserve inspection semantics while making resize-sensitive input and presentation correlate to one viewport revision.

- [x] Trace pointer normalization and raycast dispatch.
- [x] Trace resize-sensitive render participants.
- [x] Identify gameplay-visible failure modes.
- [x] Define the required pick and frame provenance.
- [ ] Implement fixtures.

## Interaction-sensitive loop

```txt
mousemove
  -> read current canvas DOMRect
  -> normalize client coordinates
  -> update parallax input
  -> raycast current camera and hotspot volumes
  -> update hover label

click
  -> reuse current normalized pointer
  -> raycast current camera
  -> inspect hotspot
  -> mutate story state and UI
```

## Risks

```txt
a resize can occur between DOMRect sampling and frame presentation
camera projection can update without a matching visible frame
offscreen target can use a different allocation generation
hover-label placement uses #aspect-frame while picking uses canvas rect
no pick receipt carries viewport revision
```

## Required evidence

```txt
HotspotPickReceipt {
  surfaceId
  viewportRevision
  frameSequence
  pointerCss
  pointerNdc
  cameraRevision
  hotspotId?
  result
}
```

## Completion boundary

Do not change hotspot rules. Require each pick to cite the committed viewport and most recent eligible visible frame, and reject or defer picks against a stale or unpresented viewport revision.
