# Lifecycle authority audit: Session generation and disposal contract

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Specify the canonical state machine and result contracts for starting, stopping, resetting, and disposing The Unmapped House runtime.

## Session state machine

```txt
created
  -> starting
  -> running
  -> stopping
  -> stopped
  -> disposing
  -> disposed

any non-disposed state
  -> failed
  -> stopping or disposing by recovery policy
```

## RuntimeSession snapshot

```js
{
  sessionId,
  generation,
  status,
  createdAt,
  startedAt,
  stoppedAt,
  disposedAt,
  storyRevision,
  sceneId,
  stageEpoch,
  activeFrameLeaseId,
  activeInterludeLeaseId,
  listenerLeaseCount,
  liveResourceCounts,
  lastLifecycleResult,
  lastFrameId
}
```

The public snapshot must be detached, immutable, bounded, and JSON-safe.

## Stop request

```js
{
  requestId,
  sessionId,
  expectedGeneration,
  reason,
  requestedAt
}
```

Admission results:

```txt
accepted
already_stopping
already_stopped
already_disposed
stale_generation
unknown_session
failed
```

## Disposal sequence

```txt
admit request
  -> transition to disposing
  -> retire current generation
  -> cancel RAF lease
  -> cancel timeout leases
  -> remove listener leases
  -> reject new interaction commands
  -> retire current scene resource graph
  -> dispose scene geometries and materials
  -> dispose render target
  -> dispose post geometry and material
  -> dispose renderer
  -> remove canvas
  -> optionally request WebGL context loss
  -> clear owned references
  -> publish counts and failures
  -> transition to disposed
```

## Disposal result

```js
{
  requestId,
  sessionId,
  generation,
  status,
  reason,
  before: {
    frameLeaseCount,
    timeoutLeaseCount,
    listenerLeaseCount,
    geometryCount,
    materialCount,
    renderTargetCount,
    rendererCount
  },
  after: {
    frameLeaseCount,
    timeoutLeaseCount,
    listenerLeaseCount,
    geometryCount,
    materialCount,
    renderTargetCount,
    rendererCount
  },
  retiredStageEpochs,
  rendererDisposed,
  canvasRemoved,
  contextRetirementStatus,
  failures
}
```

Statuses:

```txt
disposed
already_disposed
partially_disposed
stale_generation
failed
```

## Reset transaction

The current `KeyR` reload should become:

```txt
ResetStory request
  -> admit current session/generation
  -> stop and dispose active runtime session
  -> clear or replace admitted persistence through typed result
  -> create next session generation
  -> load initial StorySnapshot
  -> prepare and commit initial stage epoch
  -> acknowledge first frame
  -> publish reset result
```

The page may still reload after a successful disposal receipt, but lifecycle correctness must not depend on browser destruction.

## Idempotency rules

- Repeated stop does not remove or dispose twice.
- Repeated dispose returns `already_disposed` with zero new counts.
- A stale-generation request cannot affect the current session.
- Resource disposal errors are collected and do not prevent best-effort retirement of independent resources.
- A failed full disposal reports every remaining live resource.

## Required journal rows

```txt
session-created
session-started
frame-lease-started
listener-lease-added
interlude-lease-scheduled
stage-epoch-committed
stage-epoch-retired
session-stop-admitted
session-generation-retired
frame-lease-cancelled
timeout-lease-cancelled
listeners-retired
resources-disposed
renderer-disposed
session-disposed
session-disposal-failed
```

## Fixture gate

```txt
start-stop-dispose-happy-path
stop-before-start
stop-twice
dispose-twice
stale-generation-stop-rejected
stale-generation-dispose-rejected
partial-resource-disposal-failure-reported
reset-creates-new-generation
old-generation-callbacks-no-op
zero-live-resource-count-after-dispose
journal-bounded-and-json-safe
```