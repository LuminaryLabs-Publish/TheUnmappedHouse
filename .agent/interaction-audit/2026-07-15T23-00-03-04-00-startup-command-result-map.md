# Interaction audit: startup command and result map

**Timestamp:** `2026-07-15T23-00-03-04-00`

## Summary

Startup currently has no command surface. Page navigation implicitly begins work, browser exceptions implicitly terminate it, and the user receives neither a stable status nor a retry action.

## Plan ledger

**Goal:** define one user-visible startup interaction contract from initial navigation through readiness, failure, and retry.

- [x] Identify implicit producers and consumers.
- [x] Define startup and retry commands.
- [x] Define terminal result statuses.
- [x] Define stale and duplicate handling.
- [ ] Implement and test the contract.

## Command map

```txt
DocumentNavigation
  -> StartupAttemptCommand
     attemptId
     documentGeneration
     expected provider identity
     startup deadline

StartupRetryInteraction
  -> StartupRetryCommand
     failedAttemptId
     current documentGeneration
     retry policy

PageHide or replacement
  -> StartupRetireCommand
     current attemptId
     reason
```

## Result map

```txt
StartupReady
StartupFailedModuleGraph
StartupFailedProviderUnavailable
StartupFailedProviderRejected
StartupFailedWebGLUnavailable
StartupFailedStageConstruction
StartupFailedStoryBootstrap
StartupFailedScenePreparation
StartupFailedFirstFrameTimeout
StartupRejectedDuplicate
StartupRejectedStale
StartupSuperseded
StartupRetired
StartupFailedUnknown
```

## Projection policy

- Pending: expose authored progress/status without making story controls active.
- Ready: activate controls only after `FirstPresentedStoryFrameAck`.
- Recoverable failure: expose reason, Retry, and preserved-save status.
- Unsupported graphics capability: expose a stable non-retry explanation unless capability can change.
- Superseded or retired attempt: publish no late visible mutation.

## Correlation requirement

Every visible status must cite `StartupAttemptId`, `DocumentGeneration`, and terminal result revision. Retry must create a new attempt identity rather than reusing mutable state from the failed attempt.