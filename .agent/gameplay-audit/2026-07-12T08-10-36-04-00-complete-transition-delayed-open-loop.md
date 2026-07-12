# Gameplay audit: Complete, Transition, Delayed Open Loop

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Plan ledger

**Goal:** ensure delayed completion presentation cannot advance or disclose a scene outside the progression proof that scheduled it.

- [x] Trace the normal completion loop.
- [x] Trace transition-before-delay behavior.
- [x] Trace final-scene terminal behavior.
- [ ] Add deterministic fake-clock and browser fixtures.

## Normal loop

```txt
inspect all three required hotspots
  -> scene completion becomes true
  -> log completion
  -> schedule 450 ms callback
  -> wait
  -> open current scene interlude
  -> Continue to successor
```

## Unsafe loop

```txt
complete scene A
  -> schedule timer A
  -> transition before timer A fires
  -> commit scene B
  -> timer A reads mutable currentScene as B
  -> B interlude opens
  -> player receives B completion copy without B inspections
```

## Final-scene loop

```txt
final scene timer is pending
  -> terminal route writes Prototype complete
  -> pending timer fires
  -> normal final-scene interlude copy replaces terminal copy
```

## Gameplay consequences

```txt
completion pacing is not deterministic
successor completion presentation can be disclosed early
route, stage, narrative and modal ownership can disagree
terminal outcome is not stable
replay cannot explain which completion admitted the interlude
```

## Required gameplay result

```txt
DelayedCompletionResult
  sceneId
  completionProofId
  timerId
  timerGeneration
  transitionRevision
  status
  openedInterlude
  rejectedReason
```

Completion requires zero successor or terminal mutation from predecessor timers.