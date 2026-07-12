# Scene resource retirement and frame-loop gap

Timestamp: `2026-07-12T01-41-56-04-00`

## Summary

The renderer keeps submitting frames while scene replacement drops ownership of predecessor resources.

## Plan ledger

**Goal:** prove that every visible frame uses one active resource generation and that predecessor GPU resources retire only after the first successor frame is accepted.

- [x] Trace constructor allocations and frame submission.
- [x] Trace scene replacement.
- [x] Identify undisposed resources.
- [ ] Implement resource inventories and frame acknowledgements.

## Current path

```txt
StageKit constructor
  -> renderer + canvas
  -> scene + groups + lights
  -> multisampled render target
  -> post material + plane geometry
  -> recursive RAF

loadScene()
  -> stageGroup.clear()
  -> hotspots = []
  -> materials = []
  -> allocate successor resources
```

## Gap

Three.js `Group.clear()` removes children but does not dispose mesh geometry or material. The code then discards the arrays that could enumerate predecessor hotspot and shader resources. The recursive RAF continues throughout replacement without a scene-resource generation or commit boundary.

## Missing frame evidence

A frame currently cites none of:

```txt
runtimeSessionId
sessionGeneration
sceneResourceGeneration
storyRevision
narrativeRevision
surfaceRevision
contextGeneration
retirementRevision
```

## Required render contract

```txt
build successor resources off active authority
  -> validate complete inventory
  -> install successor generation
  -> submit first successor frame
  -> acknowledge accepted frame
  -> retire predecessor generation
  -> publish disposal receipts
```

## Required resource inventory

```txt
stage meshes and geometries
stage shader materials
hotspot meshes, geometries and materials
post plane geometry and material
render target and texture
renderer and canvas
listener and RAF leases
```

## Proof gate

Repeat A -> B -> C -> A-style fixture loads and verify live resource counts remain bounded, predecessor resources report disposal exactly once, and no frame after retirement cites a retired generation.
