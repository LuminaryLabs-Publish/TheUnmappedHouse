# Validation: The Unmapped House

Timestamp: `2026-07-11T10-18-05-04-00`

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
npm run check: not run in connector-only environment
browser smoke: not run
runtime-session fixture: unavailable
frame-loop fixture: unavailable
listener-retirement fixture: unavailable
timeout-retirement fixture: unavailable
stage-resource-retirement fixture: unavailable
renderer-disposal fixture: unavailable
reset-generation fixture: unavailable
browser teardown smoke: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
```

## Available validation

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute runtime lifecycle behavior or prove callback and resource retirement.

## Required lifecycle validation gate

```txt
node scripts/validate-runtime-session.mjs
node scripts/validate-frame-loop-lease.mjs
node scripts/validate-listener-retirement.mjs
node scripts/validate-timeout-retirement.mjs
node scripts/validate-stage-resource-retirement.mjs
node scripts/validate-renderer-disposal.mjs
node scripts/validate-reset-generation.mjs
npm run check
```

## Required runtime-session rows

```txt
session-id-and-generation-present
lifecycle-state-machine-valid
only-current-generation-admitted
session-snapshot-detached-and-json-safe
stop-result-typed
disposal-result-typed
stop-idempotent
dispose-idempotent
```

## Required frame and callback rows

```txt
single-active-frame-loop
pending-raf-retained
stop-cancels-pending-raf
stale-raf-does-not-render
stale-raf-does-not-recurse
resize-listener-removed
mousemove-listener-removed
canvas-click-listener-removed
keydown-listener-removed
continue-listener-disabled-during-stop
pending-interlude-timeout-cancelled
stale-interlude-callback-no-op
old-hotspot-button-closure-no-op
```

## Required stage-resource rows

```txt
scene-resource-counts-inventoried-by-stage-epoch
initial-scene-counts-stable
successor-stage-commits-before-predecessor-retirement
failed-successor-keeps-current-stage-live
all-layer-geometries-disposed
all-prop-geometries-disposed
all-hotspot-geometries-disposed
all-scene-shader-materials-disposed
all-hotspot-materials-disposed
retirement-receipt-counts-match
zero-retired-scene-resources-remain-live
```

## Required renderer-disposal rows

```txt
render-target-disposed
post-plane-geometry-disposed
post-material-disposed
renderer-disposed-once
canvas-removed-once
context-retirement-result-explicit
owned-references-cleared
zero-live-resources-after-full-dispose
partial-disposal-failures-listed
```

## Required reset rows

```txt
reset-admitted-against-current-generation
old-session-stopped-before-new-generation
old-session-disposed-before-new-generation
persistence-clear-result-typed
initial-stage-epoch-committed
first-post-reset-frame-acknowledged
old-generation-raf-no-op
old-generation-timeout-no-op
old-generation-listener-no-op
```

## Browser smoke after fixtures

```txt
boot initial scene
record initial lifecycle and resource diagnostics
advance to scene two
verify predecessor retirement and bounded live counts
advance to scene three
verify resource counts remain bounded
schedule interlude and reset before timeout fires
verify stale timeout does not reopen the interlude
stop runtime and verify frame count stops
fire resize, pointer, click, key, and Continue events after stop
verify no story, DOM, persistence, or render mutation
fully dispose runtime
verify canvas removal and zero live resource counts
start a new generation
verify old-generation callbacks cannot affect it
```

## Existing prerequisite fixture families

The lifecycle gate does not replace the still-required:

```txt
StoryManifest and StorySnapshot fixtures
save admission, migration, reconciliation, and write-result fixtures
inspection-command and completion-proof fixtures
atomic Continue, rollback, resource-retirement, and first-frame fixtures
```

## Validation claim

This pass documents the required proof surface. It does not claim that runtime lifecycle, resource disposal, or browser teardown is implemented.