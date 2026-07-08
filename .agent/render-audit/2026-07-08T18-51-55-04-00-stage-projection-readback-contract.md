# Render Audit: Stage Projection Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T18-51-55-04-00`

## Intent

Keep the existing StageKit renderer stable while adding a pure projection/readback layer that proves what stage scene should be loaded and why.

## Current render surface

```txt
src/stage-kit.js
  -> imports Three.js from CDN
  -> imports DESIGN_WIDTH/DESIGN_HEIGHT/DESIGN_ASPECT and aspect frame helpers
  -> creates WebGLRenderer
  -> creates Scene, stageGroup, PerspectiveCamera, Raycaster, lights
  -> creates render target and post-process quad
  -> loadScene(sceneData) clears stageGroup and builds layers, props, hotspots
  -> createHotspot creates invisible clickable volumes
  -> handlePointer performs hover readback
  -> clickHotspot dispatches hotspot descriptor to src/game.js
  -> animate renders scene to target, then post scene to screen
```

## Stable facts to preserve

```txt
canonical frame: 1920 x 1080
aspect: 16:9
three version: CDN three@0.160.0
hotspot visibility: invisible MeshBasicMaterial with opacity 0
post path: render target -> shader quad -> screen
scene source: src/story-data.js scene descriptors
host callback: onHotspot(hotspot)
```

## Current gap

`StageKit.loadScene(sceneData)` consumes the selected scene directly, but there is no pure `StageProjection` or `StageSceneSnapshot` proving the scene id, camera, layer count, prop count, hotspot count, post settings, and source validity before Three.js is touched.

The debug panel is story-facing only. It does not report stage projection reason, stage descriptor validity, latest StageKit load target, or whether StageKit consumed the same source snapshot as the story reducer.

## Target readback contract

```txt
StoryCommandResult
  -> StageProjection
      sceneId
      loadReason
      camera
      layerCount
      propCount
      hotspotCount
      postProfile
      sourceFingerprint
      warnings[]
      errors[]
  -> StageKit.loadScene(projection.sceneDescriptor)
  -> GameHost.getState().stageProjection
```

## Projection rows required

```txt
stage_projection_initial_scene:
  accepts library-blank-map and reports 3 hotspots.

stage_projection_after_continue:
  accepts repeating-hallway after completed library scene and reports 3 hotspots.

stage_projection_invalid_scene:
  rejects unknown scene id before StageKit.loadScene.

stage_projection_descriptor_parity:
  camera, post, layers, props, and hotspots match src/story-data.js.

stage_projection_gamehost_readback:
  GameHost diagnostics include latest stage projection without removing existing debug text.
```

## Do not change yet

```txt
Three.js renderer internals
shader material copy
post-process shader
hotspot mesh opacity
pointer/raycast behavior
aspect-frame math
visible scene art
```

## Next implementation note

Add `stage-scene-snapshot.js` and `stage-projection.js` before any StageKit rewrite. The browser host can still call `stage.loadScene(currentScene)` during compatibility, but the call should be driven by an explicit projection record.
