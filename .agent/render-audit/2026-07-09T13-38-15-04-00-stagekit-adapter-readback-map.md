# StageKit Adapter Readback Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-38-15-04-00`

## Render surface summary

The repo has a visual/render surface.

The render path is `index.html -> src/game.js -> src/stage-kit.js`.

`StageKit` creates a Three.js WebGL renderer, fixed 16:9 camera, shader material, render target, post-process scene, raycaster, invisible hotspot volumes, hover label, resize behavior, and animation loop.

## Current renderer services

```txt
WebGL renderer creation
fixed 1920x1080 design frame support
pixel ratio clamp
shadow map setup
scene and stage group setup
perspective camera setup
raycaster setup
directional + hemisphere lighting
render target setup
post-process shader pass
anime material construction
scene descriptor loading
layer mesh creation
prop mesh creation
hotspot volume creation
pointer hover handling
raycast click picking
resize and aspect frame application
continuous material time update
render-to-target then post-scene render
```

## Descriptor consumption

Current StageKit consumes:

```txt
scene.backgroundColor
scene.fog
scene.camera.position
scene.camera.lookAt
scene.camera.fov
scene.stage.layers[]
scene.stage.props[]
scene.hotspots[]
scene.post.grain
scene.post.vignette
scene.post.chromatic
scene.post.distortion
scene.post.memory
```

## Missing readback

There is no renderer-facing readback contract for:

```txt
loaded scene id
camera descriptor consumed
layer count consumed
prop count consumed
hotspot count consumed
post-process values consumed
viewport frame
pixel ratio
hovered hotspot id
last clicked hotspot id
render target size
last render timestamp
material count
unsupported descriptor fields
fallback geometry fields
```

## Required next proof kits

```txt
stage-scene-snapshot-kit
stage-descriptor-consumption-kit
stage-renderer-readback-kit
browser-adapter-plan-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
```

## Do not do next

Do not rewrite the renderer or extract StageKit into a shared package before readback proves what the current renderer consumes.
