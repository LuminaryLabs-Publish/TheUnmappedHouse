# Render audit: StageKit consumption command readback

Timestamp: `2026-07-10T00-51-03-04-00`

## Render surface

`TheUnmappedHouse` has a visual/render surface through `src/stage-kit.js` and Three.js `0.160.0`.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> create scene, stageGroup, PerspectiveCamera, Raycaster, lights
  -> create WebGLRenderTarget and post-process scene
  -> resize and attach pointer handlers
  -> animate()

loadScene(sceneData)
  -> clear stageGroup and hotspots
  -> consume background/fog/camera
  -> create layer meshes
  -> create prop meshes
  -> create invisible hotspot volumes
  -> apply post-process uniform values

animate()
  -> parallax camera from mouse
  -> update material/post uniforms
  -> render scene into target
  -> render post scene to screen
```

## What StageKit already proves visually

- Fixed 16:9 render frame.
- Descriptor-driven scene load.
- Camera and lookAt consumption.
- Layer and prop mesh construction.
- Anime shader materials.
- Background/fog/post settings.
- Invisible hotspot volumes.
- Raycast picking and hover label projection.
- Render target and post-processing pass.

## Missing render/readback proof

- No `StageLoadIntentRecord` from story authority exists before `stage.loadScene(currentScene)`.
- No `StageLoadReadback` records which scene id, layer count, prop count, hotspot count, camera, and post settings were consumed.
- No fixture-readable hover/click rows exist for hotspot hit tests.
- No command id is attached to stage-load, interlude, or terminal projection.
- Debug JSON is a browser projection and does not prove StageKit consumption.

## Render decision

Do not rewrite StageKit next. Add readback around StageKit consumption after story command results exist.

## Next render proof rows

```txt
StageLoadIntentRecord
StageLoadReadback
HotspotVolumeReadback
HotspotPickReadback
PostSettingsReadback
BrowserProjectionReadback
```

## Next safe render gate

A DOM-free story fixture should produce stage-load intents first. The browser adapter can then add lightweight readback without changing visible rendering.
