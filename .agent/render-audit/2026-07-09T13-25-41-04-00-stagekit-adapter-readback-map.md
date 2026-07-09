# Render Audit: StageKit Adapter Readback Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Visual surface

The repo has a visual/render surface.

`src/stage-kit.js` owns:

```txt
Three.js CDN import
WebGLRenderer
fixed 16:9 aspect frame integration
PerspectiveCamera
DirectionalLight + HemisphereLight
WebGLRenderTarget
post-process ShaderMaterial
anime ShaderMaterial
scene background/fog
layer descriptor to PlaneGeometry
prop descriptor to Box/Cylinder/Plane geometry
transparent hotspot volumes
Raycaster picking
hover label projection
resize
requestAnimationFrame animation
render target pass + post pass
```

## Render status

The render path is stable enough for the next source-authority pass.

The next problem is not visual detail.

The next problem is that browser story decisions call `stage.loadScene(currentScene)` directly without a source-owned `StageProjection` and without `BrowserAdapterReadback` proving the scene load intent was consumed.

## Current render flow

```txt
src/game.js nextScene()
  -> currentScene = next
  -> state.sceneId = currentScene.id
  -> interlude DOM closed
  -> stage.loadScene(currentScene)
  -> renderUi()
  -> saveState()

src/stage-kit.js loadScene(sceneData)
  -> clear stage group
  -> clear hotspot/material lists
  -> set scene background and fog
  -> copy camera descriptor
  -> create layers
  -> create props
  -> create hotspots
  -> copy post-process settings
```

## Missing readback

```txt
StageProjection missing:
  requestedSceneId
  routeBefore
  routeAfter
  stageDescriptorHash
  cameraDescriptor
  layerCount
  propCount
  hotspotCount
  postProcessSettings
  shouldLoadScene
  reason

BrowserAdapterReadback missing:
  loadedSceneId
  consumedStageDescriptorHash
  createdLayerCount
  createdPropCount
  createdHotspotCount
  activeCameraFov
  activePostSettings
  renderFrameReady
  hoverLabelReady
  pickerReady
```

## Next render-safe change

Add source-owned projection/readback fields only.

Do not change material colors, geometry, shaders, camera framing, post-process settings, hotspot boxes, resize logic, or animation until story fixture parity passes.
