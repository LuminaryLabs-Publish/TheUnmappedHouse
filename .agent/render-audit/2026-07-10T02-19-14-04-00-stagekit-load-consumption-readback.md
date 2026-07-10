# Render audit: StageKit load consumption readback

Timestamp: `2026-07-10T02-19-14-04-00`

## Render surface

`TheUnmappedHouse` has a visual/render surface through `src/stage-kit.js`. It creates a Three.js renderer, scene, camera, lights, fog, render target, post-process scene, anime shader material, hotspot meshes, pointer picking, hover label, resize handling, and animation loop.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> create scene/camera/lights/render target/post pass
  -> install pointer/resize listeners
  -> animate()

loadScene(sceneData)
  -> clear previous scene children
  -> set camera/fog/background/post descriptors
  -> create layers and props
  -> create invisible hotspot meshes
  -> store hotspot userData

pointer move/click
  -> raycast hotspot meshes
  -> update hover label
  -> call onHotspot(hotspot)
```

## Current good boundary

`StageKit` already consumes descriptor-like source data. It is not the immediate rewrite target.

## Missing readback

```txt
stage load id
source scene id
camera descriptor consumed
layer descriptor counts
prop descriptor counts
hotspot descriptor counts
post descriptor consumed
hover/click readback row
stage-load intent/result parity
```

## Next render-safe cut

Add readback at the story-adapter boundary first. `src/game.js` should receive a source-owned `StageLoadIntentRecord`, call `stage.loadScene(...)`, then emit a browser adapter readback row proving the intended scene was loaded.

## Deferred

- Visual polish.
- Shader changes.
- Camera redesign.
- Renderer extraction.
- StageKit rewrite.

Those should wait until source result to render consumption is fixture-readable.
