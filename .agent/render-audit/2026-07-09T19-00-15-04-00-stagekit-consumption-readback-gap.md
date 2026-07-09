# Render Audit: StageKit Consumption Readback Gap

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

## Render surface

`StageKit` remains the active render surface and should stay stable for the next source-authority pass.

## Current render loop

```txt
StageKit constructor
  -> create Three.js WebGLRenderer
  -> create Scene and PerspectiveCamera
  -> create render target and post-process quad
  -> resize into fixed 16:9 aspect frame
  -> install resize / mousemove / click listeners
  -> animate()

stage.loadScene(sceneData)
  -> clear stage group and hotspot list
  -> apply background/fog
  -> apply camera descriptor
  -> create layers
  -> create props
  -> create invisible hotspot boxes
  -> apply post-process settings

animate()
  -> update parallax camera from pointer
  -> update shader time
  -> render scene to target
  -> render post-process scene to canvas
```

## Services in use

```txt
fixed 16:9 viewport service
Three.js renderer service
camera descriptor consumer
anime shader material service
post-process shader service
layer mesh construction service
prop mesh construction service
hotspot volume construction service
raycast picking service
hover label projection service
resize service
render target service
animation service
```

## Current render kits

```txt
aspect-frame-kit
stage-render-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
hover-label-projection-kit
fixed-camera-descriptor-consumer-kit
stage-layer-consumer-kit
stage-prop-consumer-kit
```

## Gaps

```txt
StageKit.loadScene() does not return a StageProjection summary.
Hotspot meshes are invisible and not represented in a stable readback table.
Camera descriptor consumption has no fixture-readable output.
Post-process uniform consumption has no stable renderer snapshot.
Hover/click picking is browser-bound and not covered by DOM-free tests.
StageKit has no additive getState/getSnapshot surface.
```

## Decision

Do not rewrite StageKit first.

Add story-authority projections first, then let the browser adapter produce a `StageProjection` and optional StageKit readback surface that confirms the active scene id, camera descriptor, hotspot ids, hotspot count, layer count, prop count, and post-process settings.

## Next render readback rows

```txt
load_library_scene -> accepted / stage_scene_id library-blank-map / hotspot_count 3
continue_repeating_hallway -> accepted / stage_scene_id repeating-hallway / hotspot_count 3
continue_closet_weather -> accepted / stage_scene_id closet-weather / hotspot_count 3
adapter_readback_stage_projection -> accepted / current_scene_matches_projection
post_settings_readback -> accepted / grain_vignette_chromatic_distortion_memory_match_scene
```
