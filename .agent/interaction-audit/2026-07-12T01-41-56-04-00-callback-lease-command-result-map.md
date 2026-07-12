# Callback lease command/result map

Timestamp: `2026-07-12T01-41-56-04-00`

## Plan ledger

**Goal:** make every browser callback an admitted, revocable capability bound to one runtime session generation.

- [x] Inventory callback sources.
- [x] Identify missing lease and generation metadata.
- [x] Define command/result mapping.
- [ ] Implement callback adapters and stale-work fixtures.

## Current callbacks

| Source | Current behavior | Missing authority |
|---|---|---|
| RAF | Recursively schedules itself. | Request id, running state, session generation, cancellation result. |
| `resize` | Anonymous closure calls `resize()`. | Retained function, lease id, removal receipt. |
| `mousemove` | Bound inline to canvas. | Lease, disposed-state admission, pointer sample id. |
| `click` | Uses ambient pointer and inline closure. | Lease, activation coordinates, session/resource generation. |
| Continue button | Calls `nextScene`. | Session, scene and transition preconditions. |
| Keyboard | Reloads on `KeyR`. | Lifecycle command, admission and result. |
| Completion timeout | Calls `showInterlude(scene)`. | Timer id, cancellation, session/scene generation fence. |

## Required envelope

```txt
CallbackObservation
  callbackLeaseId
  callbackKind
  runtimeSessionId
  sessionGeneration
  expectedLifecycleRevision
  expectedSceneId
  expectedSceneResourceGeneration
  payload
```

## Required results

```txt
accepted
rejected-stale-session
rejected-stale-generation
rejected-stopping
rejected-disposed
cancelled
duplicate
failed
```

## Removal order

Cancel RAF and timeouts first, then remove input/resize listeners, then dispose scene and renderer resources. This prevents callbacks from touching resources while retirement is in progress.
