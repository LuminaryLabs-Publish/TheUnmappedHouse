# Architecture Audit — Story Adapter Readback Fixture DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
       imports StageKit
       imports story data
       owns SAVE_KEY
       owns loadState/saveState
       owns state/currentScene
       owns inspectHotspot
       owns nextScene
       owns renderUi
       owns debug projection
       owns KeyR reset
  -> src/stage-kit.js
       owns Three.js renderer
       owns fixed aspect frame consumption
       owns shader materials
       owns scene/mesh/hotspot construction
       owns pointer/raycast picking
       owns post-process render pass
  -> src/story-data.js
       owns ordered scene descriptors
       owns copy, camera, layers, props, hotspots, requirements, and interludes
```

## Architectural issue

The runtime is compact, but `src/game.js` is still both browser adapter and story authority.

That means source fallback, loaded-state normalization, command validation, inspection, clue mutation, scene completion, scene transition, terminal route behavior, save intent, reset intent, interlude intent, stage projection, and debug projection are not fixture-readable.

## DSK/domain map

```txt
static shell domain
  kit: unmapped-house-static-shell-kit
  service: mount fixed-frame stage, story text, hotspot list, debug notebook, interlude shell

browser runtime domain
  kit: unmapped-house-browser-runtime-kit
  service: boot module route, bind DOM, dispatch browser events

story source domain
  kit: unmapped-house-story-data-kit
  service: scenes, hotspots, requirements, camera descriptors, interlude text

story state domain
  kit: unmapped-house-story-runtime-kit
  service: scene id, inspected map, clue ledger, route, notebook log

save domain
  kit: unmapped-house-localstorage-save-kit
  service: load JSON, fallback state, save JSON, clear save

render host domain
  kit: unmapped-house-stage-kit
  service: Three renderer, camera, raycaster, lights, render target, animation

fixed frame domain
  kit: unmapped-house-aspect-frame-kit
  service: 16:9 frame math and browser frame application

hotspot domain
  kit: unmapped-house-stage-hotspot-volume-kit
  service: invisible volumes, pointer raycast, hover label, callback dispatch

story authority domain
  next kits: story-source-manifest, story-command-envelope, story-preflight, story-command-result, story-event-record, story-reducer
  service: own accepted/rejected/no-mutation/terminal story decisions outside DOM

projection domain
  next kits: story-projection, save-projection, interlude-projection, stage-projection, browser-adapter-plan, browser-adapter-readback
  service: make browser effects explicit and readbackable

diagnostics domain
  next kits: gamehost-story-diagnostics, fixture-summary-projection, central-ledger-readback-row
  service: additive host state and fixture proof
```

## Required cut line

Do not move `StageKit` internals first.

Add a pure story-authority layer first.

Then adapt `src/game.js` to consume result/projection/readback records while preserving:

```txt
index.html -> src/game.js
SAVE_KEY = the-unmapped-house.stage-prototype.v1
current story copy
current StageKit visuals
fixed 16:9 display behavior
current Pages deploy behavior
```

## First implementation targets

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-result.js
src/story-authority/story-preflight.js
src/story-authority/story-reducer.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
scripts/validate-story-authority.mjs
```

## Acceptance gate

Stop when a DOM-free script proves source manifest, descriptor validation, command results, projection records, browser adapter plan, readback records, GameHost diagnostics, and central-ledger freshness rows without Three.js, DOM, localStorage, setTimeout, or browser input.
