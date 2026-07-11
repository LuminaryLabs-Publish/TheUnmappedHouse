# Render audit: Stage resource retirement gap

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Prove that every rendered scene generation has explicit resource ownership, a committed successor, deterministic retirement, and an observable disposal result.

## Current render path

```txt
StageKit constructor
  -> WebGLRenderer
  -> WebGLRenderTarget
  -> stage scene/group
  -> post scene/full-screen plane
  -> camera and lights
  -> recursive RAF

loadScene(scene)
  -> stageGroup.clear()
  -> hotspots = []
  -> materials = []
  -> mutate background/fog/camera/post uniforms
  -> create layers
  -> create props
  -> create hotspot meshes

RAF
  -> update camera and material time uniforms
  -> render scene into target
  -> render post scene to canvas
```

## Concrete resource census

Long-lived resources:

```txt
WebGLRenderer
renderer canvas
WebGLRenderTarget
post Scene
post OrthographicCamera
post PlaneGeometry
post ShaderMaterial
stage Scene
stage Group
PerspectiveCamera
Raycaster
DirectionalLight
HemisphereLight
```

Per-scene resources:

```txt
one PlaneGeometry and ShaderMaterial per layer
one Box/Plane/CylinderGeometry and ShaderMaterial per prop
one BoxGeometry and MeshBasicMaterial per hotspot
one Mesh per layer, prop, and hotspot
```

## Main gap

`stageGroup.clear()` removes child references from the group but does not call `dispose()` on geometry or material resources. The next line that resets `this.materials` drops the tracked scene-shader list before retirement. Hotspot materials are never added to that list at all.

The current scene counts are bounded by three authored scenes, but repeated loads, future restart support, hot reload, recovery, or editor use can accumulate GPU allocations. The page also lacks an explicit renderer/target/post teardown path.

## Required render ownership row

Each resource must carry or be indexed by:

```txt
sessionId
sessionGeneration
stageEpoch
sceneId
resourceId
resourceKind
ownerKit
createdFrameId
retiredFrameId
disposalStatus
disposalFailure
```

## Correct scene swap

```txt
prepare successor resources in detached group
  -> validate geometry/material/hotspot counts
  -> commit successor group and stage epoch
  -> render and acknowledge first successor frame
  -> detach predecessor group
  -> traverse predecessor resource graph
  -> dispose geometry and materials exactly once
  -> publish retirement receipt
```

A preparation failure must retain the previous committed group and resources. A disposal failure must not roll back the committed successor, but it must return a failed retirement receipt with remaining resource counts.

## Required observations

```txt
preparedResourceCounts
committedResourceCounts
retiredResourceCounts
disposedGeometryCount
disposedMaterialCount
disposedTargetCount
remainingResourceCount
activeStageEpoch
lastRetiredStageEpoch
firstVisibleFrameId
failureRows
```

## Validation rows

```txt
initial-scene-resource-count-stable
scene-two-load-does-not-double-live-resource-count
scene-three-load-retires-scene-two-resources
hotspot-materials-disposed
shader-materials-disposed
all-layer-and-prop-geometries-disposed
failed-preparation-retains-current-render
successor-first-frame-precedes-predecessor-disposal
render-target-disposed-on-session-dispose
post-plane-geometry-and-material-disposed
renderer-disposed-on-session-dispose
resource-retirement-receipt-json-safe
```