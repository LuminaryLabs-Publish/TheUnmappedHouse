# Render Audit: StageKit Consumption Readback Gap

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Render surface

```txt
src/stage-kit.js
  -> imports Three.js 0.160.0 from CDN
  -> creates WebGLRenderer
  -> applies canonical aspect frame
  -> consumes sceneData.camera
  -> consumes sceneData.stage.layers
  -> consumes sceneData.stage.props
  -> consumes sceneData.hotspots
  -> consumes sceneData.post
  -> renders scene into WebGLRenderTarget
  -> renders post-process quad to screen
```

## What StageKit currently consumes

```txt
camera position/lookAt/fov
backgroundColor
fog density
layer sizes/positions/rotations/materials
prop kind/size/position/rotation/materials
hotspot position/size/rotation/source payload
post grain/vignette/chromatic/distortion/memory
```

## Readback gap

`StageKit.loadScene(sceneData)` consumes descriptors but does not expose serializable rows for:

```txt
scene id loaded
camera descriptor consumed
layer count consumed
prop count consumed
hotspot count consumed
post descriptor consumed
hotspot ids mounted
hovered hotspot id
clicked hotspot id
stage-load intent id
render target dimensions
viewport dimensions
```

## Why not rewrite StageKit yet

StageKit is doing its visual job. The problem is proof, not rendering.

The next layer should add stage-load intent and readback records so a DOM-free story fixture and browser adapter can prove the stage is consuming the same scene rows the story authority selected.

## Required next render/readback record

```txt
StageLoadIntentRecord:
  id
  sceneId
  cameraFingerprint
  stageLayerCount
  stagePropCount
  hotspotIds
  postFingerprint

StageLoadReadback:
  id
  sceneId
  loaded
  layerCount
  propCount
  hotspotCount
  viewport
  renderTarget
```

## Main finding

Do not start with a renderer extraction.

Add readback around StageKit consumption after story command results exist.
