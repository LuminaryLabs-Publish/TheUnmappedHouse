# Interaction audit: Listener, timeout, and generation map

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Route every browser callback through one current runtime-session generation and make every callback lease removable, cancellable, and observable.

## Current callback ingress

| Ingress | Registration | Current ownership | Retirement |
|---|---|---|---|
| Side-panel hotspot click | Per-button closure in `renderUi()` | DOM button | Removed only when button DOM is replaced. |
| Canvas mousemove | Anonymous listener in `StageKit` constructor | Renderer canvas | No retained handler; cannot remove directly. |
| Canvas click | Anonymous listener in `StageKit` constructor | Renderer canvas | No retained handler; cannot remove directly. |
| Window resize | Anonymous listener in `StageKit` constructor | Global window | No retained handler; cannot remove directly. |
| Keyboard reset | Anonymous global listener in `src/game.js` | Module/page | No retained handler; cannot remove directly. |
| Interlude callback | Anonymous 450 ms timeout | Browser timer queue | Handle is not retained or cancelled. |
| Render frame | Recursive anonymous RAF callback | Browser frame queue | Handle is not retained or cancelled. |
| Continue | Button listener referencing `nextScene` | DOM button/module | No session-generation admission. |

## Main finding

The runtime has callback capability but no callback lease authority. Handlers do not carry a session id or generation, so even a future `stop()` flag would not prove that already queued callbacks cannot mutate or render.

## Required callback envelope

```txt
callbackLeaseId
sessionId
sessionGeneration
source
registeredAtRevision
registeredAtStageEpoch
status
firedCount
cancelledAtRevision
retirementReason
```

## Required admission

Every callback must begin with:

```txt
is runtime session running?
is callback generation current?
is source still enabled?
is expected story/stage revision current?
```

Rejected stale callbacks must return or journal a typed no-op without touching state, DOM, Three.js resources, persistence, or frame scheduling.

## Required interaction changes

- Store named handler functions for resize, mousemove, canvas click, keydown, and Continue.
- Register handlers through `listener-lease-kit`.
- Store the RAF id before the callback may recurse.
- Store the interlude timeout id and completion-proof identity.
- Cancel timeout and RAF leases during stop.
- Remove all exact listener tuples during stop or dispose.
- Fence `renderUi()` button closures with session generation and story revision.
- Disable new Continue/inspection admission while stopping or transitioning.
- Publish detached callback-lease diagnostics.

## Fixture rows

```txt
resize-listener-removed-on-stop
mousemove-listener-removed-on-stop
canvas-click-listener-removed-on-stop
keydown-listener-removed-on-stop
continue-listener-disabled-during-stop
pending-interlude-timeout-cancelled
queued-stale-interlude-callback-no-op
pending-raf-cancelled
queued-stale-raf-callback-does-not-recurse
old-button-closure-cannot-mutate-new-generation
listener-retirement-idempotent
callback-diagnostics-json-safe
```