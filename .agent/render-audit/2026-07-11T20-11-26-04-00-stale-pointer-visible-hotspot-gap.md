# Render audit: Stale pointer and visible hotspot gap

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

The canvas can display one stage, camera, surface, and hotspot set while click picking uses a pointer sample captured under different conditions. No visible-frame receipt binds the activation coordinates to what the player saw.

## Plan ledger

**Goal:** require every canvas pick to cite the same committed stage, surface, camera, hotspot-set, context, and frame revisions used by the displayed image.

- [x] Trace pointer normalization, camera parallax, resize, scene loading, raycasting, target rendering, and final presentation.
- [x] Identify missing render and input revision identities.
- [x] Define visible-frame and stale-result requirements.
- [ ] Implement and validate them.

## Current render/pick path

```txt
mousemove
  -> normalize against canvas rect at time A
  -> store pointer

resize or scene replacement may occur
  -> canvas rect, camera or hotspot set changes

click at time B
  -> ignore click coordinates
  -> raycast stored pointer through current camera and current hotspots
  -> mutate story state
```

## Missing render proof

```txt
pointer sample id: absent
stage epoch: absent
surface revision: absent
camera revision: absent
hotspot-set revision: absent
context generation: absent
visible frame id: absent
pick result id: absent
stale-result rejection: absent
```

## Required committed-frame record

```txt
VisibleFrameReceipt
  frameId
  sessionId
  sessionGeneration
  storyRevision
  stageEpoch
  surfaceRevision
  cameraRevision
  hotspotSetRevision
  contextGeneration
  resourceGeneration
  canvasRect
  presentedAt
```

A canvas activation must either cite the current receipt or be rejected as stale. A resize, scene transition, context recovery, camera projection change, or hotspot-set replacement invalidates predecessor samples.

## Required render fixtures

```txt
click-before-first-move-uses-click-coordinates
resize-invalidates-predecessor-sample
scene-change-invalidates-predecessor-sample
camera-revision-invalidates-predecessor-sample
hotspot-set-change-invalidates-predecessor-sample
context-recovery-invalidates-predecessor-sample
pick-cites-last-visible-frame
miss-does-not-mutate-story
```

No visible-hotspot parity claim is valid until these rows pass in a browser.
