# Render Audit: StageKit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T01:50:19-04:00`

## Current renderer facts

`src/stage-kit.js` currently owns the full visual runtime:

```txt
Three.js import
WebGLRenderer
Scene
PerspectiveCamera
Raycaster
DirectionalLight
HemisphereLight
WebGLRenderTarget
post-process scene
shader materials
stage group
resize handler
mousemove handler
click handler
requestAnimationFrame loop
```

## Render pipeline

```txt
sceneData
  -> loadScene(sceneData)
  -> set background/fog
  -> set base camera
  -> create layers from sceneData.stage.layers
  -> create props from sceneData.stage.props
  -> create invisible hotspot meshes from sceneData.hotspots
  -> apply post uniforms from sceneData.post
  -> animate loop
  -> render world scene to WebGLRenderTarget
  -> render post scene to screen
```

## Strengths

- The renderer is compact and easy to follow.
- The stage descriptor pattern already exists in `story-data.js`.
- Locked camera and mild pointer parallax fit the anime point-and-click design.
- Shader material gives the scenes a procedural anime texture base.
- Post-process memory distortion, vignette, chromatic offset, and grain support horror tone.
- Hotspot volumes are separate from visible props.

## Render risks

- Renderer setup, descriptor consumption, pointer input, hotspot picking, material creation, post-processing, and frame loop are all in one class.
- The renderer accepts scene descriptors without validation.
- Props are primitive-only and may cap visual richness.
- Hotspot volume geometry is invisible and not separately debuggable.
- Post-process settings are direct uniform values, not a typed render handoff.
- StageKit has story-adjacent behavior because clicked hotspots call `onHotspot` directly.

## Needed render kit split

```txt
stage-render-host-kit
  -> renderer, scene, camera, lights, render target

fixed-camera-parallax-kit
  -> base camera, pointer offset, lookAt projection

stage-descriptor-consumer-kit
  -> normalized layers, props, hotspots, post settings

anime-material-shader-kit
  -> STAGE_VERTEX / STAGE_FRAGMENT material factory

postprocess-memory-kit
  -> POST_VERTEX / POST_FRAGMENT pass descriptor and uniform application

hotspot-raycast-kit
  -> raycaster, pointer projection, hovered/clicked hotspot id

hover-label-adapter-kit
  -> DOM label projection only, outside pure hotspot picking
```

## Renderer handoff target

Current:

```txt
StageKit.loadScene(raw sceneData)
```

Target:

```txt
StageKit.loadStageSnapshot(validatedStageSnapshot)
```

Where `validatedStageSnapshot` contains:

```txt
camera
background
fog
layers[]
props[]
hotspotVolumes[]
postProcess
warnings[]
```

## Next render-safe work

Do not rewrite the renderer first.

Add descriptor validation first so the renderer has a stable input contract.

Then split StageKit into idempotent render kits while keeping `src/game.js` behavior stable.