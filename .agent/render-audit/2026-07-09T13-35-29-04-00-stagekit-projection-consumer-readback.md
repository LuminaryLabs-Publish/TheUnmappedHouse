# Render Audit - StageKit Projection Consumer Readback

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Render surface

`TheUnmappedHouse` has a visual/render surface.

The render path is currently:

```txt
index.html #stage
  -> src/game.js creates StageKit
  -> src/stage-kit.js imports Three.js CDN
  -> StageKit constructor builds renderer, scene, camera, render target, post scene, post camera, post material, lights, and pointer handlers
  -> stage.loadScene(currentScene)
  -> StageKit consumes currentScene.camera, currentScene.stage.layers, currentScene.stage.props, currentScene.hotspots, and currentScene.post
  -> animate() renders scene to target, then target through post-process pass
```

## What is healthy

```txt
fixed 16:9 design frame exists
StageKit viewport is based on aspect-frame helpers
scene descriptors feed camera, layer, prop, hotspot, and post settings
hotspot volumes are invisible meshes and are not coupled to text projection
hover label is a separate browser projection
post-process uniforms are scene-configurable
```

## Render readback gap

The browser can render the scene, but there is no DOM-free or GameHost-level readback that proves what was consumed.

Missing facts:

```txt
stageSceneSnapshot.sceneId
stageSceneSnapshot.camera
stageSceneSnapshot.layerCount
stageSceneSnapshot.propCount
stageSceneSnapshot.hotspotCount
stageSceneSnapshot.postSettings
stageProjection.reason
stageProjection.targetSceneId
stageProjection.shouldLoadStage
browserAdapterReadback.stageLoaded
browserAdapterReadback.consumedSceneId
GameHost.getState().story.stageProjection
GameHost.getState().story.stageReadback
```

## Current risk

`StageKit.loadScene(currentScene)` is called directly from `src/game.js`.

That means fixture code cannot prove whether a story command caused the right stage projection before the browser mutates the renderer.

## Next render-safe contract

```txt
StoryCommandResult
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> StageKit.loadScene(plan.stageProjection.sceneDescriptor)
  -> BrowserAdapterReadback.stage
  -> GameHostStoryDiagnostics.stage
  -> DOM-free fixture row
```

## Do not do next

```txt
rewrite StageKit
extract renderer
change shader look
change camera framing
add rooms
add new visual assets
```

## Main render finding

The next render work is not a visual pass.

It is an additive proof layer that makes the existing StageKit consumption path observable and fixture-readable.
