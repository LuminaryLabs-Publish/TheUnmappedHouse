# Deploy audit: Scene Lifecycle Browser Fixture Gate

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

Syntax checks and a successful static deployment cannot prove scene-resource retirement, rollback, callback shutdown or visible-frame correlation.

## Plan ledger

**Goal:** block lifecycle-readiness claims until local and Pages browser matrices pass.

- [x] Record current syntax and deployment boundaries.
- [x] Define required fixture rows.
- [ ] Implement fixtures.
- [ ] Execute local browser matrix.
- [ ] Execute Pages matrix.

## Required fixture rows

```txt
boot scene 1
scene 1 -> scene 2
scene 2 -> scene 3
same-scene reload
rapid duplicate Continue
candidate geometry failure
candidate material failure
first-frame failure
stale scene-load command
hover active during transition
stop before first frame
stop after terminal copy
repeated stop
pagehide/navigation stop
```

## Required assertions

```txt
active scene remains intact during preparation
rollback restores predecessor
unique resources dispose once
candidate resources dispose on failure
hover state clears
RAF stops
listeners are removed
renderer and target retire
result objects are detached and JSON-safe
visible frame cites committed resource revision
local and Pages behavior match
```

## Existing boundary

```txt
npm run check: syntax only
browser lifecycle fixture: unavailable
Pages lifecycle fixture: unavailable
disposal instrumentation: unavailable
renderer-info sampling: unavailable
```
