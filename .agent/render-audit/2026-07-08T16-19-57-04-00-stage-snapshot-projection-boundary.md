# Stage Snapshot Projection Boundary

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T16-19-57-04-00`

## Render surface status

The visual surface should be preserved.

`src/stage-kit.js` already owns the Three.js import, renderer, fixed 16:9 frame integration, render target, post-process pass, anime shader material, scene loading, stage layers, props, invisible hotspot volumes, pointer/raycast picking, hover label, resize, and animation.

## Current render loop

```txt
StageKit constructor
  -> create WebGLRenderer
  -> set design frame pixel ratio and size
  -> create scene, stage group, camera, raycaster, lights
  -> create render target and post-process pass
  -> bind resize, pointer, and click handlers
  -> animate

loadScene(sceneData)
  -> clear stage group
  -> set background/fog
  -> set camera descriptor
  -> create layers
  -> create props
  -> create hotspot volumes
  -> apply post settings

animate()
  -> drift camera from mouse parallax
  -> update material time
  -> render scene to target
  -> render post scene to screen
```

## Missing pure readback

There is no DOM-free `StageSceneSnapshot` that can prove, before WebGL boot, that each story scene has:

```txt
scene id
title
camera position / lookAt / fov
background color
fog value
layer count and material summary
prop count and material summary
hotspot count
hotspot ids
hotspot labels
hotspot positions and sizes
post-process settings
required clues
grantable clue ids
completion-readiness facts
```

## Target render boundary

```txt
src/story-authority/stage-scene-snapshot.js
  -> summarize all scene descriptors
  -> validate camera/post/layer/prop/hotspot shape
  -> emit serializable stage snapshots
  -> feed GameHost diagnostics
  -> feed fixture rows
```

## Do not do yet

```txt
Do not rewrite StageKit.
Do not add new post-processing.
Do not change camera descriptors.
Do not change hotspot positions.
Do not add screenshots as validation before source snapshots exist.
```

## Acceptance rows

```txt
stage_scene_snapshot: all scenes emit serializable stage facts
stage_hotspot_snapshot: all hotspot ids are unique per scene
stage_completion_snapshot: every required clue is grantable
GameHost_projection: stage snapshot appears in additive diagnostics
```
