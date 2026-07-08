# Stage GameHost Readback Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T11-28-38-04-00`

## Render surface

The repo has a visual/render surface.

Current route:

```txt
index.html
  -> src/game.js
  -> new StageKit({ root, hoverLabel, onHotspot })
  -> src/stage-kit.js
  -> Three.js CDN renderer
```

## Current render ownership

`StageKit` currently owns:

```txt
Three.js import
renderer creation
pixel ratio
shadow map setup
scene
group
camera
raycaster
directional and hemisphere lights
WebGLRenderTarget
post-process scene
post-process shader material
resize handling
pointer movement
click handling
anime shader material
scene loading
layer meshes
prop meshes
invisible hotspot volumes
hover label projection
parallax camera sway
material time uniforms
render target pass
screen post pass
```

## Story-to-render seam

Current story-to-render flow:

```txt
src/game.js
  -> currentScene from src/story-data.js
  -> stage.loadScene(currentScene)
  -> StageKit creates layers, props, hotspot meshes, camera, fog, post uniforms
  -> StageKit clickHotspot sends hotspot object back into inspectHotspot
```

The render host is usable, but it cannot yet be inspected from a stable source snapshot.

## Required readback surface

The next implementation should expose these facts through pure snapshots and additive diagnostics:

```txt
current scene id
scene title
camera position/lookAt/fov
layer count
prop count
hotspot count
hotspot ids
required clue count
grantable clue count
post settings
latest command result
latest completion result
latest transition result
fixture summary
```

## GameHost projection target

Additive target:

```js
window.GameHost = {
  getState() {
    return {
      game: "The Unmapped House",
      source: StorySourceSnapshot,
      story: StoryStateSnapshot,
      stage: StageSceneSnapshot,
      latestResult: StoryCommandResult,
      journals: {
        commands: CommandJournalSummary,
        route: RouteJournalSummary
      },
      fixtures: FixtureSummary
    };
  }
}
```

Do not remove existing UI projection.

Do not make StageKit depend on `window.GameHost`.

The projection should consume the same pure snapshot/result helpers as fixture replay.

## Render risk

Do not touch shader, camera, mesh, material, or post-process internals until story replay is fixture-safe.

Renderer extraction should happen after the story authority gate passes.

## Acceptance readback

A valid next pass should be able to show:

```txt
GameHost.stage.sceneId === current story scene
GameHost.stage.hotspotIds contains every currentScene.hotspots id
GameHost.stage.requiredClues matches currentScene.requiresToComplete
GameHost.latestResult.reason is stable
GameHost.fixtures.failed === 0 after fixture script passes
```

## Deferred render work

```txt
StageKit descriptor validation inside renderer
separate camera kit
separate material kit
separate post-process kit
separate hotspot picking kit
larger prop vocabulary
accessibility hit-area visualization
browser screenshot smoke
```
