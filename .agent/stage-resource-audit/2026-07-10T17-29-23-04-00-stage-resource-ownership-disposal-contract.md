# Stage resource audit: ownership and disposal contract

Timestamp: `2026-07-10T17-29-23-04-00`

## Current ownership shape

```txt
StageKit
  renderer
  target
  postScene/postCamera/postMaterial/fullscreen geometry
  stageGroup children
    layer meshes -> geometry + shader material
    prop meshes -> geometry + shader material
    hotspot meshes -> box geometry + transparent material
  materials[]
  hotspots[]
  resize/mousemove/click listeners
  recursive RAF
```

## Current retirement behavior

`loadScene()` calls `stageGroup.clear()`, replaces `hotspots`, and replaces `materials`. These operations detach or lose references but do not dispose the owned GPU resources.

## Required resource registry

Each entry should retain detached, non-Three.js metadata:

```txt
resourceId
sceneEpochId
kind
sourceDescriptorId
ownership: provisional | active | retired | disposed
createdAtCommit
retiredAtCommit | null
disposedAtCommit | null
disposeCount
```

## Disposal rules

- Provisional resources are disposed on build failure.
- Active resources are never disposed before a replacement commits.
- Retired resources are disposed exactly once after commit.
- Shared host resources are disposed only by host teardown.
- Hotspot geometry/material resources follow the same ownership rules as visible meshes.
- `dispose()` cancels RAF and removes listeners before renderer/resource teardown.
- Repeated `dispose()` returns an accepted-no-mutation result.

## Required observations

```txt
StageResourceSnapshot
StageEpochRetirementObservation
StageResourceDisposalObservation
StageHostDisposeObservation
StageLeakSummary
```

## Acceptance target

After loading all three scenes and disposing the host:

```txt
provisional resources: 0
active scene resources: 0
retired undisposed resources: 0
double-disposed resources: 0
unowned resources: 0
active RAF handles: 0
active StageKit listeners: 0
```
