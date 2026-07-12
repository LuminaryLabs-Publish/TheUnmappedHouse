# Stage lifecycle audit: Resource Lease, Dispose and Stop Contract

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

StageKit needs one explicit owner for scene resources, persistent post resources, browser callbacks and the RAF loop.

## Plan ledger

**Goal:** define exact ownership and terminal results before adding disposal calls ad hoc.

- [x] Classify scene-scoped and stage-scoped resources.
- [x] Define lease and retirement rules.
- [x] Define idempotent stop behavior.
- [ ] Implement and test.

## Resource classes

### Scene-scoped

```txt
stage group
layer geometries and shader materials
prop geometries and shader materials
hotspot geometries and transparent materials
hotspot descriptor bindings
base camera descriptor
scene post-uniform values
hovered descriptor and label state
```

### Stage-scoped

```txt
WebGLRenderer and canvas
scene, camera, lights and raycaster
multisampled render target
post scene, camera, material and fullscreen geometry
clock and pointer state
resize, mousemove and click listeners
RAF loop
```

## Lease rules

```txt
each allocation enters exactly one ResourceLease
shared resources declare shared ownership explicitly
candidate leases are isolated from active leases
commit transfers candidate leases atomically
rollback disposes candidate leases only
retirement disposes predecessor leases exactly once
repeated retirement returns already-retired, not another dispose
```

## Stop contract

```txt
StageStopCommand(stageSessionId, expectedGeneration, reason)
  -> reject new loads and input
  -> cancel retained RAF
  -> remove retained listeners
  -> retire active scene leases
  -> retire post and target leases
  -> dispose renderer
  -> detach canvas under declared policy
  -> publish StageStopResult
```

`StageStopResult` must list stopped callbacks, retired resource IDs, disposal failures, retained exceptions and final stage state. A repeated stop must return an idempotent terminal result.

## Observation contract

```txt
StageLifecycleObservation
  stageSessionId
  stageGeneration
  activeSceneId
  activeResourceSetId
  activeResourceRevision
  listenerLeaseCount
  rafState
  sceneLeaseCount
  persistentLeaseCount
  lastLoadResultId
  lastRetirementResultId
  lastVisibleFrameId
  stageState
```
