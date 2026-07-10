# Architecture audit: story command readback catch-up DSK map

Timestamp: `2026-07-10T00-51-03-04-00`

## Route map

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
  -> src/aspect-frame.js
```

## DSK/domain breakdown

```txt
static-browser-shell
  owns: HTML layout, stage mount, story panel, interlude overlay, module entry
  consumers: browser runtime and StageKit

aspect-frame-domain
  owns: 1920x1080 design aspect, viewport fit, scale, element frame application
  consumers: StageKit resize and frame element

story-source-domain
  owns: gameTitle, scenes, hotspot descriptors, grants, completion requirements, interlude copy, camera/stage/post descriptors
  consumers: src/game.js and StageKit

browser-story-runtime-domain
  owns: loadState, saveState, state mutation, currentScene, inspectHotspot, sceneComplete, showInterlude, nextScene, renderUi, reset
  consumers: DOM, localStorage, StageKit

story-state-domain
  owns: sceneId, clues, flags, inspected map, route, log
  consumers: renderUi, saveState, completion policy, debug projection

stage-render-domain
  owns: Three renderer, scene, camera, lighting, render target, post pass, shader materials, scene descriptor consumption
  consumers: browser route and hotspot interaction

interaction-domain
  owns: side-panel hotspot buttons, StageKit hover, StageKit raycast click, continue button, KeyR reset
  consumers: browser-story-runtime-domain

readback/proof-domain-next
  missing: command envelopes, preflight, result rows, projection records, save/interlude/stage intents, adapter readback, fixture replay
  consumers: planned browser adapter and central ledger
```

## Current source authority

`src/game.js` is source and adapter at once. It accepts browser/StageKit events, mutates story state, triggers UI effects, schedules interludes, writes save state, loads StageKit scenes, and emits debug JSON.

That means no DOM-free fixture can prove story outcomes today.

## Boundary that should stay stable

`StageKit` already owns enough visual infrastructure:

- fixed aspect frame consumption;
- Three.js renderer and camera;
- fog/lights/background;
- layer and prop mesh creation;
- invisible hotspot volume creation;
- pointer/raycast hover and click dispatch;
- post-process shader pass;
- resize and animation loop.

The next pass should treat StageKit as a consumer, not rewrite it.

## Required next DSK split

```txt
story-source-manifest-kit
  -> lists scene/hotspot source ids and source fingerprints

story-command-envelope-kit
  -> wraps inspect, continue, reset/read-only fixture commands

story-preflight-kit
  -> validates current scene, hotspot id, completion state, terminal state, repeat state

story-command-result-kit
  -> returns accepted/rejected/no_mutation/terminal result rows with stable reasons

story-projection-record-kit
  -> describes text/log/debug/sidebar/interlude/stage-load/save effects without touching DOM

browser-adapter-readback-kit
  -> records which projection/save/stage/interlude records the browser consumed

dom-free-story-fixture-kit
  -> proves accepted, repeated, completion, continue, terminal, stale id, and save-intent cases
```

## Main finding

The architectural risk is not renderer readiness. It is missing story command readback. Until command/result/projection rows exist, browser behavior can drift without fixture-visible evidence.
