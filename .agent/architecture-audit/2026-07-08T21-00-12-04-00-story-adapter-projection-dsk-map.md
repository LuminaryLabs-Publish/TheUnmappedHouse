# Story Adapter Projection DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T21-00-12-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`src/game.js` currently acts as the browser runtime, state owner, reducer, save adapter, story projector, StageKit scene router, interlude owner, reset owner, and debug projector.

`src/stage-kit.js` owns the Three.js stage renderer, fixed-camera display, shader materials, render target, post-process pass, hotspot volumes, raycast picking, hover label, resize, and animation loop.

`src/story-data.js` owns the authored source descriptors: scenes, cameras, layers, props, post settings, hotspots, grants, completion requirements, and interlude copy.

## DSK/domain split

```txt
unmapped-house-story-authority-domain
├─ story-source-snapshot-subdomain
│  ├─ unmapped-house-story-source-snapshot-kit
│  └─ unmapped-house-story-source-preflight-kit
├─ story-state-subdomain
│  ├─ unmapped-house-story-state-snapshot-kit
│  ├─ unmapped-house-clue-ledger-reducer-kit
│  └─ unmapped-house-route-state-journal-kit
├─ story-command-subdomain
│  ├─ unmapped-house-story-command-envelope-kit
│  ├─ unmapped-house-command-validation-kit
│  ├─ unmapped-house-story-command-reason-kit
│  └─ unmapped-house-story-command-result-kit
├─ story-reducer-subdomain
│  ├─ unmapped-house-story-reducer-kit
│  ├─ unmapped-house-inspection-action-kit
│  ├─ unmapped-house-scene-completion-result-kit
│  ├─ unmapped-house-scene-transition-result-kit
│  └─ unmapped-house-prototype-complete-result-kit
├─ projection-subdomain
│  ├─ unmapped-house-story-ui-projection-kit
│  ├─ unmapped-house-save-projection-kit
│  ├─ unmapped-house-interlude-projection-kit
│  ├─ unmapped-house-stage-projection-kit
│  └─ unmapped-house-browser-adapter-plan-kit
├─ diagnostics-subdomain
│  ├─ unmapped-house-gamehost-diagnostics-kit
│  ├─ unmapped-house-command-journal-kit
│  └─ unmapped-house-fixture-summary-projection-kit
└─ fixture-subdomain
   ├─ unmapped-house-dom-free-fixture-kit
   ├─ unmapped-house-hotspot-fixture-matrix-kit
   ├─ unmapped-house-scene-completion-fixture-kit
   ├─ unmapped-house-save-load-fixture-kit
   └─ unmapped-house-stage-descriptor-validation-kit
```

## Boundary rule

`StageKit` stays a visual consumer for now.

The next source pass should add pure story-authority files first. Only after those fixture rows pass should `src/game.js` be adapted to consume a `StoryBrowserAdapterPlan`.

## Adapter plan ownership

`StoryBrowserAdapterPlan` should own the host-facing decisions currently scattered across `inspectHotspot`, `nextScene`, `showInterlude`, `renderUi`, `saveState`, and the KeyR reset handler.

It should include:

```txt
textProjection
hotspotListProjection
notebookProjection
debugProjection
saveProjection
interludeProjection
stageProjection
resetProjection
hostDiagnosticsProjection
```

## Stop condition

Stop the implementation ledge when `src/game.js` can dispatch command envelopes and consume result/projection objects while keeping the visible route, story copy, StageKit visuals, and localStorage key stable.
