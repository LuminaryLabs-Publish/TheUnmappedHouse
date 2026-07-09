# Architecture Audit: Story Adapter Fixture Readback DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Selection result

`TheUnmappedHouse` was selected as the oldest eligible central-ledger fallback after comparing the accessible `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent` state.

`TheCavalryOfRome` was excluded by rule.

## Current architecture

```txt
index.html
  -> src/game.js
      -> imports StageKit
      -> imports gameTitle/scenes
      -> owns browser DOM bindings
      -> owns state/currentScene
      -> owns inspectHotspot / nextScene / renderUi / save / reset
  -> src/stage-kit.js
      -> imports Three.js CDN
      -> owns renderer, camera, post, materials, scene loading, hotspot picking
  -> src/story-data.js
      -> owns scenes, hotspots, clues, completion requirements, interludes
```

## Implemented domains

```txt
static-page-shell
browser-app-runtime
story-source-descriptor
story-state
localstorage-save
notebook-log
route-state
interlude-overlay
stage-render-host
fixed-aspect-frame
fixed-camera-composition
scene-descriptor
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-raycast-picking
hover-label-projection
anime-material-shader
webgl-post-process
debug-json-projection
syntax-check-deploy
```

## Implemented kit services

```txt
AspectFrame kit:
  - compute fixed 16:9 design frame
  - apply design frame to the DOM host

StageKit:
  - create WebGL renderer
  - lock camera to design aspect
  - load scene descriptors
  - create layer meshes
  - create prop meshes
  - create invisible hotspot volumes
  - raycast pointer into hotspot volumes
  - emit hotspot callback
  - maintain hover label
  - run shader material time updates
  - render target then post-process pass

Story data kit:
  - define game title
  - define scene ids/titles/opening text
  - define camera/layer/prop/post descriptors
  - define hotspot ids/labels/grants/text
  - define completion requirements
  - define interlude copy

Browser story runtime kit:
  - load localStorage state
  - mutate story state
  - grant clues
  - write notebook log
  - compute completion
  - schedule interlude
  - project UI/debug state
  - save state
  - reset via KeyR
```

## Current bottleneck

`src/game.js` is too authoritative. It owns command creation, validation, mutation, result projection, save writes, interlude timing, StageKit routing, UI rendering, and debug output.

This makes it difficult to prove story behavior without a browser and prevents fixtures from reading command reasons, rejected paths, no-mutation repeat-inspection paths, save projections, interlude projections, and stage projections.

## Next-cut DSK map

```txt
story-authority-domain
  -> story-source-manifest-kit
  -> story-source-snapshot-kit
  -> story-state-snapshot-kit
  -> stage-scene-snapshot-kit
  -> story-command-envelope-kit
  -> story-command-reason-kit
  -> story-preflight-kit
  -> story-command-result-kit
  -> story-event-record-kit
  -> story-reducer-kit
  -> story-projection-kit
  -> save-projection-kit
  -> interlude-projection-kit
  -> stage-projection-kit
  -> browser-adapter-plan-kit
  -> browser-adapter-readback-kit
  -> gamehost-story-diagnostics-kit
  -> central-ledger-readback-kit
  -> dom-free-story-fixture-kit
```

## Required composition contract

```txt
StorySourceManifest
  -> StorySourceSnapshot
  -> StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> CentralLedgerReadback
  -> fixture summary
```

## Do not cut yet

```txt
renderer extraction
new room content
inventory system
audio system
browser-only smoke tests
Pages workflow edits
```

Those should wait until story authority fixtures can prove behavior without relying on DOM mutation.
