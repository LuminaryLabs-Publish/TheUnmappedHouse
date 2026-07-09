# Story Authority Central Sync DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-38-15-04-00`

## Selection result

`TheUnmappedHouse` was selected as the oldest eligible non-Cavalry `LuminaryLabs-Publish` repo after comparing the full accessible Publish repo list to the central ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, ledger-absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

## Current runtime architecture

```txt
index.html
  -> src/game.js
      -> imports StageKit from src/stage-kit.js
      -> imports gameTitle and scenes from src/story-data.js
      -> loads localStorage into mutable module state
      -> constructs StageKit with inspectHotspot callback
      -> mutates story state in inspectHotspot and nextScene
      -> renders DOM panel/debug/interlude
      -> saves back to localStorage
  -> src/stage-kit.js
      -> imports Three.js CDN
      -> imports aspect-frame services
      -> constructs WebGL renderer, scene, camera, render target, post pass, material shaders, raycaster, hotspot meshes
      -> animates continuously
  -> src/story-data.js
      -> exports source descriptors for three fixed-camera scenes
```

## Domain breakdown

```txt
story-authority-domain
  story-source-manifest-kit
  story-source-snapshot-kit
  story-state-snapshot-kit
  story-command-envelope-kit
  story-command-reason-kit
  story-preflight-kit
  story-command-result-kit
  story-event-record-kit
  story-reducer-kit

story-projection-domain
  story-projection-kit
  save-projection-kit
  interlude-projection-kit
  stage-projection-kit
  debug-projection-kit

browser-adapter-domain
  browser-adapter-plan-kit
  browser-adapter-readback-kit
  gamehost-story-diagnostics-kit

stage-render-domain
  aspect-frame-kit
  stage-render-kit
  anime-material-kit
  post-process-kit
  hotspot-volume-kit
  hotspot-picking-kit
  stage-scene-snapshot-kit

ledger-sync-domain
  repo-local-agent-ledger-kit
  repo-local-ledger-readback-kit
  central-ledger-readback-kit
  dom-free-story-fixture-kit
```

## Active domains in source

```txt
static-page-shell
browser-app-runtime
story-source-descriptors
story-scene-descriptor
story-hotspot-descriptor
story-state
localstorage-save-state
scene-route-state
clue-ledger
notebook-log
inspected-hotspot-state
interlude-overlay
fixed-aspect-frame
fixed-camera-stage-render
scene-descriptor-rendering
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hover-label-projection
raycast-picking
anime-material-shader
post-process-shader
browser-debug-projection
static-deploy-check-script
repo-local-agent-ledger
central-ledger-readback
```

## Services the kits offer

```txt
AspectFrame:
  compute deterministic 16:9 frame and apply DOM bounds.

StageKit:
  create WebGL renderer, fixed viewport, camera, shader material, layer meshes, prop meshes, invisible hotspot volumes, hover labels, raycast picking, render target, post-process pass, resize, and animation.

Story data:
  provide game title, scene ids, title/opening/interlude copy, completion requirements, hotspot grants, camera, layer, prop, and post-process descriptors.

Browser story runtime:
  load state, save state, inspect hotspot, grant clues, write notebook log, check completion, show interlude, continue scene, render DOM, reset by key, and emit debug JSON.

Next story authority:
  produce source manifests, snapshots, preflight decisions, typed command results, projections, adapter plans, readback, diagnostics, and fixture rows.
```

## Main architecture finding

The StageKit render path is coherent enough to leave alone. The next cut should isolate story authority from `src/game.js`, because that file currently owns command routing, mutation, browser adapter writes, persistence, interlude scheduling, debug projection, and StageKit consumption in one module.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Central Sync + Browser Adapter Fixture Gate
```
