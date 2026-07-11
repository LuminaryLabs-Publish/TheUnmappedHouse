# Render audit: Hotspot hit and story revision provenance

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Define the evidence required to prove that a visible hotspot hit belongs to the currently committed scene, stage epoch, story revision, and rendered frame before it can mutate story state.

## Current render interaction path

```txt
scene descriptor hotspot
  -> invisible BoxGeometry
  -> transparent MeshBasicMaterial
  -> mesh.userData.hotspot = full descriptor
  -> mesh added to stageGroup and hotspots[]
  -> pointer updates normalized coordinates
  -> Raycaster intersects current hotspots[]
  -> clickHotspot extracts full descriptor
  -> onHotspot(descriptor)
```

## Main gap

A raycast hit carries no stable render provenance. It returns a descriptor object but not:

```txt
sceneId
stageEpoch
storyRevision
frameId
hotspot mesh identity
camera revision
viewport revision
pick distance and point
manifest fingerprint
```

The mutation layer therefore cannot prove that the selected descriptor came from the currently visible committed stage. A future detached-stage swap, stale callback, delayed click, replay, editor, or automation adapter can submit an observation detached from the frame the user saw.

## Current visibility and authority mismatch

```txt
render surface proves: a mesh was intersected
story mutation assumes: descriptor is canonical and current
persistence records: aggregate mutable state
UI debug shows: current aggregate scene/clues/inspections
missing: one shared observation/command/result/frame identity
```

## Required pick observation

```txt
HotspotPickObservation {
  observationId,
  sceneId,
  hotspotId,
  stageEpoch,
  storyRevision,
  frameId,
  manifestFingerprint,
  pointerNdc,
  hitDistance,
  hitPoint?,
  meshId?
}
```

The observation must not contain clue grants, story copy, completion requirements, or mutable descriptors.

## Required render-to-story chain

```txt
committed stage epoch
  -> render frame receipt
  -> raycast against that epoch
  -> id-only pick observation
  -> inspection command using observation identity
  -> scene/story/stage admission
  -> canonical hotspot resolution
  -> typed inspection result
  -> committed story revision
  -> UI/debug frame acknowledgement
```

## Required rejection cases

```txt
hit from retired stage epoch
hit from stale frame after scene commit
hit whose scene differs from current story scene
hit whose hotspot is absent from manifest index
hit whose manifest fingerprint differs
hit submitted after session generation retirement
```

## Required proof rows

```txt
pick-observation-id-only
pick-observation-stage-epoch-current
pick-observation-frame-id-present
pick-observation-scene-matches-stage
pick-observation-hotspot-resolves-canonically
retired-stage-pick-rejected
stale-frame-pick-rejected
visible-frame-and-inspection-result-correlated
ui-debug-revision-matches-story-commit
```

## Current claim

The current Three.js surface is visually functional, but it cannot prove that the observation used for story mutation belongs to the visible committed frame. This pass changes no rendering code.
