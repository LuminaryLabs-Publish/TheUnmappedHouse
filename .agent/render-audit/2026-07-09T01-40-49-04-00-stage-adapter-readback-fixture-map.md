# Render Audit — Stage Adapter Readback Fixture Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

## Current render surface

`src/stage-kit.js` owns the visual route.

Implemented render services:

```txt
Three.js module import
WebGLRenderer creation
pixel ratio clamp to <= 2
fixed design frame integration
PerspectiveCamera setup
DirectionalLight + HemisphereLight setup
WebGLRenderTarget setup
post-process shader pass
anime material shader
scene load from descriptors
layer mesh creation
prop mesh creation
hotspot volume creation
pointer normalization
raycast hit test
hover label projection
resize handling
requestAnimationFrame loop
main scene render to target
post scene render to screen
```

## Why render should not be rewritten now

The fixed 16:9 frame, shader materials, post-process pass, hotspot picking, and descriptor-driven scene loading are already useful.

The missing layer is not renderer fidelity.

The missing layer is a source/readback boundary that can say which stage descriptor should load, why it should load, and whether the browser actually consumed that stage projection.

## Current render dependency chain

```txt
src/story-data.js scene descriptor
  -> src/game.js currentScene
  -> StageKit.loadScene(currentScene)
  -> StageKit.createLayer(layer)
  -> StageKit.createProp(prop)
  -> StageKit.createHotspot(hotspot)
  -> StageKit.animate()
  -> render target
  -> post-process pass
```

## Missing readback chain

```txt
StoryCommandResult
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> StageKit load intent
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> fixture row
```

## Render-specific gaps

```txt
- No pure StageSceneSnapshot exists for scene camera/layer/prop/hotspot/post facts.
- No StageProjection object states which scene should load and why.
- No BrowserAdapterReadback reports whether StageKit.loadScene was requested.
- No GameHost story diagnostics expose latest stage projection or adapter readback.
- No fixture proves all three story scenes are descriptor-valid without WebGL.
- No fixture proves completion requirements match grantable hotspot clues.
```

## Preserve during next pass

```txt
current visible scenes
current shader and post-processing behavior
current camera descriptors
current hotspot sizes and positions
current fixed aspect frame behavior
current pointer/raycast behavior
current hover label behavior
```

## Next render-adjacent proof

Add pure readback records before render extraction:

```txt
StageSceneSnapshot
StageProjection
StoryBrowserAdapterPlan.stage
BrowserAdapterReadback.stage
GameHostStoryDiagnostics.stage
stage_scene_snapshot fixture row
stage_projection fixture row
browser_adapter_readback fixture row
```
