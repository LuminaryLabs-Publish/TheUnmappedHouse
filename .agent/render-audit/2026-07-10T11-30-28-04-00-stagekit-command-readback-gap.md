# Render audit: StageKit command readback gap

Timestamp: `2026-07-10T11-30-28-04-00`

## Render surface exists

`TheUnmappedHouse` has a visual/render surface through `src/stage-kit.js`.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> create Scene, Group, PerspectiveCamera, Raycaster
  -> create DirectionalLight and HemisphereLight
  -> create WebGLRenderTarget
  -> create post-process ShaderMaterial
  -> add resize, mousemove, click listeners
  -> animate with requestAnimationFrame

loadScene(sceneData)
  -> clear stageGroup and hotspots
  -> set background/fog
  -> set camera base pose
  -> create stage layers
  -> create props
  -> create invisible hotspot volumes
  -> set post uniforms

animate()
  -> apply mouse parallax to camera
  -> update material and post time uniforms
  -> render scene into target
  -> render post scene to canvas
```

## Current render kits

```txt
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
hover-label-projection-kit
fixed-aspect-render-frame-kit
```

## Readback gaps

- `loadScene()` does not return or store a stable load result row.
- Stage descriptor consumption has no source id, result id, or projection id.
- Hotspot mesh creation has no readback row for id, size, position, or source scene.
- `pick()` returns a Three.js intersection, not a serializable pick row.
- Hover updates are callback/DOM style effects only.
- Click handling calls `onHotspot(hotspot)` without command envelope or pick-readback id.
- Render/post settings are not exposed through fixture-safe diagnostics.

## Do not do next

```txt
renderer extraction
StageKit rewrite
new shader pass
visual polish
new rooms
```

## Do next

Add additive readback rows around the existing `StageKit`:

```txt
StageLoadIntent
StageLoadReadback
StageHotspotReadback
StagePickReadback
StageHoverReadback
StagePostReadback
StageViewportReadback
```

Those rows should be serializable and link back to story command/result/projection ids when the browser adapter consumes them.
