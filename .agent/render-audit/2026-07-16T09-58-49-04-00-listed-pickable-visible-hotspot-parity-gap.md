# Render audit: listed, pickable and visible hotspot parity gap

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

The visible stage and interactive hotspot surface do not publish a shared frame result. Invisible hotspot boxes are raycast independently of scene geometry, while the story panel lists all authored hotspots regardless of visibility, discovery or occlusion.

## Plan ledger

**Goal:** require one accepted hotspot set to match the DOM list, hover label, canvas pick surface and presented frame.

- [x] Trace stage geometry, hotspot-volume creation, pointer normalization, raycast and DOM listing.
- [x] Confirm scene meshes do not participate in the hotspot raycast.
- [x] Confirm no parity result or frame acknowledgement exists.
- [ ] Add deterministic rendered/pickable/listed parity fixtures.

## Current render path

```txt
scene descriptor
  -> visible layers and props added to stageGroup
  -> invisible hotspot boxes added to stageGroup and hotspots[]

frame
  -> stageGroup rendered to offscreen target
  -> post pass presented

pointer
  -> raycaster.intersectObjects(hotspots, false)
  -> visible geometry is not an occluder

DOM
  -> every authored hotspot gets an enabled button
```

## Gap

The product cannot currently prove that a hotspot shown in the list is visually discoverable, that a hotspot hit by the canvas is the nearest visible intended target, or that a stale hover label belongs to the current scene generation.

## Required proof

```txt
HotspotAvailabilityResult
HotspotListProjectionResult
HotspotCanvasPickProjectionResult
HotspotParityResult
FirstAvailableHotspotFrameAck
```

The proof should bind scene, camera, viewport, policy, modal and frame revisions. No render behavior was changed in this audit.