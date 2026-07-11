# Deploy audit: Runtime lifecycle fixture gate

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Prevent deployment from accepting a runtime that can leave old callbacks, listeners, timeouts, Three.js resources, or WebGL ownership alive after a scene replacement, reset, or full session teardown.

## Current validation

`npm run check` performs syntax checks for:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute the runtime, fake browser APIs, inspect resource counts, simulate scene replacement, or verify teardown.

## Required fixture scripts

```txt
scripts/validate-runtime-session.mjs
scripts/validate-frame-loop-lease.mjs
scripts/validate-listener-retirement.mjs
scripts/validate-timeout-retirement.mjs
scripts/validate-stage-resource-retirement.mjs
scripts/validate-renderer-disposal.mjs
scripts/validate-reset-generation.mjs
```

## Node-compatible fixture adapters

The lifecycle domain should accept injected adapters for:

```txt
requestAnimationFrame
cancelAnimationFrame
setTimeout
clearTimeout
addEventListener
removeEventListener
resource dispose spies
renderer dispose spy
canvas removal spy
context retirement spy
```

This allows deterministic proof without importing WebGL in Node.

## Required fixture rows

```txt
one-raf-lease-per-session
stop-cancels-raf
stale-raf-does-not-recurse
all-global-and-canvas-listeners-retired
completion-timeout-cancelled-on-stop
stale-timeout-does-not-open-interlude
scene-replacement-disposes-predecessor-resources
failed-scene-preparation-does-not-dispose-current-scene
hotspot-geometries-and-materials-disposed
render-target-and-post-resources-disposed
renderer-dispose-called-once
canvas-removed-once
context-retirement-explicit
reset-creates-new-generation
old-generation-callbacks-no-op
dispose-is-idempotent
zero-live-resource-count-after-full-dispose
lifecycle-result-json-safe
journal-bounded
```

## Browser smoke

After Node fixtures pass:

```txt
boot initial scene
capture initial resource diagnostics
advance to scene two
verify one committed stage epoch and retired predecessor counts
advance to scene three
verify live counts remain bounded
schedule interlude and reset before timeout fires
verify stale timeout does not reopen UI
stop runtime
verify frame count no longer advances
verify resize, pointer, click, and key events no longer mutate state
fully dispose runtime
verify canvas removed and renderer/resource counts reach zero
start a new session generation
verify old callbacks cannot affect it
```

## Deployment rule

Do not treat syntax checks, a successful Pages upload, or a visible first scene as lifecycle proof. The deployment gate should require all lifecycle fixtures plus the browser teardown smoke before lifecycle authority can be marked implemented.

## Current status

```txt
runtime lifecycle fixtures: absent
resource retirement fixtures: absent
browser teardown smoke: absent
existing deployment behavior changed by this audit: no
```