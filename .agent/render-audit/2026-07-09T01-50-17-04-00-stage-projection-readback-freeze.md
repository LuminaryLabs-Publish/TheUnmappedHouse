# Stage Projection Readback Freeze

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Render surface

The repo has a visual/render surface.

`index.html` mounts `#stage`, `#hover-label`, `#interlude`, and story panel nodes. `src/stage-kit.js` creates the Three.js renderer, camera, shadowed lights, render target, post-process pass, shader materials, stage group, hotspot volumes, pointer picking, hover label, resize logic, and animation loop.

## What should stay stable

```txt
public route: index.html -> src/game.js
StageKit constructor shape
StageKit.loadScene(sceneData)
StageKit.pick()
StageKit.clickHotspot()
fixed 16:9 aspect frame behavior
current scene descriptors and copy
current post-process look
current hotspot click behavior
```

## Render gap

The renderer consumes scene descriptors, but no pure `StageSceneSnapshot` or `StageProjection` exists.

That means a fixture cannot prove:

```txt
which scene should load
why the scene should load
camera descriptor validity
layer descriptor validity
prop descriptor validity
hotspot descriptor validity
post-process descriptor validity
whether the browser host consumed the intended stage projection
whether StageKit intentionally left any projection unconsumed
```

## Required readback contract

```txt
StageSceneSnapshot:
  sceneId
  camera
  layerCount
  propCount
  hotspotCount
  hotspotIds
  postSettings
  validation

StageProjection:
  reason
  targetSceneId
  shouldLoadScene
  sceneDescriptorHash
  expectedHotspots
  expectedPostSettings

BrowserAdapterReadback:
  consumedStageProjection
  loadedSceneId
  loadedHotspotCount
  loadedLayerCount
  loadedPropCount
  consumedPostSettings
  skippedFields
  warnings
```

## Fixture rows

```txt
stage_scene_snapshot
stage_projection
stage_projection_readback
invalid_stage_descriptor_rejected
duplicate_hotspot_descriptor_rejected
complete_library_scene_loads_interlude_projection_without_stage_rewrite
continue_to_hallway_loads_stage_projection
prototype_complete_does_not_call StageKit.loadScene
```

## Next safe render work

Add pure snapshot/projection/readback modules before touching Three.js renderer internals.
