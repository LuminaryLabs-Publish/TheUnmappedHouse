# Render audit: Live-stage swap and resource-retirement gap

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Prove why the current StageKit replacement cannot support atomic Continue or bounded GPU resource ownership.

## Current replacement path

```txt
loadScene(sceneData)
  -> sceneData = descriptor
  -> stageGroup.clear()
  -> hotspots = []
  -> materials = []
  -> mutate background and fog
  -> mutate camera and projection
  -> create live layers
  -> create live props
  -> create live hotspot meshes
  -> mutate post uniforms
```

## Destructive-before-proof problem

The previous scene is detached before any candidate resource is built or validated. If any geometry, material, hotspot or descriptor operation fails, the live group contains only the successfully created prefix of the next scene.

There is no:

```txt
detached candidate group
prepared scene bundle
resource manifest
validation result
atomic group swap
previous bundle retention
rollback
```

## Resource leakage

The current scene allocates:

```txt
layer PlaneGeometry objects
prop PlaneGeometry, BoxGeometry and CylinderGeometry objects
hotspot BoxGeometry objects
scene ShaderMaterial objects
hotspot MeshBasicMaterial objects
meshes and groups
```

`stageGroup.clear()` only removes child references from the group. It does not call `dispose()` on geometry or materials.

`this.materials = []` discards references to the prior scene shader materials before retirement. Hotspot materials are never included in that array.

## Shared-resource gap

Persistent route resources also lack an owner contract:

```txt
WebGLRenderer
WebGLRenderTarget and texture
post ShaderMaterial
post PlaneGeometry
resize listener
mousemove listener
click listener
recursive RAF
```

A scene-level transition should not dispose persistent route resources, but the current code has no distinction between:

```txt
route resources
stage-epoch resources
candidate resources
retired resources
```

## Required prepared bundle

```txt
PreparedStageBundle
  transitionId
  sceneId
  sceneDefinitionFingerprint
  targetStageEpoch
  group
  cameraDescriptor
  fogDescriptor
  postDescriptor
  hotspotBindings
  geometries[]
  materials[]
  meshes[]
  resourceCounts
  disposed
```

## Required swap order

```txt
prepare detached bundle
  -> validate bundle
  -> persist candidate StorySnapshot
  -> attach new group and apply camera/fog/post policy
  -> advance stage epoch
  -> acknowledge first frame
  -> detach previous group
  -> dispose previous stage resources exactly once
```

The previous bundle may be detached at commit, but it must remain available for rollback until the commit policy declares the swap irreversible.

## Required render fixture rows

```txt
old-group-remains-live-during-preparation
candidate-group-detached-during-preparation
candidate-resource-counts-match-descriptor
injected-construction-failure-disposes-candidate
successful-swap-advances-stage-epoch-once
first-frame-uses-target-camera
first-frame-uses-target-post-policy
first-frame-hotspot-count-matches-target
previous-geometries-disposed-once
previous-materials-disposed-once
persistent-route-resources-retained
full-StageKit-dispose-retires-persistent-resources
```
