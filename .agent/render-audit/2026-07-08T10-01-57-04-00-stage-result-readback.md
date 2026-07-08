# Stage Result Readback Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T10-01-57-04-00`

## Render surface summary

The repo has a visual/render surface.

`src/stage-kit.js` owns the live Three.js renderer, scene, camera, raycaster, lights, render target, post-process pass, shader materials, scene loading, pointer picking, hover labels, resize behavior, and animation loop.

The current render path is stable enough to preserve during the next source-authority pass.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> create Scene and stageGroup
  -> create PerspectiveCamera
  -> create Raycaster
  -> create DirectionalLight and HemisphereLight
  -> create WebGLRenderTarget
  -> create post Scene, Camera, ShaderMaterial, and fullscreen quad
  -> resize to fixed aspect frame
  -> bind mousemove and click
  -> animate()
```

Scene load path:

```txt
StageKit.loadScene(sceneData)
  -> clear stage group
  -> reset hotspots/materials
  -> apply background/fog
  -> apply base camera
  -> create layers
  -> create props
  -> create hotspot volumes
  -> apply post uniforms
```

Frame path:

```txt
requestAnimationFrame
  -> update parallax camera from pointer mouse
  -> update material time uniforms
  -> update postprocess time uniform
  -> render scene to target
  -> render post scene to screen
```

## Render domains

```txt
fixed-aspect-frame
threejs-render-host
scene-group-lifecycle
fixed-camera-composition
camera-parallax
stage-layer-rendering
stage-prop-rendering
hotspot-volume-rendering
hotspot-raycast-picking
hover-label-projection
anime-material-shader
postprocess-render-pass
scene-fog-lighting
renderer-resize
```

## Render services

```txt
computeAspectFrame
applyAspectFrame
StageKit.constructor
StageKit.animeMaterial
StageKit.loadScene
StageKit.createLayer
StageKit.createProp
StageKit.createHotspot
StageKit.handlePointer
StageKit.pick
StageKit.clickHotspot
StageKit.resize
StageKit.animate
```

## Result-readback gap

The next implementation should not move story authority into StageKit.

Instead, StageKit should remain a consumer of scene descriptors and hotspot dispatch while the new story-authority layer produces result records.

Renderer readback should become additive:

```txt
StoryCommandResult
  -> UI projection
  -> interlude projection
  -> notebook/debug projection
  -> window.GameHost.getState().story.latestResult
  -> window.GameHost.getState().stage.currentSceneSnapshot
```

## Stage snapshot target

Add a pure snapshot helper before changing StageKit internals:

```txt
createStageSceneSnapshot(scene)
  -> sceneId
  -> title
  -> camera
  -> backgroundColor
  -> fog
  -> layerCount
  -> propCount
  -> hotspotCount
  -> hotspotIds
  -> requiredClues
  -> grantableClues
  -> postSettings
```

This gives tests and diagnostics stable render-facing facts without starting WebGL.

## What to avoid

```txt
Do not rewrite StageKit first.
Do not bind StoryCommandResult into mesh userData.
Do not make raycast picking decide command acceptance.
Do not make localStorage or DOM text the render source of truth.
Do not change the 1920 x 1080 design frame in the story-authority pass.
```

## Next render validation target

After source wire implementation, `window.GameHost.getState()` should expose:

```txt
stage: {
  designFrame: { width: 1920, height: 1080, aspect: 16 / 9 },
  sceneId,
  layerCount,
  propCount,
  hotspotCount,
  postSettings
},
story: {
  sceneId,
  complete,
  latestResult,
  commandJournalLength,
  route
}
```

This proves the renderer can remain stable while story authority becomes fixture-readable.
