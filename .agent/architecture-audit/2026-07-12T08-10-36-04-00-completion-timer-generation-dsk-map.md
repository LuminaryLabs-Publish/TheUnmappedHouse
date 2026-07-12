# Architecture audit: Completion Timer Generation DSK Map

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Plan ledger

**Goal:** place delayed interlude scheduling behind one parent domain with atomic timer, transition and modal contracts.

- [x] Identify current timer ownership.
- [x] Identify upstream completion and downstream modal/transition dependencies.
- [x] Define atomic kits and coordinating transaction.
- [x] Define stale-work and retirement invariants.
- [ ] Implement and validate.

## Current architecture

```txt
inspection mutation
  -> sceneComplete(currentScene)
  -> raw setTimeout
  -> mutable currentScene binding
  -> showInterlude(scene)
  -> direct DOM mutation
```

The raw browser timer is embedded in `browser-story-runtime-kit`. It has no command, result, identity, lease, observation or barrier contract.

## Required parent domain

```txt
the-unmapped-house-completion-timer-generation-authority-domain
```

## Composition

```txt
the-unmapped-house-completion-timer-generation-authority-domain
  -> completion-delay-policy-kit
  -> completion-timer-id-kit
  -> completion-timer-generation-kit
  -> completion-schedule-command-kit
  -> completion-schedule-admission-kit
  -> completion-callback-context-kit
  -> completion-timer-lease-kit
  -> completion-timer-cancel-kit
  -> scene-transition-timer-barrier-kit
  -> terminal-route-timer-barrier-kit
  -> runtime-stop-timer-barrier-kit
  -> stale-completion-callback-rejection-kit
  -> completion-timer-scheduled-result-kit
  -> completion-timer-cancelled-result-kit
  -> completion-timer-fired-result-kit
  -> interlude-open-intent-kit
  -> completion-timer-observation-kit
  -> completion-timer-journal-kit
  -> delayed-interlude-fixture-kit
  -> transition-before-delay-fixture-kit
  -> terminal-before-delay-fixture-kit
  -> browser-timer-order-smoke-kit
```

## Upstream inputs

```txt
runtimeSessionId
sceneId
sceneGeneration
completionProofId
completionRevision
transitionRevision
modalGeneration
requestedDelayMs
monotonic scheduledAtMs
```

## Immutable callback context

```txt
CompletionCallbackContext
  timerId
  timerGeneration
  runtimeSessionId
  sceneId
  sceneGeneration
  completionProofId
  completionRevision
  transitionRevision
  expectedModalState
  delayMs
  scheduledAtMs
  dueAtMs
```

## State machine

```txt
ABSENT
  -> SCHEDULED
  -> FIRED_ADMITTED
  -> RETIRED

SCHEDULED
  -> CANCELLED
  -> RETIRED

SCHEDULED
  -> FIRED_REJECTED_STALE
  -> RETIRED
```

No transition may return to `SCHEDULED`. Retirement is exactly once and idempotent.

## Schedule transaction

```txt
ScheduleInterludeCommand
  -> validate session and scene generation
  -> validate current unconsumed completion proof
  -> validate no equivalent live timer exists
  -> clamp delay through completion-delay-policy-kit
  -> allocate timer id and generation
  -> freeze callback context
  -> create and retain browser timeout lease
  -> publish CompletionTimerScheduledResult
```

## Barrier transaction

```txt
scene transition / terminal route / reset / stop
  -> enumerate live timer leases
  -> classify compatibility with successor ownership
  -> clearTimeout for incompatible timers
  -> mark generation cancelled
  -> publish CompletionTimerCancelledResult
  -> retire lease exactly once
```

## Fire transaction

```txt
browser callback
  -> resolve timer lease by id and generation
  -> compare frozen and current session identities
  -> compare scene and transition revisions
  -> verify completion proof remains current and unconsumed
  -> verify modal admission state
  -> reject stale/cancelled work with zero mutation
  -> otherwise emit InterludeOpenIntent
  -> route through modal authority
  -> publish CompletionTimerFiredResult
  -> retire lease exactly once
```

## Domain boundaries

```txt
Inspection and Completion Authority
  owns completion proof creation

Completion Timer Generation Authority
  owns delayed-work identity, timing and callback admission

Modal Focus and Continue Admission Authority
  owns interlude open state and focus behavior

Atomic Continue Transition Authority
  owns successor scene commit and predecessor timer barrier

Runtime Lifecycle Authority
  owns session stop and global callback fencing

Committed Frame Authority
  owns first visible frame acknowledgement
```

## Required invariants

```txt
no callback reads mutable global scene as authority
no predecessor timer can open successor modal
no terminal route retains scene-interlude timers
no cancelled timer can mutate story, DOM or persistence
no timer lease retires twice
no timer result exposes mutable internal references
no visible interlude frame lacks timer and modal provenance
```
