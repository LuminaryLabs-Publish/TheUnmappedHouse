# Story Authority Central Ledger Splice DSK Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Intent

Define the DSK/domain map for moving story authority out of `src/game.js` while preserving the current route, story copy, StageKit render behavior, localStorage key, and static deployment path.

## Current architecture

```txt
index.html
  -> src/game.js
     -> imports StageKit
     -> imports story data
     -> binds DOM nodes
     -> loads saved state
     -> builds StageKit
     -> owns inspectHotspot
     -> owns nextScene
     -> owns renderUi
     -> owns debug JSON
  -> src/stage-kit.js
     -> owns Three.js renderer and hotspot picking
  -> src/story-data.js
     -> owns ordered scene descriptors
```

## Current domains

```txt
static-page-shell:
  service: mount #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, #interlude, and module script route.

browser-app-runtime:
  service: DOM lookup, load order, module-level state/currentScene, UI update, KeyR reset.

story-source:
  service: game title, ordered scenes, opening text, interlude text, hotspot grants, completion requirements.

story-state:
  service: scene id, clues, flags, inspected map, route, notebook log.

localstorage-save:
  service: load/save shallow JSON at SAVE_KEY.

stage-render-host:
  service: Three.js renderer, camera, lights, render target, post scene, shader uniforms, frame loop.

stage-descriptor:
  service: layers, props, hotspots, camera, post-process, fog, background.

hotspot-picking:
  service: invisible volumes, normalized pointer, raycast, hover label, click callback.
```

## Missing authority domains

```txt
story-source-manifest:
  service: product id, source version, public route, save key, scene ids, command ids, feature flags.

story-source-snapshot:
  service: serializable story source facts and stable fingerprint inputs.

story-source-preflight:
  service: duplicate scene rejection, duplicate hotspot rejection, required-clue validation, stage descriptor validation, grantable clue index.

story-command-envelope:
  service: normalize browser clicks, StageKit callbacks, continue actions, save/load/reset/projection/readback checks.

story-command-result:
  service: accepted/rejected/no_mutation/terminal/projected/readback/ledger_readback statuses and stable reason codes.

story-event-record:
  service: clue granted, hotspot inspected, scene completed, scene transitioned, save requested, reset requested, projection updated.

story-result-reducer:
  service: pure applyInspection/applyContinue/applySave/applyLoad/applyReset/applyProjection without DOM, localStorage, timers, or StageKit.

story-projection:
  service: derive scene title, text, button labels, completion facts, notebook entries, and debug facts.

save-projection:
  service: derive write/clear/ignore intent, save key, save payload, source version, and reason.

interlude-projection:
  service: derive open/close/terminal interlude state without direct DOM mutation.

stage-projection:
  service: derive scene-to-load, load reason, stage snapshot id, and descriptor validation status.

story-browser-adapter-plan:
  service: one host-consumable plan for DOM text, hotspot buttons, debug panel, save, interlude, stage, and host diagnostics.

browser-adapter-readback:
  service: record which plan fields the browser consumed, which fields were unchanged, and any browser-only failure reasons.

GameHost-story-diagnostics:
  service: additive `window.GameHost.getState().story` projection.

central-ledger-readback:
  service: serializable row that names latest tracker/audit paths and central ledger expected path.

fixture-replay:
  service: DOM-free fixture rows for source, command, projection, adapter, readback, and ledger freshness.
```

## Implemented or implied kits

```txt
unmapped-house-static-shell-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-browser-runtime-kit
unmapped-house-story-data-kit
unmapped-house-story-runtime-kit
unmapped-house-story-state-save-kit
unmapped-house-localstorage-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-route-state-kit
unmapped-house-notebook-debug-kit
unmapped-house-aspect-frame-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-hover-label-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-static-validation-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
```

## Next-cut kits

```txt
unmapped-house-story-source-manifest-kit
unmapped-house-story-source-snapshot-kit
unmapped-house-story-source-preflight-kit
unmapped-house-story-state-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-story-command-result-kit
unmapped-house-story-command-reason-kit
unmapped-house-story-reducer-kit
unmapped-house-story-event-record-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-prototype-complete-result-kit
unmapped-house-save-result-kit
unmapped-house-save-projection-kit
unmapped-house-interlude-projection-kit
unmapped-house-stage-projection-kit
unmapped-house-browser-adapter-plan-kit
unmapped-house-browser-adapter-readback-kit
unmapped-house-route-state-journal-kit
unmapped-house-command-journal-kit
unmapped-house-story-ui-projection-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-central-ledger-readback-row-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-save-load-fixture-kit
unmapped-house-stage-descriptor-validation-kit
unmapped-house-fixture-summary-projection-kit
```

## Source file boundary for next implementation

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-preflight.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/central-ledger-readback.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Stop condition

Stop the next implementation once source manifest, source preflight, reducer, projections, browser adapter plan, adapter readback, GameHost story diagnostics, central ledger readback, and fixture rows pass. Defer renderer extraction, new rooms, new content, inventory, audio, and browser automation until after that proof layer exists.
