# Next steps: The Unmapped House WebGL context and stage recovery

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

Add an application-owned context lifecycle around `StageKit` before attempting broad renderer refactoring. The first implementation slice should expose presentation readiness, stop unsafe frame and interaction work on loss, show a DOM fallback, and recover one complete stage generation behind a typed result.

## Plan ledger

**Goal:** make WebGL loss recoverable without corrupting story truth, mixing resource generations or resuming interaction before a valid frame is visible.

- [ ] Add stable `SurfaceId`, `ContextGeneration`, `StageResourceGeneration` and `RecoveryAttemptId` values.
- [ ] Add `webglcontextlost` and `webglcontextrestored` listeners owned by a lifecycle adapter.
- [ ] Normalize browser events into typed lifecycle events.
- [ ] Retain and retire one RAF/render-submission lease.
- [ ] Publish presentation readiness independently from story readiness.
- [ ] Add a DOM-only fallback that does not depend on WebGL.
- [ ] Suspend canvas and DOM stage-dependent commands during loss and recovery.
- [ ] Preserve current story state and scene identity without advancing progression.
- [ ] Define a complete stage-resource manifest.
- [ ] Extract candidate construction from live adoption.
- [ ] Prepare renderer, target, shader, geometry, hotspot, camera, light and viewport candidates.
- [ ] Compile, allocate and submit one recovery probe.
- [ ] Atomically adopt all successor resources or dispose every candidate.
- [ ] Publish `WebGLStageRecoveryResult`.
- [ ] Resume exactly one render-submission generation.
- [ ] Publish `FirstRecoveredStageFrameAck` before retiring the fallback.
- [ ] Add source, production-artifact and Pages browser fixtures.

## Ordered implementation

### 1. Own the browser events

Attach listeners to the renderer canvas through one disposable lifecycle adapter. Record the current surface and context generation. Reject duplicate and stale events.

### 2. Retire unsafe work on loss

```txt
accepted context loss
  -> prevent default when restoration is intended
  -> retire current render-submission lease
  -> set presentation readiness to Lost
  -> suspend stage-dependent input
  -> show DOM fallback
  -> retain story truth and current scene
```

### 3. Declare the resource graph

The manifest must include:

```txt
renderer and canvas
context capabilities
main scene and stage group
camera and lights
scene background and fog
layer and prop geometry
stage shader materials
hotspot geometry, materials and bindings
offscreen render target
post scene, camera, plane and material
viewport and DPR
render-submission ownership
```

### 4. Prepare detached successors

Move scene resource construction into pure or detached builders that return preparation receipts and disposal closures. Do not mutate the live graph during preparation.

### 5. Probe before adoption

The probe must validate renderer submission, target completeness, shader compilation, current scene rendering, post sampling and viewport compatibility.

### 6. Adopt or roll back atomically

Adopt only when every required participant and the probe succeed against the current scene and viewport revisions. On failure, dispose candidates, keep fallback visible and keep interaction suspended.

### 7. Prove the first frame

`FirstRecoveredStageFrameAck` must cite:

```txt
surface ID
context generation
stage resource generation
scene ID and descriptor revision
viewport revision
render-submission generation
frame sequence
fallback-retirement receipt
```

## Required fixtures

```txt
loss before first frame
loss after first frame
loss in each scene
loss while interlude is open
loss during resize and DPR change
loss while hovering or clicking a hotspot
DOM inspection attempted during loss
canvas inspection attempted during loss
continue attempted during loss
repeated and stale context events
shader, target and geometry preparation failure
probe failure
successful recovery
failed recovery with stable fallback
bounded retry
pagehide during recovery
source, production artifact and Pages origins
```

## Do not combine yet

Keep save admission, durable save commit/reset, scene-transition composition, viewport policy, provider admission, hotspot semantics and normal stage disposal as bounded authorities. Recovery consumes their accepted identities and receipts but does not replace their policies.