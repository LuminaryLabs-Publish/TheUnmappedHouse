# Transition audit: Story, save, stage and first-frame contract

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Define the commit line and rollback policy for the complete Continue transaction.

## Transaction state machine

```txt
idle
  -> admitted
  -> preparing
  -> prepared
  -> persisting
  -> persisted
  -> swapping
  -> stage_committed
  -> awaiting_first_frame
  -> committed_visible
```

Failure states:

```txt
rejected
prepare_failed
save_failed
commit_failed
rolled_back
recovery_required
```

## Commit authority

The authoritative transition result is not `committed_visible` until all required facts align:

```txt
candidate StorySnapshot durably accepted
target stage bundle is live
story revision matches target revision
stage epoch matches target epoch
DOM scene id matches target scene
hotspot binding set matches target scene
camera and post policy match target scene
one rendered frame carries the target revisions
previous stage resources are retired or queued under explicit policy
```

## Rollback boundary

Before durable persistence:

```txt
discard candidate snapshot
dispose candidate stage resources
retain old story, DOM and live stage
```

After durable persistence but before stage swap:

```txt
either restore the prior save revision
or mark recovery-required and deterministically resume target commit
```

After live stage swap but before first frame:

```txt
retain enough previous-stage state for the declared rollback window
or commit forward and expose recovery-required
```

The product must choose one policy and fixture it. Silent partial success is not acceptable.

## Resource retirement rule

Retire the previous stage only after the new stage swap succeeds. Dispose every resource once and record:

```txt
stageEpoch
geometryCount
materialCount
meshCount
hotspotCount
disposedCount
alreadyDisposedCount
failureCount
```

## Observation

Expose a bounded JSON-safe transition state through the existing debug projection:

```txt
activeTransition
lastTransitionResult
storyRevision
saveRevision
stageEpoch
firstVisibleFrameId
pendingInterludeLease
liveResourceCounts
retiredResourceCounts
```

Do not expose live Three.js objects.

## Required fixture gate

```txt
transition-state-machine-valid
all-rejections-zero-mutation
all-precommit-failures-retain-old-state
candidate-resources-disposed-on-failure
durable-save-and-stage-swap-correlated
first-frame-receipt-correlated
retirement-counts-exact
terminal-commit-idempotent
journal-bounded-and-json-safe
```
