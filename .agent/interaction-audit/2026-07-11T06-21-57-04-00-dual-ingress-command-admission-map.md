# Interaction audit: dual-ingress command admission map

Timestamp: `2026-07-11T06-21-57-04-00`

## Current input surfaces

### Side panel

```txt
renderUi()
  -> create button
  -> closure captures hotspot descriptor
  -> click
  -> inspectHotspot(descriptor)
```

### Rendered stage

```txt
pointer move
  -> update normalized pointer
  -> raycast invisible hotspot meshes
  -> retain hovered descriptor

canvas click
  -> raycast again
  -> read mesh.userData.hotspot
  -> inspectHotspot(descriptor)
```

## Missing normalization

The two paths do not produce a shared input intent. They bypass command sequencing and directly carry authority-bearing descriptor objects.

Required canonical input:

```txt
InspectHotspotCommand {
  commandId
  source: side_panel | stage_raycast
  inputSequence
  sceneId
  hotspotId
  expectedStoryRevision
  expectedStageEpoch
  observedFrameId?
}
```

## Admission checks

```txt
command id is new
source is supported
story phase allows inspection
scene id equals committed active scene
story revision matches
stage epoch matches for raycast input
hotspot exists in canonical scene index
hotspot is inspectable
no transition is pending
```

## Result policy

```txt
accepted
  first canonical inspection committed

duplicate
  same command or already committed first inspection

no_op
  supported re-read request with no story mutation

rejected
  stale scene, stale stage, invalid phase, unknown hotspot or revision mismatch

failed
  persistence or projection transaction failed
```

## Input race cases to prove

```txt
side-panel and canvas click in same task window
queued old-scene button click after Continue
old-stage canvas click after stage commit
rapid double-click on final hotspot
click while interlude opens
click during transition preparation
replayed command after reload
```

## Feedback rule

Every input path must receive the same typed result and project feedback from the committed result. Re-read text and notebook behavior should be an explicit no-op/read result, not an accidental second mutation transaction.
