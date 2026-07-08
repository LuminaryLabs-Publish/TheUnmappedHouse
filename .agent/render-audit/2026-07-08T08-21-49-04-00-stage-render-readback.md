# Stage Render Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T08:21:49-04:00`

## Summary

`TheUnmappedHouse` has a real visual/render surface.

The render path is concentrated in `src/stage-kit.js` and should stay stable while story command authority is extracted.

## Render route

```txt
index.html
  -> src/game.js
  -> new StageKit({ root, hoverLabel, onHotspot })
  -> StageKit.loadScene(currentScene)
  -> requestAnimationFrame(StageKit.animate)
  -> renderer renders scene into WebGLRenderTarget
  -> postScene renders full-screen post pass
```

## StageKit render ownership

```txt
Three.js import from https://unpkg.com/three@0.160.0/build/three.module.js
WebGLRenderer with antialias
pixel ratio capped at 2
shadow map enabled with PCFSoftShadowMap
Scene and stageGroup
PerspectiveCamera
Raycaster
DirectionalLight and HemisphereLight
WebGLRenderTarget
post Scene and OrthographicCamera
ShaderMaterial for stage objects
ShaderMaterial for post-process
resize listener
mousemove listener
click listener
animation loop
```

## Visual services

```txt
StageKit.animeMaterial(preset)
  -> creates triplanar-ish procedural anime shader material
  -> colorA / colorB / colorC
  -> scale
  -> toonSteps
  -> lightDir
  -> time uniform

StageKit.loadScene(sceneData)
  -> clears stageGroup
  -> resets hotspots/materials
  -> sets scene background/fog
  -> sets base camera
  -> creates stage layers
  -> creates props
  -> creates invisible hotspot volumes
  -> applies post uniforms

StageKit.createLayer(layer)
  -> PlaneGeometry
  -> shader material
  -> transform
  -> receive shadow

StageKit.createProp(prop)
  -> box / cylinder / plane geometry
  -> shader material
  -> transform
  -> cast/receive shadow

StageKit.createHotspot(hotspot)
  -> invisible BoxGeometry
  -> userData.hotspot
  -> registered for raycast picking

StageKit.animate()
  -> camera pointer parallax
  -> material time uniforms
  -> post time uniform
  -> scene render to target
  -> post render to screen
```

## Render domains in use

```txt
stage-render-host
fixed-camera-composition
pointer-parallax-camera
stage-layer-render
stage-prop-render
hotspot-volume-render
anime-material-shader
webgl-post-process
render-target-pass
resize-policy
```

## Current render gaps

```txt
StageKit is one monolith.
Scene descriptor validation is missing before geometry creation.
Prop vocabulary is limited to box, cylinder, and plane.
Post settings are applied directly to uniforms with no contract record.
Render diagnostics are not exposed through GameHost.
Hotspot volume summaries are not exposed separately from mesh userData.
No fixture proves scene descriptors can be converted into stage snapshots without WebGL.
```

## Keep stable during next source work

```txt
StageKit constructor signature
StageKit.loadScene(sceneData)
StageKit click behavior
hover label behavior
shader look
post-process settings
current camera descriptors
current prop descriptors
current hotspot descriptors
```

## Next render-safe contract

Before changing visuals, add a DOM-free stage snapshot contract:

```txt
createStageSceneSnapshot(scene)
  -> sceneId
  -> camera
  -> layerCount
  -> propCount
  -> hotspotCount
  -> hotspotIds
  -> grantedCluesByHotspot
  -> requiredClues
  -> postSettings
  -> descriptorWarnings
```

This lets the story authority fixtures verify source descriptors without creating a WebGL renderer.