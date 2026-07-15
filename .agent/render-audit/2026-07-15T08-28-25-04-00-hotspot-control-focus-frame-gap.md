# Render audit: hotspot control focus-frame gap

**Timestamp:** `2026-07-15T08-28-25-04-00`

## Summary

The visual and semantic story frame updates after inspection, but no frame acknowledgement proves that keyboard focus remains attached to the accepted hotspot control generation.

## Plan ledger

**Goal:** bind the accepted inspection revision, projected button state and active focus target to one observable UI frame.

- [x] Trace inspection mutation into `renderUi()`.
- [x] Confirm full list replacement on every inspection.
- [x] Confirm no control-list or focus revision is published.
- [x] Define first focus-stable inspection frame evidence.
- [ ] Implement and capture browser proof.

## Current frame path

```txt
inspection accepted
  -> text and log update
  -> hotspot list cleared
  -> replacement buttons appended
  -> Notebook JSON replaced
  -> state saved
  -> WebGL RAF continues independently
```

The rendered labels may correctly show the inspected checkmark, while the active element references a node that was removed during the same action. Visual correctness therefore does not prove interaction continuity.

## Required frame evidence

```txt
FirstFocusStableInspectionFrameAck
  sceneRevision
  inspectionRevision
  controlListRevision
  expectedHotspotControlId
  actualActiveElementControlId
  controlConnected
  controlLabel
  inspectedState
  frameTimestamp
```

## Failure cases

```txt
active element falls to body
focus moves to an unrelated earlier control
replacement control exists but is not focused
scene transition leaves focus on a retired node
duplicate projection restores focus to stale scene content
visual checkmark and active control revision disagree
```

No render or DOM behavior changed in this audit.