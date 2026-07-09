# Render Audit — StageKit Consumer Readback Contract

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Current render surface

`StageKit` already owns the important visual surface:

```txt
fixed 16:9 frame
Three.js renderer
PerspectiveCamera from scene descriptor
shader material
post-process pass
scene background/fog
stage layer construction
prop construction
hotspot collision mesh construction
hover label projection
raycast picking
resize behavior
animation loop
```

## Current render loop

```txt
StageKit constructor
  -> renderer and frame target setup
  -> camera and lights setup
  -> pointer/resize listeners
  -> animate()

loadScene(sceneData)
  -> clear stage group
  -> reset hotspots and materials
  -> apply background/fog
  -> apply camera descriptor
  -> create layers
  -> create props
  -> create hotspots
  -> apply post-process descriptor

animate()
  -> apply camera parallax
  -> update shader time uniforms
  -> render scene to target
  -> render post-process scene to canvas
```

## Render readback gap

The render system consumes source descriptors, but no pure readback layer records:

```txt
current scene id
camera descriptor consumed
layer ids/counts consumed
prop ids/counts consumed
hotspot ids/counts consumed
post-process descriptor consumed
StageKit load reason
adapter plan stageProjection consumed
adapter readback status
```

## Why render extraction is not first

The fixed-camera surface is stable enough. Renderer extraction would not solve the main bottleneck because story commands can still directly mutate route, save, interlude, StageKit scene, UI, and debug output without typed results.

## Next render contract

Add pure stage snapshot and projection records:

```txt
StageSceneSnapshot
  sceneId
  camera
  layers
  props
  hotspots
  post
  validationRows

StageProjection
  targetSceneId
  loadScene
  loadReason
  expectedHotspotIds
  expectedPostProcess

BrowserAdapterReadback.stage
  plannedSceneId
  loadedSceneId
  hotspotCount
  projectionConsumed
```

## Acceptance rows

```txt
stage_snapshot_created
stage_projection_created
browser_adapter_stage_readback_created
all_scene_hotspots_have_pick_volumes
all_scene_post_descriptors_snapshot
all_stage_loads_explain_reason
```

## Recommendation

Preserve `src/stage-kit.js` behavior. Add source-owned readback around what it consumes before changing render internals.
