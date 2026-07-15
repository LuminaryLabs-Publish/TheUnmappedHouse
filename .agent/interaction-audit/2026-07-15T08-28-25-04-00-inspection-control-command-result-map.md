# Interaction audit: inspection control command/result map

**Timestamp:** `2026-07-15T08-28-25-04-00`

## Summary

Inspection mutation and control reprojection are currently implicit function calls. A typed command/result boundary is needed to carry activation origin, stable control identity, accepted revisions and focus settlement.

## Plan ledger

**Goal:** make every DOM or canvas inspection produce one idempotent result and one focus-continuity outcome.

- [x] Map DOM button and canvas raycast producers.
- [x] Map inspection, clue, log, UI and persistence consumers.
- [x] Define accepted, repeated, stale and projection-failure results.
- [x] Define focus-settlement outcomes.
- [ ] Implement command admission and executable fixtures.

## Producers

```txt
DOM hotspot button click
canvas hotspot raycast click
future keyboard shortcut or assistive command
```

## Command

```txt
InspectionCommand
  commandId
  documentGeneration
  sceneRevision
  hotspotId
  activationOrigin: dom | canvas | semantic
  expectedInspectionRevision
  expectedControlListRevision
  activeHotspotControlId
```

## Results

```txt
InspectionAccepted
InspectionRepeated
InspectionRejectedUnknownHotspot
InspectionRejectedWrongScene
InspectionRejectedStale
InspectionRejectedDuplicate
InspectionProjectionFailed
InspectionRolledBack
FocusRetainedOnAcceptedControl
FocusTransferredToFallback
FocusSettlementFailed
FirstFocusStableInspectionFrameAcknowledged
```

## Settlement order

```txt
admit command
  -> validate scene and hotspot
  -> prepare inspected clue text and log candidates
  -> prepare keyed control projection
  -> prepare focus target
  -> atomically commit story and control revisions
  -> persist accepted story revision
  -> publish result
  -> acknowledge matching focus-stable frame
```

The existing interlude modal focus authority remains independent and consumes scene-completion results after the inspection-control result is settled.