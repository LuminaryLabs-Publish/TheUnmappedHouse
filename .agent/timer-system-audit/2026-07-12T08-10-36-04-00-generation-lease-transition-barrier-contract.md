# Timer-system audit: Generation, Lease and Transition Barrier Contract

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Plan ledger

**Goal:** make every delayed callback owned, cancellable, generation-checked and exactly-once retired.

- [x] Define timer lease identity.
- [x] Define compatible and incompatible ownership changes.
- [x] Define cancellation and stale-fire behavior.
- [x] Define observation and journal limits.
- [ ] Implement and execute.

## Timer lease

```txt
CompletionTimerLease
  timerId
  timerGeneration
  browserHandle
  runtimeSessionId
  sceneId
  sceneGeneration
  completionProofId
  transitionRevision
  modalGeneration
  scheduledAtMs
  dueAtMs
  state
  retiredAtMs
```

The browser handle remains private. Public observations expose stable ids and timing metadata only.

## Lease states

```txt
scheduled
cancelled
fire-admitted
fire-rejected-stale
retired
```

## Transition barrier

Before successor scene commit:

```txt
identify all predecessor-scene timer leases
clear browser handles
increment or invalidate timer generation
publish cancellation results
retire leases
only then commit successor scene ownership
```

## Terminal barrier

Before terminal projection:

```txt
cancel every scene-interlude timer
commit terminal route revision
reject any callback citing an older transition revision
publish terminal timer-barrier result
```

## Runtime barrier

Reset, page teardown and runtime stop invalidate the callback fence before removing listeners, resources or public host state.

## Observation

```txt
CompletionTimerObservation
  liveCount
  scheduledCount
  cancelledCount
  firedAdmittedCount
  firedRejectedCount
  oldestLiveAgeMs
  nextDueAtMs
  lastResult
```

Observations must be detached, immutable and JSON-safe. Journal retention must declare maximum rows, bytes and age.

## Invariants

```txt
one browser handle belongs to one lease
one lease belongs to one runtime session
one completion proof admits at most one equivalent live lease
cancel and fire cannot both mutate state
retirement occurs exactly once
stale callback rejection occurs before DOM mutation
terminal state admits no scene-interlude timer
```
