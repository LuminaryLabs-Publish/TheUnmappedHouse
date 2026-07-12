# Interaction audit: Completion Schedule, Cancel and Fire Result Map

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Plan ledger

**Goal:** replace raw timeout side effects with explicit commands and typed results.

- [x] Identify command ingress points.
- [x] Define schedule, cancel and fire results.
- [x] Define rejection reasons.
- [ ] Implement adapters and fixtures.

## Command map

```txt
SceneCompletionProof
  -> ScheduleInterludeCommand
  -> CompletionTimerScheduledResult

SceneTransitionCommand
TerminalRouteCommand
ResetCommand
RuntimeStopCommand
  -> CancelCompletionTimersCommand
  -> CompletionTimerCancelledResult

BrowserTimeoutFire
  -> AdmitCompletionTimerFireCommand
  -> CompletionTimerFiredResult
     or CompletionTimerRejectedResult
```

## Schedule result

```txt
CompletionTimerScheduledResult
  commandId
  timerId
  timerGeneration
  runtimeSessionId
  sceneId
  sceneGeneration
  completionProofId
  transitionRevision
  delayMs
  dueAtMs
  status
  reason
```

## Cancel result

```txt
CompletionTimerCancelledResult
  commandId
  timerId
  timerGeneration
  cancelSource
  expectedSceneId
  successorSceneId
  status
  alreadyRetired
  reason
  resolvedAtMs
```

## Fire result

```txt
CompletionTimerFiredResult
  timerId
  timerGeneration
  expectedSceneId
  observedSceneId
  completionProofId
  expectedTransitionRevision
  observedTransitionRevision
  modalGeneration
  status
  openInterludeCommandId
  reason
  resolvedAtMs
```

## Rejection reasons

```txt
runtime-session-mismatch
scene-generation-mismatch
transition-revision-mismatch
completion-proof-stale
completion-proof-consumed
timer-cancelled
timer-already-retired
modal-state-incompatible
terminal-route-active
```

Every rejection must produce zero story, DOM, persistence, stage or modal mutation.