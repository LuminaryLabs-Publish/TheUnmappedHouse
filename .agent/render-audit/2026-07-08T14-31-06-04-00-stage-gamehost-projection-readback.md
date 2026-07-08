# Stage + GameHost Projection Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T14-31-06-04-00`

## Goal

Preserve the current fixed-camera StageKit render path while adding pure readback contracts for stage descriptors, story projection, save projection, interlude projection, and GameHost diagnostics.

## Current render authority

`src/stage-kit.js` owns the render surface:

```txt
Three.js CDN import
fixed 1920x1080 design frame
WebGL renderer
PerspectiveCamera
DirectionalLight + HemisphereLight
stageGroup scene root
WebGLRenderTarget
post-process shader pass
anime material shader
stage layer meshes
stage prop meshes
transparent hotspot volume meshes
pointer normalization
raycast picking
hover label projection
click dispatch
animation loop
```

## Current host projection

`src/game.js` owns story UI projection directly:

```txt
title.textContent = currentScene.title
text.textContent = currentScene.openingText or hotspot.text
hotspotList rebuilds DOM buttons from currentScene.hotspots
debug.textContent = JSON.stringify({ game, scene, clues, route, inspected, complete, latest })
interlude DOM is opened directly by showInterlude(scene)
localStorage is written directly by saveState()
```

## Projection gap

The renderer does not need a visual rewrite.

The missing layer is readback and projection authority:

```txt
StageSceneSnapshot
StoryProjection
SaveProjection
InterludeProjection
GameHostStoryDiagnostics
```

## Required StageSceneSnapshot fields

```txt
sceneId
title
camera.position
camera.lookAt
camera.fov
backgroundColor
fog
layerCount
propCount
hotspotCount
hotspotIds
completionRequirements
post.grain
post.vignette
post.chromatic
post.distortion
post.memory
descriptorWarnings[]
descriptorErrors[]
```

## Required StoryProjection fields

```txt
sceneId
sceneTitle
bodyText
hotspotButtons[]
notebookEntries[]
complete
route[]
clues[]
latestCommandId
latestReason
latestStatus
```

## Required SaveProjection fields

```txt
saveKey
intent: write | clear | none
payload
reason
commandId
```

## Required InterludeProjection fields

```txt
state: open | closed | unchanged
title
text
reason
commandId
suggestedDelayMs
```

## Required GameHost diagnostics

`window.GameHost.getState()` should become additive and read-only:

```txt
{
  game: "The Unmapped House",
  route: "index.html -> src/game.js",
  story: {
    sceneId,
    clues,
    route,
    inspected,
    complete,
    latestResult,
    commandJournalSize,
    routeJournalSize
  },
  stage: StageSceneSnapshot,
  projection: StoryProjection,
  save: SaveProjection,
  interlude: InterludeProjection,
  fixture: {
    available,
    lastRunStatus,
    caseCount,
    failureCount
  }
}
```

## Render preservation rule

Do not change shader materials, camera descriptors, stage descriptors, hotspot geometry, fixed aspect framing, hover behavior, or visual composition in the first reducer-host pass.

The only browser-visible difference allowed is additional diagnostics.

## Next validation target

After source implementation, verify that:

```txt
stage_scene_snapshot fixture passes
story_projection fixture passes
save_projection fixture passes
interlude_projection fixture passes
GameHost_projection fixture passes
browser still shows the same first room and hotspot behavior
```
