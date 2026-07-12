# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Summary

The newest documented gap is completion-timer generation and stale callback rejection. The 450 ms interlude timeout is scheduled without retaining its handle or freezing the scene and completion proof that authorized it. The callback reads mutable `currentScene`, so a predecessor timer can act on a successor scene or overwrite terminal copy.

## Plan ledger

**Goal:** keep delayed-work identity, lease ownership, cancellation, transition barriers and callback admission explicit.

- [x] Trace the final-hotspot completion path.
- [x] Confirm `setTimeout()` return value is discarded.
- [x] Confirm the callback references mutable `currentScene`.
- [x] Confirm `nextScene()` does not cancel or invalidate the callback.
- [x] Confirm terminal projection does not establish a timer barrier.
- [x] Define fixture and browser proof gaps.
- [ ] Implement and execute the completion-timer authority.

## Scheduling gaps

```txt
schedule command id: absent
timer id: absent
timer generation: absent
timeout handle retention: absent
expected scene id: absent
completion proof id: absent
runtime session id: absent
transition revision: absent
modal generation: absent
due-time observation: absent
typed schedule result: absent
```

## Cancellation and barrier gaps

```txt
scene-transition cancellation: absent
terminal-route cancellation: absent
reset cancellation: absent
session-stop cancellation: absent
idempotent cancel result: absent
live timer inventory: absent
callback fence: absent
transition timer barrier: absent
terminal timer barrier: absent
```

## Callback-admission gaps

```txt
immutable callback context: absent
expected-versus-observed scene comparison: absent
completion-proof revalidation: absent
transition-revision comparison: absent
modal-state comparison: absent
cancelled timer rejection: absent
stale callback rejection: absent
exactly-once lease retirement: absent
typed fired/rejected result: absent
```

## Concrete risks

```txt
predecessor completion timer can open successor interlude
successor scene can appear complete before any successor inspection
stage B can be visible while timer A projects B interlude copy
final terminal copy can be overwritten by delayed final-scene interlude copy
a future reset or restart path can inherit callbacks unless explicitly fenced
timer behavior cannot be correlated with persisted story or visible frames
```

## Retained upstream and downstream gaps

```txt
StoryManifest and StorySnapshot authorities remain unimplemented
storage revision and cross-tab convergence remain unimplemented
canvas and side-panel input parity remains unimplemented
inspection/completion proof remains unimplemented
modal focus and Continue admission remain unimplemented
Atomic Continue transaction remains unimplemented
narrative projection remains unrevisioned
runtime callback and scene-resource lifecycle remains unimplemented
render-surface and WebGL context generations remain unimplemented
committed-frame diagnostics remain unimplemented
```

## Validation gaps

- `npm run check` is syntax-only.
- No fake-clock fixture captures or advances the 450 ms timer.
- No fixture transitions before the due time.
- No fixture proves a cancelled timer cannot mutate the interlude.
- No terminal fixture proves prototype-complete copy remains stable.
- No browser smoke verifies event-loop ordering and scene/interlude parity.
- No timer observation cites the visible frame produced by an admitted callback.

## Completion boundary

Do not claim delayed-interlude correctness because the normal path usually waits 450 ms. Completion requires immutable timer context, retained cancellable leases, transition and terminal barriers, stale callback rejection, typed results and executable event-loop proof.