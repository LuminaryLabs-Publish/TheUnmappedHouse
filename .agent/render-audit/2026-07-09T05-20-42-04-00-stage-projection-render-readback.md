# Render Audit: Stage Projection Render Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Current render surface

`StageKit` is the active render kit. It owns the fixed design frame, WebGL renderer, camera, render target, post-process pass, anime material shader, scene group, layers, props, hotspot volumes, pointer picking, hover label, resize, and animation.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> set pixel ratio and fixed design size
  -> create Scene and stageGroup
  -> create PerspectiveCamera at DESIGN_ASPECT
  -> create directional and hemisphere lights
  -> create WebGLRenderTarget
  -> create post-process scene/material
  -> register resize, mousemove, click
  -> animate()

loadScene(sceneData)
  -> clear stageGroup/hotspots/materials
  -> apply background and fog
  -> set base camera from scene descriptor
  -> create layers
  -> create props
  -> create hotspot boxes
  -> apply post-process settings

animate()
  -> update camera parallax from pointer
  -> update material time uniforms
  -> render scene into target
  -> render post scene to screen
```

## Render facts to preserve

```txt
Three.js CDN import remains in StageKit
fixed 16:9 design aspect remains stable
scene descriptors remain source data
hotspots remain invisible volumes
hover label remains adapter-side UI
post-process shader remains StageKit-owned
renderer extraction is not the next ledge
```

## Missing render readback

```txt
StageSceneSnapshot:
  - scene id
  - camera descriptor
  - layer count
  - prop count
  - hotspot count
  - hotspot ids
  - post-process descriptor
  - fog/background descriptor
  - descriptor validation status

StageProjection:
  - requested scene id
  - requested reason
  - shouldLoadScene boolean
  - expected hotspot ids
  - expected post descriptor

RenderReadback:
  - consumed scene id
  - consumed layer count
  - consumed prop count
  - consumed hotspot count
  - consumed post descriptor
  - readback status
  - readback mismatches
```

## Adapter rule

The browser should consume a `StageProjection` created by story authority.

`src/game.js` should stop deciding stage loads from mutation branches and instead apply a source-owned browser adapter plan.

## Next fixture rows

```txt
stage_snapshot_library_blank_map
stage_snapshot_repeating_hallway
stage_snapshot_closet_weather
stage_projection_initial_load
stage_projection_continue_scene
stage_projection_terminal_no_load
render_readback_consumed_scene
render_readback_mismatch_rejected
```

## Not validated in this pass

```txt
npm run check
browser boot
hover/click smoke
post-process screenshot
StageKit runtime readback
```
