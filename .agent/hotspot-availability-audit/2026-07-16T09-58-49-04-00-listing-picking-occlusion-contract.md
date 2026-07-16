# Hotspot availability audit: listing, picking and occlusion contract

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

A hotspot needs one identity and one availability entry that all interaction surfaces consume. Authored membership alone is insufficient once the game introduces hidden clues, occlusion, conditional discovery, disabled states or modal overlays.

## Plan ledger

**Goal:** define the semantic contract for available interactions without prescribing a specific rendering or accessibility implementation.

- [x] Define required identities and revisions.
- [x] Define availability inputs and terminal results.
- [x] Define DOM/canvas parity and retirement rules.
- [ ] Implement and validate with future conditional content.

## Availability entry

```txt
HotspotAvailabilityEntry
  hotspotId
  sceneId
  sceneRevision
  availabilityRevision
  discovered
  visible
  occluded
  enabled
  inspected
  modalSuspended
  interactionMode
  listLabel
  rejectionReason?
```

## Required invariants

1. Every projected hotspot identity exists in the accepted scene index.
2. An unavailable hotspot is neither enabled in the DOM list nor admitted by canvas picking.
3. A list-only hotspot is never canvas-pickable; a canvas-only hotspot is never disclosed in the list.
4. Occlusion policy is explicit. It is never inferred accidentally from raycasting only hotspot volumes.
5. Opening an interlude or terminal state settles a modal-suspension revision.
6. Loading a new scene retires hover identity, hover label and stale candidate sets before the next visible frame.
7. DOM and canvas projections publish one parity result for the same availability revision.
8. Inspection accepts only the current scene and availability revisions.

## Evidence rows

```txt
all-current-hotspots fixture
hidden-hotspot fixture
clue-gated-hotspot fixture
occluded-hotspot fixture
list-only fixture
canvas-only fixture
interlude-suspension fixture
scene-transition stale-hover fixture
stale-availability interaction fixture
source/build/Pages parity fixture
```

No runtime contract is implemented by this documentation.