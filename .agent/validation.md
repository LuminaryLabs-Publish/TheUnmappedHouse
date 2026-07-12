# Validation: The Unmapped House

Timestamp: `2026-07-12T01-41-56-04-00`

## Summary

This was a documentation-only Runtime Session Lifecycle and Scene Resource Retirement audit. Runtime, gameplay, rendering, dependencies, package scripts and deployment configuration were not changed.

## Plan ledger

**Goal:** define executable evidence that proves callback isolation, ordered disposal, scene-resource retirement, restart idempotence and frame cessation.

- [x] Record the current syntax-only validation boundary.
- [x] Define session, callback, timer, resource-generation, disposal and restart fixture rows.
- [x] Define a deployed browser lifecycle smoke sequence.
- [x] Update `.agent/kit-registry.json` with the implemented and proposed kit inventory.
- [x] Push repo-local documentation to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and execute the validation gate.

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
runtime lifecycle fixture: unavailable
scene resource retirement fixture: unavailable
stale callback fixture: unavailable
restart idempotence fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
central internal change log: complete
```

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not create a WebGL renderer, submit RAF work, install and remove listeners, fire timers, transition scenes, inspect Three.js resource disposal or restart the runtime.

## Required commands

```txt
node scripts/validate-runtime-lifecycle.mjs
node scripts/validate-scene-resource-retirement.mjs
node scripts/validate-stale-callback-fencing.mjs
node scripts/validate-runtime-restart-idempotence.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:lifecycle
```

## Required fixture rows

### Session and startup

```txt
session-id-required
session-generation-monotonic
lifecycle-state-valid
one-ready-session
partial-startup-reverse-rollback
failed-start-does-not-publish-ready
```

### Callback ownership

```txt
one-live-raf-lease
stop-cancels-next-frame
resize-listener-retired
pointer-listener-retired
click-listener-retired
continue-listener-retired
keyboard-listener-retired
timeout-retired
stale-generation-callback-rejected
disposed-session-callback-rejected
```

### Scene resources

```txt
scene-resource-generation-required
successor-built-before-predecessor-retirement
successor-frame-ack-before-retirement
predecessor-geometry-disposed
predecessor-material-disposed
predecessor-hotspot-resources-disposed
partial-successor-build-rolls-back
repeated-transition-resource-count-bounded
```

### Root renderer resources

```txt
post-plane-geometry-disposed
post-material-disposed
render-target-disposed
renderer-disposed
context-loss-policy-explicit
canvas-removed
```

### Stop and restart

```txt
stop-result-idempotent
dispose-result-idempotent
stop-fences-new-commands
restart-allocates-new-session-generation
restart-produces-one-canvas
restart-produces-one-raf-chain
restart-does-not-reuse-disposed-scene-resources
```

### Observation

```txt
observation-detached-json-safe
resource-inventory-complete
retirement-receipt-cites-generation
journal-bounded
first-frame-cites-session-and-resource-generation
```

## Browser smoke

```txt
open deployed route
capture initial session and resource inventory
inspect one hotspot and schedule completion
stop before timeout fires
verify no interlude or frame commits after stop
restart and verify one canvas and one RAF chain
transition through all scenes
verify each predecessor resource generation retires
stop and verify renderer, target, post and canvas retirement
```

## Deployment evidence

```txt
commit SHA
GitHub Pages route URL
browser and viewport
runtime session id
session generation
lifecycle revision
RAF lease id
listener lease count
timeout lease count
scene resource generation
geometry/material/hotspot counts
retirement receipt ids
renderer/target disposal receipts
last committed frame id
fixture artifact reference
```

## Validation claim

The proof surface is documented but not implemented. Do not claim lifecycle safety, scene-resource retirement, callback isolation or restart idempotence until the fixture gate passes.
