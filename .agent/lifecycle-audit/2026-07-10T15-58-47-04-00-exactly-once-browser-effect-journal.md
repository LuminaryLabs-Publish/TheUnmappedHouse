# Lifecycle audit: exactly-once browser effect journal

Timestamp: `2026-07-10T15-58-47-04-00`

## Current effect execution

| Effect | Current trigger | Current state/readback |
|---|---|---|
| Story copy projection | `inspectHotspot()` / `renderUi()` | Direct DOM mutation only |
| Hotspot button projection | `renderUi()` | Recreated DOM nodes, no observation |
| Debug projection | `renderUi()` | Aggregate JSON only |
| Interlude scheduling | Scene completion | Anonymous 450 ms timer |
| Interlude opening | Timer callback | DOM class and aria mutation |
| Interlude closing | `nextScene()` | DOM class and aria mutation |
| Stage load | Boot / `nextScene()` | Direct `StageKit.loadScene()` call |
| Save write | Boot / inspect / advance | Direct localStorage write |
| Save clear | KeyR | Direct localStorage remove |
| Page reload | KeyR | Direct location reload |
| Terminal projection | Final continue | Direct DOM copy only |

## Core gap

Effects are executed inline and are not idempotent by a stable effect id. The authority cannot determine whether an effect was requested, applied, skipped, duplicated, failed, or replayed after save restoration.

## Effect journal contract

```txt
StoryEffectIntent
  effectId
  transactionId
  kind
  payload
  idempotencyKey
  required

StoryEffectReadback
  readbackId
  effectId
  adapter
  status: applied | skipped | failed
  resultSummary
  errorCode?

StoryEffectJournal
  pending[]
  acknowledged[]
  failed[]
```

## Exactly-once keys

```txt
interlude schedule: scene-complete/<sceneId>
interlude open: interlude-open/<sceneId>
stage load: stage-load/<sceneId>/<stateId>
save write: save-write/<stateId>
terminal projection: terminal/<stateId>
reset clear: reset-clear/<commandId>
reload: reload/<commandId>
```

## Lifecycle rules

- Authority appends effect intents but does not touch DOM, timers, storage, location, or Three.js.
- Browser adapters acknowledge effects after execution.
- Duplicate effect ids are skipped with an explicit readback.
- Required effect failure leaves the lifecycle transaction incomplete or recoverable.
- `completion_pending` becomes `interlude_open` only after the open effect is acknowledged.
- `advancing` becomes `exploring` only after stage-load, projection, and required save readbacks.
- `terminal` is a story state before terminal copy is projected.
- Save restoration reconciles pending effects rather than blindly replaying every browser operation.

## Timer adapter

The interlude delay should be represented as:

```txt
schedule_interlude intent
  -> timer adapter registers one timer by idempotency key
  -> timer fires
  -> timer readback applied
  -> open_interlude intent
  -> DOM adapter applies class/aria changes
  -> open readback applied
  -> lifecycle commits interlude_open
```

The timer handle must be retained so reset, scene disposal, or source invalidation can cancel it with a readback.

## Required fixture rows

```txt
completion-creates-one-schedule-intent
duplicate-schedule-skipped
timer-applied-creates-open-intent
open-readback-commits-interlude-state
stage-load-failure-retains-advancing-state
save-failure-observed
terminal-state-before-terminal-projection
reset-cancels-pending-timer
replay-does-not-duplicate-applied-effects
```

## Next safe lifecycle cut

Build the pure effect journal and fake adapters first. Keep current browser adapters as thin consumers until parity is proven.