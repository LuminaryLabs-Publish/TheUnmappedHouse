# Render Audit: Stage Render Readback Consumer Map

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Visual surface

The repo has a visual/render surface.

The render surface is owned by `src/stage-kit.js` and consumed by `src/game.js` through `stage.loadScene(currentScene)`.

## Current render loop

```txt
StageKit constructor
  -> creates WebGLRenderer
  -> applies fixed 16:9 aspect frame
  -> creates Scene, Group, PerspectiveCamera, Raycaster, lights
  -> creates WebGLRenderTarget
  -> creates post-process scene/material
  -> binds resize, mousemove, and click listeners
  -> starts animate()

loadScene(sceneData)
  -> clears stageGroup and hotspot list
  -> applies background/fog
  -> applies camera descriptor
  -> creates layer meshes
  -> creates prop meshes
  -> creates invisible hotspot volumes
  -> applies post-process uniforms

animate()
  -> parallax camera from pointer
  -> updates material time uniforms
  -> renders scene to target
  -> renders post scene to screen
```

## What works

```txt
fixed 16:9 stage frame
Three.js renderer host
shader material with toon/noise treatment
render-target post-process pass
scene descriptor loading
stage layers
stage props
invisible hotspot volumes
raycast picking
hover label projection
scene-specific camera descriptor
scene-specific post settings
```

## Render gaps

```txt
no pure StageSceneSnapshot
no StageProjection result consumed by stage.loadScene
no BrowserAdapterReadback proving stage projection consumption
no fixture row proving every scene has valid camera/layer/prop/hotspot/post descriptors
no GameHost state reporting current stage scene id, load reason, descriptor fingerprint, hotspot count, camera readback, post readback, or last projection source
```

## Consumer freeze

Do not extract or rewrite `StageKit` next.

The right splice is to make `src/game.js` call `stage.loadScene(...)` only from a `StageProjection` inside a `StoryBrowserAdapterPlan`, then report a `BrowserAdapterReadback` record that says which stage projection was consumed.

## Required stage readback fields

```txt
StageSceneSnapshot:
  sceneId
  title
  camera.position
  camera.lookAt
  camera.fov
  layerCount
  propCount
  hotspotCount
  hotspotIds
  grantableClueIds
  requiredClueIds
  post.grain
  post.vignette
  post.chromatic
  post.distortion
  post.memory
  sourceValid
  validationReasons

StageProjection:
  projectionId
  sceneId
  shouldLoadScene
  reason
  sourceResultId
  descriptorFingerprint

BrowserAdapterReadback.stage:
  consumed
  sceneId
  descriptorFingerprint
  loadSceneCalled
  unchangedReason
  latestStageProjectionId
```

## Render validation next

```txt
npm run check
node scripts/validate-story-authority.mjs
browser smoke: first scene loads
browser smoke: hotspot hover works
browser smoke: hotspot click still routes through StageKit onHotspot
browser smoke: continue still loads next scene
GameHost readback includes stage projection and latest stage readback
```

## Decision

Keep visuals stable.

Add readback around the render consumer boundary first.
