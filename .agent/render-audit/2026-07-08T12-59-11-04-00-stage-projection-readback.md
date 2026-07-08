# Render Audit: Stage Projection Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T12-59-11-04-00`

## Render surface

The repo has a visual/render surface.

Current route:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> Three.js CDN
```

## Current StageKit read

`StageKit` owns:

```txt
Three.js renderer
fixed 16:9 viewport sizing
PerspectiveCamera
Raycaster
DirectionalLight and HemisphereLight
WebGLRenderTarget
post-process shader pass
anime shader material
stage layer geometry
stage prop geometry
invisible hotspot volume geometry
pointer hover projection
hotspot click picking
parallax camera offset
animation loop
```

## Render-linked story problem

The renderer can display hotspot volumes and call `onHotspot`, but no render-independent snapshot proves which scene descriptor was loaded.

There is also no GameHost projection for:

```txt
active stage scene id
camera descriptor
layer count
prop count
hotspot count
post-process settings
hovered hotspot id
last clicked hotspot id
story command result
story projection
```

## Stage snapshot target

Add a DOM-free `StageSceneSnapshot` that reads story descriptors, not Three.js objects.

Suggested shape:

```txt
{
  sceneId,
  title,
  camera: { position, lookAt, fov },
  post,
  counts: {
    layers,
    props,
    hotspots,
    requiredClues
  },
  hotspotIds,
  grantableClues,
  requiredClues,
  descriptorWarnings
}
```

## GameHost projection target

Keep `window.GameHost` additive and read-only.

Suggested target:

```txt
window.GameHost = {
  getState() {
    return {
      game: "The Unmapped House",
      route: "index.html -> src/game.js",
      story: StoryProjection,
      stage: StageSceneSnapshot,
      latestCommand: StoryCommandResultSummary,
      validation: FixtureSummary
    }
  }
}
```

## Render acceptance rows

```txt
stage snapshot includes active scene id
stage snapshot includes camera descriptor
stage snapshot counts layers, props, and hotspots
stage snapshot exposes hotspot ids without Three.js
stage snapshot exposes required clue ids
stage snapshot detects duplicate hotspot ids
stage snapshot detects required clues that no hotspot can grant
GameHost projection includes stage snapshot
GameHost projection remains additive and does not replace current debug JSON
```

## Do not change yet

```txt
Do not rewrite shader materials.
Do not change the fixed 16:9 frame.
Do not change hotspot pick volumes.
Do not replace StageKit before story authority fixtures are stable.
Do not change the public route or GitHub Pages deployment path.
```
