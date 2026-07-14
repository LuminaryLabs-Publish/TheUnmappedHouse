# Interaction audit: interlude focus command/result map

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

The current interaction API is implicit DOM state plus untyped click callbacks. It has no command identity, expected revision, modal owner or rejection result.

## Plan ledger

**Goal:** make every interlude and background interaction produce one explicit admission result.

- [x] Trace DOM button, canvas and global keyboard paths.
- [x] Identify missing modal, focus and route revisions.
- [x] Define accepted and rejected result classes.
- [ ] Implement result publication and diagnostics.

## Current inputs

```txt
canvas click -> StageKit.onHotspot -> inspectHotspot
hotspot button click -> inspectHotspot
hidden or visible Continue click -> nextScene
global KeyR -> delete save and reload
```

## Required command envelope

```txt
commandId
commandType
source: canvas | hotspot-list | continue | reset
storyRevision
sceneRevision
routeRevision
interludeGeneration
expectedFocusOwner
```

## Required results

```txt
InspectionAccepted
InspectionRejectedModalActive
InterludeOpenAccepted
InterludeOpenRejectedIncomplete
InterludeOpenDuplicate
ContinueAccepted
ContinueRejectedHidden
ContinueRejectedIncomplete
ContinueRejectedStaleScene
ContinueRejectedDuplicate
BackgroundCommandRejected
ResetAccepted
ResetRejectedModalPolicy
FocusTransferred
FocusRestored
FirstFocusStableFrameAcknowledged
```

## Required public readback

One diagnostics snapshot should expose the accepted scene, route, interlude generation, modal state, background inert state, active focus owner, last command result and last acknowledged frame.

No interaction runtime changed.