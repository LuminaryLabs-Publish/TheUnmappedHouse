# Interaction audit: hotspot availability command/result map

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

DOM buttons and canvas picking call the same inspection function, but they do not enter through one availability admission result. Input-surface convergence therefore begins after selection rather than before it.

## Plan ledger

**Goal:** make every hotspot interaction prove current availability before story mutation.

- [x] Identify DOM-button, mousemove, canvas-click, hover and scene-transition evidence.
- [x] Define normalized commands, rejection states and acknowledgements.
- [ ] Implement without changing inspection semantics.

## Command map

```txt
SceneHotspotIndexCommand
  -> SceneHotspotIndexResult

HotspotAvailabilityCommand
  -> HotspotAvailable
  -> HotspotUnavailableUndiscovered
  -> HotspotUnavailableClueGate
  -> HotspotUnavailableOccluded
  -> HotspotUnavailableModal
  -> HotspotUnavailableDisabled
  -> HotspotAvailabilityRejectedStale

HotspotProjectionCommand
  -> HotspotListProjected
  -> HotspotCanvasPickSetProjected
  -> HotspotHoverRetired
  -> HotspotProjectionRejectedStale

HotspotInteractionCommand
  inputSurface: dom-list | canvas-pick
  hotspotId
  expectedSceneRevision
  expectedAvailabilityRevision
  -> HotspotInteractionAccepted
  -> HotspotInteractionRejectedUnknown
  -> HotspotInteractionRejectedUnavailable
  -> HotspotInteractionRejectedOccluded
  -> HotspotInteractionRejectedModal
  -> HotspotInteractionRejectedStale

HotspotParityCommand
  -> HotspotParityConfirmed
  -> HotspotParityRejectedMismatch
  -> FirstAvailableHotspotFrameAck
```

## Consumer rules

- DOM buttons are derived from accepted availability entries, not directly from `scene.hotspots`.
- Canvas raycast candidates are derived from the same entries.
- Hover labels require the current scene and availability generation.
- Scene and modal transitions retire prior hover evidence before the next frame.
- Only an accepted `HotspotInteractionResult` may call the existing inspection mutation.