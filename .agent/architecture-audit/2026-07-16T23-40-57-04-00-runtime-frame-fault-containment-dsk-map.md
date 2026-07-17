# Architecture audit: runtime frame fault containment DSK map

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Summary

The frame loop currently combines scheduling, camera projection, material animation, scene rendering and post presentation inside one untyped method. The successor callback is scheduled before those phases, so failure cannot settle the current generation before more work is admitted.

## Current ownership

```txt
StageKit.constructor
  -> renderer and render-target creation
  -> event listeners
  -> animate()

StageKit.animate
  -> successor RAF scheduling
  -> camera parallax
  -> material clocks
  -> scene target render
  -> post render
```

## Required parent domain

`the-unmapped-house-runtime-frame-fault-containment-backoff-authority-domain`

## DSK breakdown

| Surface | Ownership |
|---|---|
| `frame-attempt-command-kit` | Admit one frame against exact runtime and renderer generations. |
| `frame-generation-kit` | Allocate and retire frame-loop identity. |
| `frame-phase-plan-kit` | Define ordered camera, material, scene and post phases. |
| `frame-phase-execution-kit` | Execute named phases and retain bounded evidence. |
| `frame-attempt-result-kit` | Publish complete, rejected or failed frame outcomes. |
| `frame-fault-classifier-kit` | Classify phase, cause, retryability and severity. |
| `frame-fault-deduplication-kit` | Collapse repeated identical failures into bounded records. |
| `frame-retry-budget-kit` | Cap retries for one fault and runtime generation. |
| `frame-retry-backoff-kit` | Delay repeated work and prevent per-RAF fault storms. |
| `runtime-retirement-kit` | Stop callbacks and retire stale interaction/resource generations. |
| `interaction-suspension-kit` | Reject input while the visible runtime is faulted. |
| `renderer-health-kit` | Classify renderer, target and context health. |
| `stage-resource-settlement-kit` | Retire or replace stage resources exactly once. |
| `safe-fault-projection-kit` | Project a bounded public failure state. |
| `restart-command-kit` | Admit an explicit restart against the faulted generation. |
| `frame-recovery-result-kit` | Publish replacement/resume settlement. |
| `first-safe-fault-frame-ack-kit` | Acknowledge the first safe failure frame. |
| `runtime-frame-fault-browser-fixture-kit` | Inject phase failures and assert bounded behavior. |
| `source-artifact-pages-frame-fault-parity-fixture-kit` | Prove equivalent source, artifact and deployed behavior. |

## Command/result flow

```txt
FrameAttemptCommand
  -> FramePhasePlan
  -> FrameAttemptResult

FrameAttemptFailed
  -> FrameFaultSettlementCommand
  -> FrameFaultSettlementResult
  -> RetryScheduled | RuntimeRetired

RuntimeRetired
  -> SafeFaultProjectionCommand
  -> FirstSafeFaultFrameAck

RestartRequested
  -> FrameRecoveryCommand
  -> FrameRecoveryResult
  -> FirstRecoveredFrameAck
```

## Invariants

1. A frame generation has at most one live successor callback.
2. A failed phase publishes one terminal attempt result.
3. Persistent failures cannot run at display refresh rate indefinitely.
4. Retired generations cannot accept pointer, save, scene or renderer work.
5. Recovery replaces or resumes resources exactly once.
6. A safe public frame is acknowledged before restart is offered as ready.

No runtime surface implements this map yet.