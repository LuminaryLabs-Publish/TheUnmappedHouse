# Render Audit: StageKit Render Adapter Deferral Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T10-50-00-04-00`

## Render route

```txt
src/game.js
  -> new StageKit({ root, hoverLabel, onHotspot })
  -> stage.loadScene(currentScene)
  -> StageKit creates renderer, camera, scene, target, shader materials, layers, props, hotspots, post pass, pointer picking, and animation
```

## Render facts

`StageKit` already owns:

```txt
Three.js CDN import
fixed 16:9 viewport integration
WebGLRenderer setup
pixel ratio cap
shadow map setup
scene and stage group
PerspectiveCamera
Raycaster
DirectionalLight / HemisphereLight
WebGLRenderTarget
post-process ShaderMaterial
anime ShaderMaterial
scene descriptor loading
layer/prop/hotspot construction
pointer hover label
raycast picking
resize handling
render loop
```

## Not the current blocker

The render surface should not be rewritten first.

The renderer has a coherent descriptor-consumption shape and hotspot click path. The missing piece is source-owned readback that tells the browser adapter what scene should be loaded, why, and what StageKit consumed.

## Needed render-adjacent source contracts

```txt
StageSceneSnapshot:
  pure descriptor facts from story-data scenes

StageProjection:
  scene id, camera id/facts, hotspot ids, post settings, and load reason

BrowserAdapterPlan:
  explicit stage.loadScene command intent

BrowserAdapterReadback:
  stage scene id consumed, hotspot count consumed, post settings consumed, viewport/fixed-frame facts consumed

GameHostStoryDiagnostics:
  additive render-adjacent story/stage projection facts
```

## Deferred render work

```txt
renderer extraction
new visual pass
new rooms
new shader system
post-process changes
hotspot geometry retune
browser-only render smoke as first proof
```

## Next safe ledge

```txt
TheUnmappedHouse Story Command Result Ledger + Adapter Readback Fixture Gate
```
