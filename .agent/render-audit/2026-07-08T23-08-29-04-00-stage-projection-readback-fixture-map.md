# Render Audit: Stage Projection Readback Fixture Map

**Timestamp:** `2026-07-08T23-08-29-04-00`

## Current render surface

`StageKit` is already the right render host for the current slice.

It owns:

```txt
Three.js CDN import
fixed 16:9 design frame
WebGLRenderer
PerspectiveCamera
raycaster
lights
stage group
render target
post-process shader pass
anime shader material
scene background/fog
camera descriptor consumption
layer descriptor consumption
prop descriptor consumption
hotspot volume descriptor consumption
pointer/raycast picking
hover label projection
resize
animation loop
```

## Render finding

Do not rewrite the renderer next.

The missing render proof is not visual fidelity. The missing proof is a pure stage projection/readback boundary that says which story result requested which scene load and which source descriptor was consumed.

## Current host-owned render decisions

```txt
src/game.js:
  currentScene mutable module variable
  nextScene() changes currentScene
  nextScene() calls stage.loadScene(currentScene)
  renderUi() produces debug JSON but no StageProjection

src/stage-kit.js:
  loadScene(sceneData) consumes scene descriptor directly
  createLayer/createProp/createHotspot consume descriptors directly
  animate() renders without source readback records
```

## Required stage projection record

```txt
StageProjection = {
  projectionId,
  reason,
  sourceManifestId,
  sceneId,
  sceneIndex,
  shouldLoadScene,
  stageDescriptorSummary: {
    camera,
    layerCount,
    propCount,
    hotspotCount,
    postProcess,
    backgroundColor,
    fog
  },
  compatibility: {
    stageKitLoadSceneInputStable,
    fixedAspectFrameStable,
    hotspotPickingStable
  }
}
```

## Required stage scene snapshot

```txt
StageSceneSnapshot = {
  sceneId,
  camera,
  backgroundColor,
  fog,
  layers: [{ index, size, position, materialSummary }],
  props: [{ index, kind, position, geometrySummary, materialSummary }],
  hotspots: [{ id, label, position, size, grants }],
  post,
  validationFacts
}
```

## Fixture rows

```txt
stage_scene_snapshot_library_blank_map
stage_scene_snapshot_repeating_hallway
stage_scene_snapshot_closet_weather
stage_projection_initial_scene
stage_projection_continue_to_hallway
stage_projection_continue_to_closet
stage_projection_prototype_complete_no_load
stage_projection_unknown_scene_rejected
browser_adapter_plan_stage_load_requested
browser_adapter_plan_stage_load_skipped_for_no_mutation
GameHost_stage_projection_readback
```

## Acceptance criteria

```txt
StageKit visuals are unchanged.
StageKit API remains compatible.
Scene descriptors remain unchanged.
No Three.js import is required to run stage snapshot fixtures.
StageProjection explains every stage.loadScene request.
Prototype-complete terminal results do not request an invalid stage load.
window.GameHost.getState().story.stageProjection exposes the latest additive readback after implementation.
```
