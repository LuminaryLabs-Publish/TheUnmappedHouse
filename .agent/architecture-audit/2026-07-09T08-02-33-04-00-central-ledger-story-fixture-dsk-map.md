# Architecture Audit — Central Ledger Story Fixture DSK Map

**Timestamp:** `2026-07-09T08-02-33-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
     -> imports StageKit
     -> imports story-data
     -> owns SAVE_KEY
     -> owns browser DOM references
     -> owns loadState/saveState
     -> owns createInitialState
     -> owns inspectHotspot
     -> owns showInterlude
     -> owns nextScene
     -> owns renderUi
     -> owns reset key listener
  -> src/stage-kit.js
     -> imports Three.js CDN
     -> owns fixed-camera stage renderer
     -> owns descriptor-to-Three consumer
  -> src/story-data.js
     -> owns story descriptors
```

## Implemented DSK/domain map

```txt
static-page-shell-domain
  -> static-page-shell-kit

fixed-aspect-domain
  -> aspect-frame-kit

stage-render-domain
  -> stage-render-kit
  -> anime-material-kit
  -> post-process-kit
  -> hotspot-volume-kit
  -> hotspot-picking-kit

story-source-domain
  -> story-data-kit

browser-story-runtime-domain
  -> browser-story-runtime-kit
  -> localstorage-save-kit
  -> debug-json-projection-kit
```

## Next-cut DSK/domain map

```txt
story-source-authority-domain
  -> story-source-manifest-kit
  -> story-source-snapshot-kit
  -> story-source-validation-kit

story-command-domain
  -> story-command-envelope-kit
  -> story-command-reason-kit
  -> story-preflight-kit
  -> story-command-result-kit
  -> story-event-record-kit
  -> story-reducer-kit

story-projection-domain
  -> story-projection-kit
  -> save-projection-kit
  -> interlude-projection-kit
  -> stage-projection-kit

browser-adapter-domain
  -> browser-adapter-plan-kit
  -> browser-adapter-readback-kit
  -> gamehost-story-diagnostics-kit

central-ledger-domain
  -> central-ledger-readback-kit

fixture-domain
  -> dom-free-story-fixture-kit
```

## Key boundary decision

`src/game.js` should become a browser adapter.

It should not continue to own story rules.

The reducer should return source-owned result records first, and only then should the browser apply DOM, StageKit, localStorage, interlude, debug, and GameHost side effects.

## Required source files for the next implementation

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-preflight.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
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

## Blockers to avoid

```txt
Do not rewrite StageKit first.
Do not expand story content first.
Do not change the localStorage key.
Do not change route names.
Do not make fixture proof depend on DOM or Three.js.
Do not let central ledger updates drift from repo-local fixture facts.
```