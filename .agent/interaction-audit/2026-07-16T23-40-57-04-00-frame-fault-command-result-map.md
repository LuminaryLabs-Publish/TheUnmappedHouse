# Interaction audit: frame fault command/result map

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Current path

```txt
RAF callback
  -> requests successor
  -> executes frame work directly
  -> success has no typed receipt
  -> throw has no typed receipt
```

## Required commands

### `FrameAttemptCommand`

```txt
commandId
runtimeGeneration
frameGeneration
sceneGeneration
rendererGeneration
targetGeneration
expectedPhasePlanRevision
frameTime
```

### `FrameFaultSettlementCommand`

```txt
faultId
failedPhase
causeClass
retryable
occurrenceCount
retryBudgetRevision
expectedRuntimeGeneration
```

### `FrameRecoveryCommand`

```txt
recoveryId
faultId
expectedRetiredGeneration
replacementRendererGeneration?
resumePolicy
idempotencyKey
```

## Required results

```txt
FrameAttemptCompleted
FrameAttemptRejectedStale
FrameAttemptFailedCamera
FrameAttemptFailedMaterial
FrameAttemptFailedSceneRender
FrameAttemptFailedPostRender
FrameFaultRetryScheduled
FrameFaultRuntimeRetired
FrameFaultDuplicateCollapsed
FrameFaultRetryBudgetExhausted
SafeFaultProjected
FrameRecoveryAccepted
FrameRecoveryRejectedStale
FrameRecoveryFailed
FirstSafeFaultFrameAcknowledged
FirstRecoveredFrameAcknowledged
```

## Admission rules

1. Only the active runtime generation may admit a frame attempt.
2. A failed frame cannot schedule unlimited immediate successors.
3. A retired generation rejects pointer, inspection and route commands.
4. Duplicate fault evidence settles once.
5. Recovery must bind the accepted story and scene revisions.
6. A recovered runtime is not ready until one matching frame is acknowledged.

The current runtime exposes none of these commands or results.