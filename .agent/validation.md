# Validation: The Unmapped House

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Summary

This run changed documentation only. Source inspection proves that scene completion schedules `setTimeout(() => showInterlude(currentScene), 450)`, discards the timeout handle, captures no immutable scene/proof context, and installs no cancellation or stale-callback guard around scene transitions or terminal projection.

## Plan ledger

**Goal:** distinguish a visually delayed interlude from a generation-safe, cancellable and transition-aware completion callback.

- [x] Inspect completion derivation and timeout scheduling.
- [x] Confirm the timeout handle is discarded.
- [x] Confirm the arrow callback resolves mutable `currentScene` at fire time.
- [x] Inspect scene transition and terminal projection.
- [x] Confirm no transition, terminal, reset or session timer barrier exists.
- [x] Confirm current package validation is syntax-only.
- [x] Document required pure timer and browser fixtures.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
completion is derived from required clues
completion schedules a 450 ms setTimeout callback
timeout return value is not assigned
callback calls showInterlude(currentScene)
currentScene is a mutable module binding
nextScene mutates currentScene
nextScene hides the interlude
nextScene replaces stage resources
nextScene persists successor state
nextScene does not cancel pending completion timeouts
terminal copy has no durable terminal-state guard
showInterlude performs no scene or proof admission
```

## Existing checks prove

```txt
src/aspect-frame.js parses
src/game.js parses
src/stage-kit.js parses
src/story-data.js parses
```

## Existing checks do not prove

```txt
timer identity or generation
timeout handle retention
immutable callback context
scene-transition cancellation
terminal-route cancellation
reset or stop cancellation
stale callback rejection
exactly-once timer retirement
successor interlude parity
terminal-copy stability
event-loop ordering
visible-frame correlation
```

## Change boundary

```txt
runtime source changed: no
story content changed: no
timer behavior changed: no
modal behavior changed: no
transition behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
```

## Required fixtures

```txt
fixture:completion-schedules-one-timer
fixture:timer-context-freezes-scene
fixture:timer-context-cites-completion-proof
fixture:transition-before-due-cancels-timer
fixture:stale-callback-rejected
fixture:cancelled-timer-zero-mutation
fixture:successor-interlude-remains-closed
fixture:terminal-copy-not-overwritten
fixture:reset-cancels-live-timers
fixture:session-stop-cancels-live-timers
fixture:duplicate-cancel-idempotent
fixture:fired-timer-retires-once
fixture:timer-observation-detached
fixture:timer-journal-bounded
smoke:browser-transition-before-delay
smoke:browser-terminal-before-delay
smoke:pages-timer-order
```

## Current result

```txt
completion timer authority implemented: no
retained timer lease proven: no
transition cancellation proven: no
stale callback rejection proven: no
terminal-copy stability proven: no
browser event-loop parity proven: no
```

No delayed-interlude ordering, timer cancellation, stale-callback safety or terminal-projection stability claim is made.