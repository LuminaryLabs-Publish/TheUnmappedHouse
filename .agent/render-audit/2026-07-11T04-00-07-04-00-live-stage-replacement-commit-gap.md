# Render audit: live stage replacement commit gap

Timestamp: `2026-07-11T04-00-07-04-00`

## Current replacement behavior

`StageKit.loadScene(sceneData)` immediately:

```txt
sets sceneData
clears stageGroup
empties hotspot and material arrays
changes background and fog
changes base camera
creates layers, props and hotspots directly in the live group
changes post-process uniforms
```

## Failure surface

The previous stage is removed before the replacement is validated or complete. Any exception during camera, geometry, material, prop or hotspot construction leaves the renderer with a blank or partially built stage.

There is no:

```txt
stage build plan
resource acquisition ledger
prepare result
atomic group swap
rollback group
stage commit id
stage epoch
first-frame acknowledgement
rendered scene fingerprint
```

## Resource retirement gap

`stageGroup.clear()` detaches old objects but does not dispose their geometries or materials. Resetting `this.materials = []` also discards the references used by the animation loop without releasing the underlying GPU resources.

The hotspot meshes contain invisible box geometry and materials that are likewise detached without disposal.

## Required render contract

```txt
prepareScene(sceneDescriptor)
  -> validate descriptor
  -> build detached THREE.Group
  -> collect geometries, materials and hotspot meshes
  -> return StagePreparationResult

commitPreparedScene(preparation, transitionId)
  -> swap committed group atomically
  -> update camera, fog and post state
  -> increment stageEpoch
  -> return StageCommitResult

acknowledgeFirstFrame(stageCommitId)
  -> prove the committed group rendered
  -> retire and dispose the previous group
```

## Required observations

```txt
sceneId
storyRevision
transitionId
stageEpoch
stageCommitId
resourceCounts
preparedAt
committedAt
firstFrameId
retiredStageEpoch
disposedResourceCounts
```

All observations must be JSON-safe and detached from Three.js objects.

## Guardrail

Do not replace the renderer or redesign shaders. The required change is transaction ownership around the existing StageKit output.