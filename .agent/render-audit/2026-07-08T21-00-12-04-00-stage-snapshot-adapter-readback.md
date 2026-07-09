# Stage Snapshot Adapter Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T21-00-12-04-00`

## Current render surface

`StageKit` owns the Three.js renderer, scene, camera, lights, render target, post-process shader, material shader, layer creation, prop creation, hotspot meshes, raycast picking, hover label, resize, and animation loop.

The render surface is useful as-is. Do not rewrite it before the story authority fixture exists.

## Render descriptors currently consumed

From `src/story-data.js`:

```txt
scene.backgroundColor
scene.fog
scene.camera.position
scene.camera.lookAt
scene.camera.fov
scene.stage.layers[]
scene.stage.props[]
scene.post
scene.hotspots[]
```

From `src/stage-kit.js`:

```txt
StageKit.loadScene(sceneData)
StageKit.createLayer(layer)
StageKit.createProp(prop)
StageKit.createHotspot(hotspot)
StageKit.handlePointer(event)
StageKit.pick()
StageKit.clickHotspot()
StageKit.resize()
StageKit.animate()
```

## Missing render/readback contracts

```txt
StageSceneSnapshot
StageSceneValidationResult
StageProjection
StageProjectionReason
StageLoadIntent
HotspotVolumeSnapshot
PostProcessSnapshot
CameraSnapshot
LayerDescriptorSnapshot
PropDescriptorSnapshot
```

## Next fixture rows

```txt
stage_scene_snapshot_library
stage_scene_snapshot_hallway
stage_scene_snapshot_closet
stage_projection_initial_scene
stage_projection_after_continue
stage_projection_noop_on_incomplete_continue
stage_projection_terminal_prototype_complete
```

## Adapter rule

`StageKit.loadScene(currentScene)` should eventually be called because a `StageProjection` says to load a specific scene, not because `nextScene()` directly mutates the route and calls StageKit.

## Stop condition

Do not extract renderer internals. Stop when a DOM-free `StageSceneSnapshot` and `StageProjection` can prove what the browser host should pass to `StageKit` and why.
