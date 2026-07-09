# Architecture Audit - Story Fixture Readback Central Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-58-52-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
    -> StageKit from src/stage-kit.js
    -> gameTitle/scenes from src/story-data.js
    -> browser DOM nodes
    -> localStorage SAVE_KEY
    -> mutable module state
    -> StageKit.loadScene(currentScene)
    -> renderUi()
    -> saveState()
```

## Authority map

```txt
src/story-data.js
  source descriptors for scenes, hotspots, clues, requirements, camera, stage, post, and interlude copy

src/game.js
  command dispatcher, reducer, browser adapter, save adapter, route adapter, interlude scheduler, debug projector, reset handler, and StageKit consumer

src/stage-kit.js
  Three.js renderer, camera, materials, render target, post-process pass, scene descriptor consumption, hotspot mesh creation, raycast picking, hover labels, resize, and animation

src/aspect-frame.js
  fixed 16:9 frame constants and DOM frame calculation
```

## DSK/domain breakdown

```txt
static-page-shell-domain
fixed-aspect-frame-domain
story-source-domain
browser-story-runtime-domain
story-state-domain
save-state-domain
scene-route-domain
clue-ledger-domain
inspected-hotspot-domain
notebook-log-domain
interlude-domain
stage-render-domain
anime-material-domain
post-process-domain
stage-layer-domain
stage-prop-domain
hotspot-volume-domain
hotspot-picking-domain
hover-label-domain
debug-projection-domain
agent-ledger-domain
central-ledger-readback-domain
```

## Existing kit services

```txt
static-page-shell-kit:
  hosts index.html frame, panel, hotspot list, hover label, interlude overlay, and module entry.

aspect-frame-kit:
  calculates and applies 1920x1080 frame scaling.

stage-render-kit:
  hosts Three.js renderer, scene, camera, lights, render target, post-process pass, and animation.

anime-material-kit:
  generates shader materials from descriptor color/scale/toon settings.

hotspot-volume-kit:
  creates invisible Three.js hotspot meshes from source descriptors.

hotspot-picking-kit:
  projects pointer coordinates, raycasts hotspot meshes, and calls the browser story runtime callback.

story-data-kit:
  provides source scene descriptors, hotspot grants, completion requirements, and interlude copy.

browser-story-runtime-kit:
  mutates story state, routes, UI, save state, logs, interludes, and debug JSON directly.
```

## Next-cut DSK map

```txt
story-source-manifest-kit
  own product id, route id, save key, story version, source file list, scene ids, hotspot ids, command ids, and ledger pointers.

story-snapshot-kit
  own source snapshots, state snapshots, stage scene snapshots, repo-local ledger snapshots, and central ledger snapshots.

story-command-envelope-kit
  own load, inspect_hotspot, continue_scene, reset, save, project, readback, repo_ledger_readback, and central_ledger_readback command shape.

story-preflight-kit
  own descriptor, state, route, hotspot, completion, continuation, malformed-save, and ledger pointer checks.

story-command-result-kit
  own accepted/rejected/repeated/completed/terminal/no_mutation/load_failed/save_failed statuses and reason codes.

story-reducer-kit
  own pure story mutation and event records without DOM, StageKit, timers, or localStorage.

story-projection-kit
  own UI, save, interlude, debug, and StageKit projection records.

browser-adapter-plan-kit
  translate projections into DOM/localStorage/StageKit mutation plans.

browser-adapter-readback-kit
  compare actual DOM/save/stage/debug/interlude state against projections.

ledger-readback-kit
  verify repo-local `.agent` pointers and central ledger pointers match actual files.
```

## Main architecture risk

The route is small, but the authority boundary is still wrong. `src/game.js` is doing every role at once, which prevents deterministic fixture rows and makes repeat/terminal/ledger cases invisible to tests.

## Recommended next slice

```txt
TheUnmappedHouse Story Fixture Readback Central Catch-up + Browser Adapter Gate
```
