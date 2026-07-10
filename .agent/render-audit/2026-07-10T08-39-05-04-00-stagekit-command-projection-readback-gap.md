# Render audit: StageKit command projection readback gap

Timestamp: `2026-07-10T08-39-05-04-00`

## Render surface

The repo has a visual surface through `src/stage-kit.js` and Three.js `0.160.0` from CDN.

```txt
StageKit constructor
  -> creates WebGLRenderer
  -> creates scene/camera/lights/render target/post scene
  -> installs resize, mousemove, and click listeners
  -> starts requestAnimationFrame loop
```

## Descriptor consumption

`StageKit.loadScene(sceneData)` consumes:

```txt
sceneData.backgroundColor
sceneData.fog
sceneData.camera
sceneData.stage.layers
sceneData.stage.props
sceneData.hotspots
sceneData.post
```

It creates:

```txt
THREE.Scene background/fog
PerspectiveCamera baseCamera
stageGroup meshes
shader materials
transparent hotspot volumes
post-process uniforms
```

## Current readback

There is no stable serialized render readback. The current observable outputs are browser/renderer side effects:

```txt
canvas pixels
hover label DOM state
onHotspot callback
internal StageKit fields
post shader uniforms
current scene object reference
```

## Gap

Story commands and render consumption are not linked. A hotspot click can call `inspectHotspot(hotspot)`, but there is no row saying:

```txt
command id
source scene id
source hotspot id
preflight outcome
story result id
projection id
stage-load intent id
StageKit scene-load acceptance
hotspot-volume count
post uniform snapshot
hover/pick readback
```

## Required render proof rows

```txt
StageSceneLoadIntent
StageSceneLoadReadback
StageHotspotVolumeReadback
StagePostUniformReadback
StagePickReadback
StageHoverProjectionReadback
StoryProjectionToStageLoadRow
```

## Finding

Do not rewrite `StageKit` first. Keep it stable and add an additive adapter/readback seam around scene loads and hotspot picking after source-owned story command results exist.

## Validation target

A DOM-free fixture should be able to prove that a story command result creates the expected projection/stage-load intents. Browser smoke can follow after that, but it should not be the first proof gate.
