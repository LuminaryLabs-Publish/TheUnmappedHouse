# Render audit — StageKit adapter readback gap

## Visual/render surface

`TheUnmappedHouse` has a fixed-camera Three.js render surface through `StageKit`.

## Current render loop

```txt
StageKit.loadScene(sceneData)
  -> clear stage group
  -> set background/fog/camera
  -> create stage layers
  -> create props
  -> create invisible hotspot meshes
  -> copy post uniforms
  -> animation loop renders scene to target
  -> post scene renders final frame
```

## Current pick loop

```txt
mousemove -> raycaster -> hovered hotspot -> hover label DOM
click -> raycaster -> hotspot callback -> src/game.js inspectHotspot
```

## Gap

`StageKit` consumes scene descriptors and returns callbacks, but it does not expose serializable readback rows for:

```txt
stage_load_started
stage_load_completed
scene_descriptor_consumed
layer_descriptor_consumed
prop_descriptor_consumed
hotspot_descriptor_consumed
post_descriptor_consumed
hover_pick_result
click_pick_result
stage_projection_match
```

## Do not start with

- renderer extraction
- shader rewrite
- visual polish
- new rooms
- StageKit rewrite

## Next render proof

Add source-owned story command results first, then add an adapter readback wrapper that can prove each command result led to the expected StageKit scene load, hotspot pick, projection, or no-op row.
