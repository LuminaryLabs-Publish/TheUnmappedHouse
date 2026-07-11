# Resource lifecycle audit: Three.js disposal contract

Timestamp: `2026-07-10T20-38-24-04-00`

## Current ownership problem

Three.js GPU resources are created in several methods but ownership is not modeled:

```txt
constructor
  -> renderer
  -> render target + texture
  -> post geometry/material/mesh

animeMaterial
  -> ShaderMaterial

createLayer
  -> PlaneGeometry + ShaderMaterial + Mesh

createProp
  -> Box/Plane/CylinderGeometry + ShaderMaterial + Mesh

createHotspot
  -> BoxGeometry + MeshBasicMaterial + Mesh
```

`loadScene()` clears object membership but never disposes these resources. The material array tracks only anime shader materials and is reset before retirement cleanup.

## Ownership classes

### Persistent host ledger

```txt
renderer
render target and owned texture
post plane geometry
post shader material
post mesh
canvas ownership
listener handles
RAF handle
```

Lifetime: StageKit host construction through final host disposal.

### Committed scene ledger

```txt
scene root group
all layer geometries
all prop geometries
all hotspot geometries
all anime materials
all hotspot materials
all future scene-local textures
all scene-local meshes
```

Lifetime: successful scene commit through retirement by the next successful commit or final host disposal.

### Candidate scene ledger

Same resource classes as a committed scene ledger, but detached and temporary.

Lifetime:

```txt
prepare begins
  -> commit succeeds: candidate becomes committed ledger
  -> prepare fails: candidate ledger disposed immediately
```

## Disposal order

Scene ledger:

```txt
detach root
  -> traverse owned objects
  -> dispose unique geometries
  -> dispose unique materials
  -> dispose unique textures not owned elsewhere
  -> clear references and counts
  -> mark disposed
```

Persistent ledger:

```txt
cancel RAF
  -> remove listeners
  -> dispose committed/candidate ledgers
  -> dispose post geometry/material
  -> dispose render target
  -> dispose renderer
  -> remove owned canvas
  -> mark host disposed
```

## Idempotency rules

- Every ledger has a stable id and lifecycle state.
- Resource identity is de-duplicated before disposal.
- The first disposal returns counts and `disposed=true`.
- Later disposal calls return `no_op=true` with zero new disposals.
- A disposed host rejects new build, commit, resize, pick and frame requests.
- A failed candidate never becomes the committed ledger.
- A committed ledger is retired only after a replacement commit succeeds.

## Required resource result

```json
{
  "ledgerId": "scene-ledger-0002",
  "sceneId": "repeating-hallway",
  "stageEpoch": 2,
  "geometryCount": 9,
  "materialCount": 9,
  "textureCount": 0,
  "objectCount": 9,
  "disposedGeometryCount": 9,
  "disposedMaterialCount": 9,
  "disposedTextureCount": 0,
  "duplicateReferencesSkipped": 0,
  "disposed": true,
  "noOp": false
}
```

## Required proof

A full three-scene route must prove:

```txt
one persistent host ledger
one committed scene ledger after each successful load
zero leaked retired scene ledgers
candidate cleanup on injected failure
exact scene-one retirement counts
exact scene-two retirement counts
scene-three cleanup on host disposal
persistent resources disposed once
second host disposal performs no new work
```
