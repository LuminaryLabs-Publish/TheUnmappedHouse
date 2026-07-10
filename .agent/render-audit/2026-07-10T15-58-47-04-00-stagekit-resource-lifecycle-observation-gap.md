# Render audit: StageKit resource lifecycle observation gap

Timestamp: `2026-07-10T15-58-47-04-00`

## Current render surface

`StageKit` creates one long-lived WebGL renderer, perspective camera, Three.js scene, stage group, directional and hemisphere lights, multisampled render target, post scene, orthographic post camera, and animation loop.

The three authored scenes contribute:

```txt
scenes: 3
layers: 6
props: 13
hotspot volumes: 9
required clues: 9
shader materials per loaded scene: 7, 6, 6
```

## Descriptor consumption path

```txt
StageKit.loadScene(sceneData)
  -> clear stageGroup
  -> reset hotspot/material arrays
  -> apply background and fog
  -> apply base camera and FOV
  -> create layer meshes
  -> create prop meshes
  -> create invisible hotspot meshes
  -> apply post uniforms
```

## Confirmed gaps

- `loadScene()` provides no JSON-safe observation identifying the scene or consumed descriptor counts.
- `stageGroup.clear()` detaches prior objects but no geometry, material, or texture `dispose()` calls are made.
- `this.materials = []` drops prior material references before disposal status can be observed.
- The constructor starts `requestAnimationFrame` recursion immediately and exposes no stop/dispose method.
- Resize, mousemove, and click listeners have no teardown contract.
- Picks return a live Three.js intersection internally and only forward a hotspot descriptor callback.
- Frame output has no detached scene id, viewport, camera, render-target, material, or draw-consumption row.
- Hover projection writes directly to DOM and cannot be fixture-proven without the browser.

## Required observations

```txt
StageLoadObservation
  loadId
  sceneId
  sourceFingerprint
  layerDescriptorCount
  propDescriptorCount
  hotspotDescriptorCount
  materialCreatedCount
  fogApplied
  cameraApplied
  postApplied
  viewport

StagePickObservation
  pickId
  inputId
  sceneId
  pointerNdc
  hit
  hotspotId
  intersectionDistance

StageResourceObservation
  sceneId
  detachedMeshCount
  disposedGeometryCount
  disposedMaterialCount
  retainedMaterialCount
  animationLoopActive
  listenerCount

StageFrameObservation
  frameId
  sceneId
  viewport
  pixelRatio
  targetWidth
  targetHeight
  cameraPosition
  cameraLookAt
  materialCount
  hotspotCount
```

## Safe implementation order

1. Return a detached `StageLoadObservation` from `loadScene()`.
2. Return a detached `StagePickObservation` from pick/click handling.
3. Add a bounded `getObservation()` surface; do not expose live Three.js objects.
4. Add explicit disposal for old geometries/materials before rebuilding the stage group.
5. Add `dispose()` to stop the frame loop and remove browser listeners.
6. Fixture-test descriptor counts and resource-disposal counts with a renderer adapter or fake surface.
7. Preserve all current camera, shader, fog, post, and visual behavior.

## Non-goals

```txt
renderer replacement
new shader work
new scene art
camera retuning
post-process redesign
Three.js version migration
```

## Render-specific next ledge

```txt
StageKit load/pick/resource observations with bounded lifecycle teardown and no visual changes
```