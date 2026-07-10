# Interaction audit: hotspot and scene-epoch correlation

Timestamp: `2026-07-10T17-29-23-04-00`

## Current input paths

```txt
side-panel button
  -> closes over live hotspot descriptor
  -> inspectHotspot(hotspot)

StageKit click
  -> raycast active hotspot meshes
  -> read mesh.userData.hotspot
  -> onHotspot(live descriptor)
  -> inspectHotspot(hotspot)
```

## Missing evidence

Neither path preserves:

```txt
input id
input origin
scene id at capture
scene epoch id
hotspot id normalization
raycast hit/miss row
active/retired epoch status
command/result correlation
```

A scene replacement clears `this.hotspots`, but no contract proves a late input or retained descriptor belongs to the active scene epoch.

## Required interaction record

```txt
HotspotInput
  inputId
  origin: side_panel | raycast
  sceneId
  sceneEpochId
  hotspotId
  pointer coordinates when applicable

StagePickObservation
  inputId
  hit: true | false
  sceneId
  sceneEpochId
  hotspotId | null
  activeEpoch: true | false

InspectCommandResult
  inputId
  commandId
  status
  reason
  transitionIds
```

## Required policies

- Convert live descriptors to stable ids at the adapter boundary.
- Reject picks from retired or unknown epochs.
- Preserve hit and miss observations.
- Prove side-panel and raycast parity for the same scene/hotspot.
- Do not expose live Three.js meshes or descriptor objects in diagnostics.
- Keep current hover labels and click behavior unchanged.
