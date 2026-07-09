# Render Audit: StageKit Readback Contract Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Summary

The repo has a visual/render surface. `StageKit` is already a bounded render kit for fixed-camera anime point-and-click rooms. The missing layer is not visual fidelity; it is readback proof that story projections and StageKit consumption agree.

## Current render route

```txt
src/game.js
  -> new StageKit({ root, hoverLabel, onHotspot })
  -> stage.loadScene(currentScene)
  -> StageKit consumes currentScene.camera, currentScene.stage.layers, currentScene.stage.props, currentScene.hotspots, currentScene.post
  -> Three.js scene/camera/render target/post pass
  -> animate() updates camera parallax, shader time uniforms, post pass, and final render
```

## Render domains

```txt
fixed aspect frame
webgl renderer
scene graph
camera descriptor consumption
light/fog/background descriptor consumption
stage layer descriptor rendering
stage prop descriptor rendering
hotspot volume rendering
hover label projection
raycast picking
anime material shader
post-process shader
render target
resize handling
animation loop
```

## Render services

```txt
create WebGLRenderer with antialiasing
set device pixel ratio capped at 2
apply fixed 16:9 viewport
create scene, group, camera, raycaster, lights
create shader materials from descriptor presets
create layer planes
create prop meshes from box/cylinder/plane descriptors
create invisible hotspot volume meshes
track pointer and mouse parallax
perform raycast picking against hotspot volumes
project hover label position
load scene camera and post-process descriptor values
render scene to target
render post-process quad to screen
resize render target and canvas
```

## Render kits identified

```txt
aspect-frame-kit
stage-render-kit
fixed-camera-kit
anime-material-kit
stage-layer-render-kit
stage-prop-render-kit
hotspot-volume-kit
hotspot-picking-kit
hover-label-kit
post-process-kit
resize-consumer-kit
render-frame-loop-kit
```

## Current readback gaps

```txt
StageKit.loadScene() does not return a StageProjection result.
There is no stable readback for scene id, camera descriptor, layer count, prop count, hotspot count, post-process uniforms, or viewport size.
Hotspot pick results are callback-only and not represented as command envelopes.
Hover label state is not captured in host diagnostics.
Render target and viewport values are runtime-only.
No DOM-free fixture can prove a stage descriptor becomes the expected renderer snapshot.
```

## Proposed StageKit readback shape

```txt
StageProjectionReadback:
  sceneId
  camera:
    position
    lookAt
    fov
    aspect
  backgroundColor
  fog
  stage:
    layerCount
    propCount
    hotspotCount
    hotspotIds[]
  post:
    grain
    vignette
    chromatic
    distortion
    memory
  viewport:
    designWidth
    designHeight
    appliedWidth
    appliedHeight
    pixelRatio
  picking:
    hoveredHotspotId
    lastPickedHotspotId
```

## Render priority

Do not rewrite `StageKit` internals first.

Add additive readback methods that expose the current loaded scene and viewport facts without changing visuals.

## Fixture rows needed

```txt
load_library_blank_map -> stage readback has camera fov 38, hotspot ids map/window/shelf-gap
load_repeating_hallway -> stage readback has hotspot ids wrong-door/class-number/unfinished-photo
load_closet_weather -> stage readback has hotspot ids bucket-storm/wet-shadow/closet-map
post_uniform_readback -> post uniforms match scene descriptor
fixed_aspect_readback -> aspect remains DESIGN_WIDTH/DESIGN_HEIGHT
```

## Main finding

`StageKit` is ready to be treated as a renderer consumer. The next pass should expose what it consumed and compare that to source-owned story/stage projections.
