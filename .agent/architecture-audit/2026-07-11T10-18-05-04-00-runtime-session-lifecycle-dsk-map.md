# Architecture audit: Runtime session lifecycle DSK map

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Define one authoritative runtime-session boundary that owns browser callbacks, Three.js resources, scene generations, stop/dispose semantics, and detached lifecycle observations.

## Current architecture

```txt
src/game.js module lifetime
  -> owns mutable story state and unretained interlude timeouts
  -> constructs one StageKit

StageKit constructor
  -> creates renderer, render target, post scene, camera, lights, geometries, and materials
  -> registers resize, mousemove, and click listeners
  -> starts a recursive RAF immediately

StageKit.loadScene
  -> clears the live group
  -> discards scene-material tracking
  -> creates replacement geometry, materials, and hotspot meshes

page reload
  -> relies on browser process/page teardown
  -> exposes no explicit stop/dispose result
```

## Authority gaps

- No `RuntimeSession` identity or monotonic session generation.
- No explicit lifecycle states such as `created`, `running`, `stopping`, `stopped`, `disposing`, `disposed`, or `failed`.
- RAF handles are not retained, cancelled, or generation-fenced.
- Browser listener functions are anonymous and cannot be removed.
- Interlude timeout handles are not retained, cancelled, or tied to a scene/session generation.
- Scene resources are not inventoried by scene or stage epoch.
- `stageGroup.clear()` detaches without disposing.
- Scene material references are discarded before retirement.
- Long-lived renderer, target, post geometry, post material, and WebGL context have no teardown path.
- Stop and dispose cannot be proven idempotent.
- No structured lifecycle result or bounded journal exists.

## Required parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-domain
```

## DSK composition

### `runtime-session-authority-kit`

Owns the current session id, generation, lifecycle state, active stage epoch, and all child leases.

Services:

- `createSession(config)`
- `startSession(sessionId)`
- `stopSession(sessionId, reason)`
- `disposeSession(sessionId, reason)`
- `getSessionSnapshot()`

### `runtime-session-generation-kit`

Issues monotonic generations and rejects stale callback work.

Services:

- `nextGeneration()`
- `isCurrentGeneration(generation)`
- `retireGeneration(generation, reason)`

### `frame-loop-lease-kit`

Owns one RAF handle and prevents recursive callbacks after stop.

Services:

- `startFrameLoop(callback, generation)`
- `cancelFrameLoop(reason)`
- `getFrameLeaseSnapshot()`

### `listener-lease-kit`

Stores exact target/type/function/options tuples for removal.

Services:

- `addListenerLease(target, type, handler, options)`
- `removeListenerLease(leaseId)`
- `retireAllListeners()`

### `interlude-timeout-lease-kit`

Owns the 450 ms timeout and correlates it to session, scene, completion proof, and generation.

Services:

- `scheduleInterlude(receipt)`
- `cancelInterlude(reason)`
- `getInterludeLeaseSnapshot()`

### `stage-resource-inventory-kit`

Records each geometry, material, mesh, group, target, and renderer allocation by session and stage epoch.

Services:

- `registerResource(resource, metadata)`
- `listResources(filter)`
- `markRetired(resourceId, reason)`
- `getResourceCounts()`

### `scene-resource-retirement-kit`

Retires the previous committed scene only after the replacement scene is committed.

Services:

- `sealSceneResources(stageEpoch)`
- `retireSceneResources(stageEpoch, reason)`
- `getRetirementReceipt(stageEpoch)`

### `three-resource-disposal-kit`

Calls the correct idempotent disposal path for geometries, materials, textures, targets, and custom graphs.

Services:

- `disposeGeometry(resource)`
- `disposeMaterial(resource)`
- `disposeTexture(resource)`
- `disposeRenderTarget(resource)`
- `disposeResourceGraph(root)`

### `renderer-disposal-kit`

Retires renderer-owned resources and the canvas binding.

Services:

- `disposeRenderer()`
- `removeCanvas()`
- `getRendererDisposalResult()`

### `webgl-context-retirement-kit`

Optionally requests context loss after renderer disposal when the whole session is retired.

Services:

- `retireContext(reason)`
- `getContextRetirementResult()`

### `idempotent-session-stop-kit`

Ensures repeated stop/dispose requests return deterministic no-op or already-disposed results.

Services:

- `admitStopRequest(request)`
- `admitDisposeRequest(request)`
- `getLastLifecycleResult()`

### `session-disposal-result-kit`

Returns a JSON-safe result with counts and failures.

Required fields:

```txt
sessionId
generation
requestId
status
reason
cancelledFrameCount
removedListenerCount
cancelledTimeoutCount
disposedGeometryCount
disposedMaterialCount
disposedTargetCount
rendererDisposed
contextRetired
remainingResourceCount
failures
```

### `lifecycle-journal-kit`

Retains bounded start, stop, disposal, failure, and resource-count rows.

### `lifecycle-fixture-kit`

Executes deterministic lifecycle scenarios in Node-compatible fakes.

### `browser-teardown-smoke-kit`

Proves that the real browser session stops frame work, removes listeners, cancels timeouts, disposes resources, and leaves no old-session callbacks.

## Required lifecycle sequence

```txt
create session
  -> register all listener/frame/timeout/resource leases
  -> start current generation
  -> load and commit stage epoch
  -> run frames only while generation is current

scene transition
  -> prepare and commit successor stage epoch
  -> retire and dispose predecessor scene resources

session stop
  -> mark stopping
  -> retire generation
  -> cancel RAF
  -> cancel timeouts
  -> remove listeners
  -> stop new interaction admission
  -> mark stopped

session dispose
  -> dispose all remaining scene resources
  -> dispose render target and post resources
  -> dispose renderer
  -> remove canvas
  -> optionally retire WebGL context
  -> publish disposal result
  -> mark disposed
```

## Invariants

- At most one active RAF lease exists per runtime session.
- No callback may mutate or render after its generation is retired.
- Every registered listener is removed exactly once or reported as failed.
- Every timeout is either fired under the admitted generation or cancelled.
- Every scene resource belongs to exactly one stage epoch.
- A committed successor stage is visible before predecessor resources are retired.
- Disposal is idempotent.
- Remaining live resource count is zero after successful full disposal.
- Lifecycle snapshots and results are detached, JSON-safe values.

## Validation rows

```txt
single-active-frame-loop
stop-cancels-pending-raf
stale-frame-callback-rejected
all-listeners-removed
interlude-timeout-cancelled-on-stop
old-scene-resources-disposed-after-successor-commit
failed-successor-keeps-old-scene-resources-live
scene-material-list-not-lost-before-disposal
render-target-and-post-resources-disposed
renderer-disposed-and-canvas-removed
context-retirement-result-explicit
dispose-idempotent
repeated-stop-is-typed-no-op
zero-live-resources-after-full-dispose
lifecycle-journal-json-safe-and-bounded
```