# Render Audit - StageKit Projection Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-58-52-04-00`

## Render surface exists

This repo has a visual/render surface.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> set pixel ratio and size
  -> create Scene and stageGroup
  -> create PerspectiveCamera
  -> create Raycaster
  -> create directional and hemisphere lights
  -> create WebGLRenderTarget
  -> create post Scene/Camera/ShaderMaterial
  -> resize aspect frame
  -> install pointer and click handlers
  -> animate()

StageKit.loadScene(sceneData)
  -> clear stageGroup
  -> reset hotspots/materials
  -> apply background/fog
  -> consume camera descriptor
  -> create layer meshes
  -> create prop meshes
  -> create hotspot meshes
  -> apply post uniforms

animate()
  -> requestAnimationFrame
  -> apply pointer parallax to camera
  -> update material time uniforms
  -> render scene into target
  -> render post scene to screen
```

## Render domains

```txt
fixed-aspect-frame-domain
three-renderer-domain
stage-scene-domain
camera-descriptor-domain
lighting-domain
shader-material-domain
post-process-domain
render-target-domain
stage-layer-projection-domain
stage-prop-projection-domain
hotspot-volume-projection-domain
pointer-parallax-domain
raycast-picking-domain
hover-label-domain
resize-domain
animation-frame-domain
```

## Current render services

```txt
fixed 1920x1080 design frame
viewport scale application
Three.js renderer setup
shadow map setup
camera/fog/background descriptor consumption
layer/prop/hotspot mesh projection
anime shader material generation
post-process shader pass
target texture render pass
pointer parallax update
raycast hotspot hit detection
hover label placement
resize and render target resizing
```

## Render gaps

```txt
StageKit.loadScene() does not return a source-owned StageProjection summary.
There is no fixture-readable camera descriptor consumption row.
There is no hotspot volume readback table.
There is no stable post-process uniform snapshot.
There is no additive GameHost render readback.
The render path cannot currently prove that browser state, StageKit scene state, and story projection state agree.
```

## Keep stable next

Do not rewrite StageKit first.

The next useful render work is additive readback:

```txt
stage_projection.currentSceneId
stage_projection.camera
stage_projection.layerCount
stage_projection.propCount
stage_projection.hotspotIds
stage_projection.postUniforms
stage_projection.viewport
stage_projection.renderTargetSize
stage_projection.hoveredHotspotId
```

## Fixture target

A DOM-free fixture should be able to assert that the story command result for `continue_to_repeating_hallway` emits a stage projection matching the `repeating-hallway` descriptor before any browser mutation happens.
