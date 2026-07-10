# Render audit — StageKit adapter readback gap

Timestamp: `2026-07-10T07-20-08-04-00`

## Render surface

`StageKit` owns the current visual surface:

```txt
Three.js 0.160.0 CDN import
WebGLRenderer
fixed 16:9 render target
PerspectiveCamera
scene descriptors
hotspot meshes
anime shader material
post-process shader pass
hover label projection
raycast click handling
```

## Current render flow

```txt
src/game.js resolves currentScene
  -> StageKit.loadScene(currentScene)
  -> StageKit consumes background, fog, camera, stage layers, props, post settings, and hotspots
  -> StageKit renders and handles hover/click callbacks
  -> renderUi writes story panel and debug JSON
```

## Render proof gap

The render path is visible but not source-readable as rows:

```txt
No stage-load intent row.
No stage-load result row.
No scene descriptor fingerprint.
No consumed/ignored/unsupported stage descriptor readback.
No hotspot volume readback tied to source hotspot IDs.
No post-process readback tied to source post settings.
No browser adapter projection row for text/buttons/debug output.
```

## Do not do next

```txt
Do not rewrite StageKit.
Do not extract the renderer first.
Do not add visual polish before stage-load/readback rows exist.
Do not add new story scenes before command/result proof exists.
```

## Next render-safe ledge

```txt
StageLoadIntentRecord
  -> StageSceneSnapshot
  -> StageLoadReadback
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> DOM-free fixture rows
```
