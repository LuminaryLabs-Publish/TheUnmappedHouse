# Render Audit: StageKit Source Consumption Readback Gap

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Render surface

`StageKit` currently owns:

```txt
Three.js 0.160.0 import
fixed design-size renderer
shadow-enabled WebGLRenderer
scene and stage group
PerspectiveCamera
DirectionalLight and HemisphereLight
WebGLRenderTarget
post-process ShaderMaterial
anime material shader
raycaster-based hotspot picking
hover label projection
```

## Descriptor consumption

`StageKit.loadScene(sceneData)` consumes:

```txt
backgroundColor
fog
camera position/lookAt/fov
stage.layers
stage.props
hotspots
post grain/vignette/chromatic/distortion/memory
```

## Readback gap

The render consumer does not expose fixture-readable rows for:

```txt
scene id loaded
camera consumed
layer count consumed
prop count consumed
hotspot count consumed
post settings consumed
hover target
click target
stage-load result
```

## Do not do next

```txt
Do not rewrite StageKit.
Do not extract renderer before source rows exist.
Do not add new visual polish before stage-load readback exists.
```

## Needed next

Add stage-load intent/readback records from the story authority/browser adapter layer.

The browser adapter should know what scene was requested, what StageKit load was attempted, and what descriptor counts were consumed.
