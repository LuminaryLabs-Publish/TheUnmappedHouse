# Lifecycle audit: stage resource retirement contract

Timestamp: `2026-07-11T04-00-07-04-00`

## Current ownership gap

The current StageKit owns renderer, render target, post-process geometry/material, scene groups, per-scene geometry/materials, hotspot meshes, RAF recursion and browser listeners. It exposes no `dispose()` and no resource ledger.

During scene replacement:

```txt
stageGroup.clear()
materials = []
hotspots = []
```

This detaches resources without proving release.

## Required lifecycle states

```txt
prepared
committed
rendered
retiring
disposed
failed
```

## Required resource ledger

For each prepared or committed stage:

```txt
stageEpoch
stageCommitId
sceneId
geometries
materials
hotspotGeometries
hotspotMaterials
objectCount
createdAt
firstFrameId
retiredAt
disposedAt
disposalErrors
```

The implementation may retain live handles internally, but public diagnostics must contain counts and ids only.

## Retirement rule

The previous committed stage is not disposed until the replacement stage has produced its first accepted frame. If replacement fails before that point, the prior stage remains committed and renderable.

## Terminal disposal

`StageKit.dispose()` must be idempotent and own:

```txt
cancel RAF
remove resize listener
remove pointer and click listeners
dispose committed and prepared stage resources
dispose post geometry and material
dispose render target
dispose renderer
remove canvas
clear hover state
reject future load/pick/animate operations
```

## Required lifecycle fixtures

```txt
prepare-discard-releases-all-candidate-resources
commit-first-frame-retires-prior-stage-once
failed-commit-keeps-prior-stage-alive
duplicate-dispose-is-safe
remount-has-one-canvas-one-raf-one-listener-set
resource-ledger-is-bounded-and-json-safe
```