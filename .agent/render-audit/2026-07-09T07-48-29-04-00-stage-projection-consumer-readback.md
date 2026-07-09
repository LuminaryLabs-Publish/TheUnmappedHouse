# Render Audit: Stage Projection Consumer Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

The render path is serviceable and should stay stable during the next source-authority pass.

`StageKit` already consumes scene descriptors, applies the fixed 16:9 frame, renders layers/props/hotspots, updates shader uniforms, and provides hotspot picking. The missing render proof is not a visual rewrite; it is a pure stage projection and readback contract that tells fixtures which scene should load and which descriptor facts were consumed.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> set pixel ratio and initial design size
  -> create Three scene, stage group, perspective camera, raycaster, lights
  -> create render target and post-process scene/material
  -> apply aspect frame sizing
  -> register resize/mousemove/click handlers
  -> start requestAnimationFrame loop

StageKit.loadScene(sceneData)
  -> clear stage group
  -> reset hotspots/materials
  -> apply background/fog
  -> consume camera descriptor
  -> create stage layers
  -> create props
  -> create invisible hotspot boxes
  -> consume post-process descriptor

StageKit.animate()
  -> drift camera from mouse parallax
  -> update anime material time uniforms
  -> update post-process time uniform
  -> render scene to target
  -> render post-process full-screen pass
```

## Render domains

```txt
fixed aspect frame
canvas viewport sizing
Three WebGL renderer
render target
post-process shader pass
fixed camera descriptor
camera parallax drift
scene background/fog
stage group
layer geometry descriptors
prop geometry descriptors
hotspot invisible volumes
anime shader material
post-process descriptor
hover label projection
raycast picking
```

## Render services

```txt
computeAspectFrame(width, height)
applyAspectFrame(frameElement, frame)
StageKit.loadScene(sceneData)
StageKit.createLayer(layer)
StageKit.createProp(prop)
StageKit.createHotspot(hotspot)
StageKit.handlePointer(event)
StageKit.pick()
StageKit.clickHotspot()
StageKit.resize()
StageKit.animate()
```

## Current readback gap

```txt
StageKit knows which scene descriptor was loaded, but no pure readback record exposes:
  scene id
  camera descriptor consumed
  layer count
  prop count
  hotspot count
  hotspot ids
  post-process values
  viewport facts
  current hover/hit facts
  load reason
  command result that requested the load
```

## Required next render-proof kits

```txt
stage-scene-snapshot-kit
stage-projection-kit
stage-projection-readback-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
```

## Do not do first

```txt
Do not rewrite StageKit.
Do not add new scene rooms.
Do not add new materials.
Do not replace Three.js.
Do not add browser-only visual automation before story fixtures exist.
```

## Next render acceptance

The next source pass should make the browser able to report:

```txt
window.GameHost.getState().story.stageProjection.currentSceneId
window.GameHost.getState().story.stageProjection.loadReason
window.GameHost.getState().story.stageReadback.loadedSceneId
window.GameHost.getState().story.stageReadback.cameraConsumed
window.GameHost.getState().story.stageReadback.hotspotIds
window.GameHost.getState().story.latestCommandResult.reason
```

The visible render must remain unchanged while the proof surface becomes explicit.
