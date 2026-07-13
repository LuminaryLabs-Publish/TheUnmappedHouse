# Hotspot picking audit: event coordinate, camera and hit contract

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

Hotspot activation must be derived from the coordinates and input source that submitted the activation, then evaluated against an explicit camera and hotspot-set revision. The current implementation instead borrows a mutable hover sample and current camera object.

## Plan ledger

**Goal:** specify the smallest complete contract that makes hotspot picking deterministic across mouse, touch, stylus and exact controls.

- [x] Identify source fields required from browser events.
- [x] Identify stage revisions required by raycast.
- [x] Define candidate, selection and terminal results.
- [x] Define hover retirement separately.
- [ ] Implement and execute the contract.

## Contract inputs

```txt
commandId
inputSessionId
sourceType
pointerId or exact-control identity
client coordinates when spatial
sceneRevision
hotspotSetRevision
viewportRevision
canvasRectRevision
cameraPoseRevision
renderFrameSequence
```

## Normalization contract

```txt
x = ((clientX - rect.left) / rect.width) * 2 - 1
y = -((clientY - rect.top) / rect.height) * 2 + 1
```

Admission requires:

```txt
finite client and rect values
positive rect width and height
coordinates inside the admitted rect
matching viewport and rect revisions
matching active scene and hotspot set
supported pointer source
```

## Raycast contract

```txt
camera pose is immutable for the command
projection and world transforms are current for that pose
active hotspot volumes are identified by stable hotspot IDs
all intersections are captured before selection
selection sorts by distance, then an explicit stable tie key
miss is a terminal accepted result, not an exception
```

## Result schema

```txt
HotspotPickResult
  commandId
  status
  sourceType
  pointerSampleId
  sceneRevision
  hotspotSetRevision
  viewportRevision
  cameraPoseRevision
  renderFrameSequence
  normalizedCoordinates
  candidateCount
  candidates[]
  selectedHotspotId
  selectedDistance
  tiePolicy
  fingerprint
```

## Current violations

```txt
click coordinates are not read
pointer source is not recorded
mousemove is the only spatial sample updater
default pointer 0,0 can be used for first activation
cached pointer can be used for touch/stylus click
camera pose is mutable and unversioned
hover and activation share mutable pointer state
pointer leave does not retire hover
no candidate or selection result is published
```

## Fixture matrix

```txt
first mouse click without prior movement
mousemove then click at a different location
click before next parallax RAF
touch tap with no compatibility mousemove
stylus tap
outside-canvas activation
resize between sample and activation
scene change between sample and activation
overlapping hotspot candidates
pointer leave after hover
canvas and exact-button selection of the same hotspot
duplicate activation delivery
```

## Completion criteria

The authority is complete only when every fixture produces a typed terminal result, exact source evidence and a visible inspection-frame acknowledgement, with no target inferred from unrelated cached hover state.