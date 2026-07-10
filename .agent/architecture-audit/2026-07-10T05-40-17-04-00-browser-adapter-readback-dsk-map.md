# Architecture Audit: Browser Adapter Readback DSK Map

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Architecture read

The route is compact and stable:

```txt
index.html
  -> src/game.js
  -> src/story-data.js
  -> src/stage-kit.js
  -> src/aspect-frame.js
```

`src/story-data.js` is the source descriptor layer.

`src/stage-kit.js` is the render/interaction consumer.

`src/game.js` is doing too much. It is both story authority and browser adapter.

## DSK/domain loop

```txt
static-page-shell-kit
  -> aspect-frame-kit
  -> story-data-kit
  -> browser-story-runtime-kit
  -> stage-render-kit
  -> scene-descriptor-consumer-kit
  -> hotspot-volume-kit
  -> hotspot-picking-kit
  -> localstorage-save-kit
  -> debug-json-projection-kit
```

## Domains in use

```txt
static-browser-shell
fixed-aspect-frame
story-panel-dom
interlude-dom-route
story-source-descriptor
scene-source-descriptor
hotspot-source-descriptor
stage-source-descriptor
post-process-source-descriptor
browser-story-runtime
story-state
save-state
scene-route-state
clue-ledger
inspected-hotspot-ledger
notebook-log-state
completion-policy
interlude-policy
terminal-route-policy
stage-render-host
three-cdn-runtime
stage-scene-consumption
anime-shader-material
post-process-pass
hotspot-volume
raycast-picking
hover-label-projection
side-panel-hotspot-input
keyboard-reset-input
debug-json-projection
```

## Next DSK domains

```txt
story-source-manifest
story-source-fingerprint
story-source-snapshot
story-state-snapshot
story-command-envelope
story-command-reason
story-preflight
story-command-result
story-event-record
story-replay-row
story-projection-record
save-intent-record
interlude-intent-record
terminal-route-result
stage-load-intent
browser-adapter-plan
browser-adapter-readback
gamehost-story-diagnostics
dom-free-story-fixture
central-ledger-readback
```

## Services offered by current kits

```txt
static shell: DOM mounts and module entry
aspect frame: fixed 16:9 sizing
story data: scene/hotspot/stage/post/interlude source descriptors
browser runtime: command dispatch, mutation, save, route, DOM, debug
stage render: Three scene, camera, shader materials, post pass, render target
scene consumer: layer/prop/hotspot descriptor conversion
hotspot picking: raycast click and hover dispatch
localStorage save: persistence
notebook log: recent observations
debug JSON: ad hoc state projection
```

## Main architecture finding

Do not rewrite `StageKit` next.

The correct cut is a story authority/readback layer that produces records before browser side effects happen.

Then `src/game.js` can become a consumer of records instead of the owner of story truth.
