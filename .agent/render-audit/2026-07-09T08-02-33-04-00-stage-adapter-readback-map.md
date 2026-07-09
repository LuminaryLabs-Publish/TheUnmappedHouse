# Render Audit — Stage Adapter Readback Map

**Timestamp:** `2026-07-09T08-02-33-04-00`

## Render surface

The render surface is `StageKit`.

`StageKit` currently owns:

```txt
Three.js CDN import
WebGLRenderer creation
fixed 16:9 aspect frame integration
PerspectiveCamera setup
DirectionalLight and HemisphereLight setup
WebGLRenderTarget post path
post-process ShaderMaterial
anime ShaderMaterial
scene load
stage layer creation
stage prop creation
transparent hotspot volume creation
raycast picking
hover label projection
resize handling
animation loop
```

## Why render extraction is not next

The visual route is stable enough for the current product slice.

The missing proof is not whether `StageKit` can draw the scene. The missing proof is whether the story source can produce source-owned `StageProjection` and `StageSceneSnapshot` records before the browser host mutates StageKit.

## Required stage readback records

```txt
StageSceneSnapshot:
  sceneId
  sceneTitle
  camera.position
  camera.lookAt
  camera.fov
  backgroundColor
  fog
  layerCount
  propCount
  hotspotCount
  hotspotIds
  grantableClueIds
  requiredClueIds
  postSettings

StageProjection:
  shouldLoadScene
  targetSceneId
  reason
  previousSceneId
  nextSceneId
  routeLength
  complete

StageAdapterReadback:
  consumedSceneId
  consumedProjectionReason
  loadedStageKitScene
  hotspotVolumesProjected
  hoverLabelAvailable
  pickHandlerAvailable
```

## Browser consumer boundary

`src/game.js` should stop deciding directly when to call `stage.loadScene(currentScene)`.

The source reducer should produce `StageProjection`; the browser adapter should consume it; `BrowserAdapterReadback` should record what actually happened.

## Validation target

```txt
node scripts/validate-story-authority.mjs
```

Expected fixture rows:

```txt
stage_snapshot_created
stage_projection_created
browser_adapter_plan_created
browser_adapter_readback_created
```