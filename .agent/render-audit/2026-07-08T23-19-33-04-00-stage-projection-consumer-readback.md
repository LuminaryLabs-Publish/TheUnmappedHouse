# Stage Projection Consumer Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Render surface

The visual surface remains `StageKit`.

```txt
src/stage-kit.js
  -> imports Three.js from CDN
  -> applies fixed 16:9 aspect frame helpers
  -> creates WebGLRenderer, scene, camera, lights, render target, post-process pass
  -> loads scene descriptors from story data
  -> creates stage layers, props, and transparent hotspot volumes
  -> raycasts hotspot meshes
  -> projects hover label
  -> animates shader time, camera parallax, and post-process output
```

## Current source of render truth

`StageKit.loadScene(sceneData)` consumes `src/story-data.js` descriptors directly.

The browser host decides *when* to call `loadScene`, because `nextScene()` in `src/game.js` mutates route state and then calls `stage.loadScene(currentScene)`.

## Render gap

There is no pure `StageSceneSnapshot` or `StageProjection` that records which scene should be loaded, why it was selected, whether the scene descriptor is valid, and what browser adapter consumed.

## Required render-adjacent contracts

```txt
StageSceneSnapshot:
  sceneId
  title
  camera
  layerCount
  propCount
  hotspotCount
  postSettings
  invalidDescriptorReasons[]

StageProjection:
  status
  reason
  targetSceneId
  shouldLoadScene
  sceneSnapshot
  loadSceneInput

BrowserAdapterReadback:
  consumedStageProjection
  loadedSceneId
  previousSceneId
  leftStageUnchanged
  reason
```

## Fixture expectations

```txt
stage_scene_snapshot returns one row per scene
stage_projection returns a load request only on accepted transition or initial load
stage_projection is no_mutation on repeated hotspot inspect
stage_projection is terminal/no-load when prototype is complete
browser_adapter_readback reports consumed stage projection without requiring Three.js
```

## Preserve

```txt
fixed 16:9 composition
current scene art descriptors
current hotspot boxes
current shader material language
current post-process pass
current click/hover behavior
current public route
```

No renderer source was changed in this pass.
