# Render audit: Atomic scene commit and resource lifecycle gap

Timestamp: `2026-07-10T20-38-24-04-00`

## Current render path

```txt
StageKit constructor
  -> WebGLRenderer
  -> Scene + stageGroup
  -> PerspectiveCamera
  -> directional + hemisphere lights
  -> WebGLRenderTarget
  -> post Scene + orthographic camera
  -> post ShaderMaterial + fullscreen plane
  -> anonymous listeners
  -> recursive RAF

loadScene(scene)
  -> stageGroup.clear()
  -> reset hotspots/materials arrays
  -> mutate background/fog/camera/post uniforms
  -> create layers directly in live group
  -> create props directly in live group
  -> create hotspot volumes directly in live group
```

## Resource accounting

```txt
scene one: 2 layers + 5 props + 3 hotspots = 10 meshes
scene two: 2 layers + 4 props + 3 hotspots = 9 meshes
scene three: 2 layers + 4 props + 3 hotspots = 9 meshes
complete route: 28 scene-local meshes created
persistent post mesh: 1
```

Each scene-local mesh owns at least one geometry and one material. Anime materials are stored in `this.materials`, but hotspot materials are not. On transition, `Group.clear()` detaches prior children and `this.materials = []` discards the only explicit anime-material list. No disposal call is made.

## Atomicity gap

The live stage is destroyed before replacement preparation completes. Failures during material, geometry or mesh creation can expose:

```txt
empty stage
partial stage
new camera with old/partial geometry
new post settings with failed scene construction
lost previous resource references
```

The runtime has no rollback path because the previous group and its ownership ledger are not retained as a transaction candidate.

## Required transaction

```txt
validate request
  -> build pure plan
  -> prepare detached group and scene-local ledger
  -> verify prepared counts against plan
  -> swap committed group/camera/fog/post atomically
  -> increment stage epoch
  -> reset hover/pick state
  -> acknowledge commit
  -> dispose retired ledger
```

Failure path:

```txt
validation or preparation fails
  -> dispose only the failed candidate ledger
  -> preserve previous committed group and epoch
  -> return typed failure
```

## Persistent host resources

These require explicit host ownership:

```txt
renderer
renderer canvas
render target and texture
post plane geometry
post shader material
post mesh
post scene
lights
RAF handle
resize handler
mousemove handler
click handler
```

## Required readback

```txt
running
paused
disposed
stageEpoch
committedSceneId
sourceRevision
liveSceneResourceCounts
persistentResourceCounts
cumulativeDisposedCounts
lastBuildResult
lastCommitResult
lastDisposalResult
journal
```

All readback must be JSON-safe. Raw Three.js objects should remain private to the adapter.

## Visual preservation

The first implementation must not alter:

```txt
shader source
material presets
camera values
fog values
post parameters
parallax multipliers
shadow settings
render-target sequencing
fixed 16:9 framing
```
