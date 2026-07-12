# Deploy audit: Completion Timer Order Fixture Gate

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Plan ledger

**Goal:** block timer-order correctness claims until deterministic unit, browser and deployed-route evidence exists.

- [x] Inspect current package checks.
- [x] Identify missing timer fixtures.
- [x] Define local and Pages proof rows.
- [ ] Implement and run the gate.

## Existing validation

`npm run check` performs Node syntax checks for four JavaScript files. It does not create a DOM, run browser timers, advance a fake clock, transition scenes or inspect visible interlude state.

## Required deterministic fixtures

```txt
completion-schedules-one-retained-timer
callback-freezes-scene-and-proof
transition-before-due-cancels-predecessor
cancelled-callback-zero-mutation
stale-callback-rejected-before-projection
successor-interlude-remains-closed
terminal-copy-remains-stable
reset-cancels-live-timers
runtime-stop-cancels-live-timers
duplicate-cancel-idempotent
lease-retires-exactly-once
timer-observation-detached
timer-journal-bounded
```

## Required browser matrix

```txt
Chromium desktop
Firefox desktop
WebKit desktop

normal completion and wait
transition at 0 ms before due
transition at 200 ms before due
transition immediately before due
terminal projection before due
reload/reset before due
background-tab throttling before due
```

## Required deployed proof

```txt
load GitHub Pages route
complete scene A
capture scene, route and timer observation
transition before 450 ms
wait beyond due time
verify scene B interlude remains closed
verify rejected/cancelled result
repeat on final scene
verify Prototype complete copy remains unchanged
capture screenshot and visible-frame receipt
```

## Gate

Do not claim completion pacing, successor interlude safety, terminal stability or deployment readiness until all fixture rows and the deployed timer-order smoke pass with source revision, browser version, route, timestamp and artifact references.