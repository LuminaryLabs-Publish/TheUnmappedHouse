# StageKit Projection Readback Gap

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T11-00-39-04-00`

## Render surface

`TheUnmappedHouse` has a visual/render surface.

Current renderer path:

```txt
index.html
  -> #aspect-frame
  -> #stage
  -> src/game.js
  -> new StageKit({ root, hoverLabel, onHotspot })
  -> src/stage-kit.js
  -> Three.js WebGLRenderer
  -> descriptor-created layers, props, hotspots
  -> render target
  -> post-process shader
  -> final full-screen post scene
```

## StageKit currently provides

```txt
fixed 1920x1080 design frame
computed letterbox/pillarbox viewport
PerspectiveCamera from scene descriptor
WebGLRenderer
shadow-enabled scene lighting
anime shader material
post-process shader material
layer construction
prop construction
transparent hotspot volume construction
pointer hover state
raycast click picking
hover label placement
resize handling
animation loop
```

## Missing render/readback contracts

```txt
StageSceneSnapshot:
  camera, layers, props, hotspots, and post settings without Three.js allocation.

StageProjection:
  which scene should be loaded, why, and from which command result.

StageRenderReadback:
  actual scene id, camera fov, layer count, prop count, hotspot count, material count, viewport, pixel ratio, render target size, post settings, and latest hover state.

BrowserAdapterReadback:
  evidence that the browser consumed StoryBrowserAdapterPlan without owning story rules.
```

## Do not change first

```txt
Do not rewrite StageKit.
Do not replace shaders.
Do not add new rooms.
Do not add browser-only screenshot automation before source fixture rows exist.
```
