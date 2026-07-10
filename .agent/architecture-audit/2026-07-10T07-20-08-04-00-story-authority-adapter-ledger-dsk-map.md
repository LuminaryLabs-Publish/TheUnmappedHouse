# Architecture audit — Story authority adapter ledger DSK map

Timestamp: `2026-07-10T07-20-08-04-00`

## DSK read

`TheUnmappedHouse` has a clean descriptor source in `src/story-data.js` and a useful visual consumer in `src/stage-kit.js`, but `src/game.js` still fuses source authority and browser effects.

## Current domain flow

```txt
static browser shell
  -> fixed aspect frame
  -> src/game.js browser runtime
  -> src/story-data.js descriptors
  -> StageKit scene consumer
  -> hotspot callback
  -> in-place state mutation
  -> DOM projection
  -> localStorage save
  -> debug JSON
```

## Domains

```txt
static-browser-shell: hosts fixed browser page.
fixed-aspect-frame: keeps the authored 16:9 frame.
story-source-descriptor: owns scenes, hotspots, grants, requirements, interludes, camera, stage, and post data.
browser-story-runtime: currently owns command interpretation and side effects.
story-state: sceneId, clues, flags, inspected, route, and log.
save-state: localStorage persistence.
scene-route-state: current scene and terminal route.
clue-ledger: grants and completion requirements.
inspected-hotspot-ledger: per-scene inspected map.
completion-policy: sceneComplete(scene).
interlude-policy: showInterlude(scene).
stage-render-host: StageKit WebGL renderer.
stage-scene-consumption: StageKit.loadScene(currentScene).
hotspot-picking: StageKit callback to inspectHotspot.
debug-json-projection: ad hoc state/debug projection.
story-authority-next: planned source-owned command layer.
story-adapter-ledger-next: planned browser adapter readback layer.
dom-free-story-fixture-next: planned validation layer.
central-ledger-sync: central tracking readback.
```

## Service map

```txt
story-data-kit -> descriptor source rows.
browser-story-runtime-kit -> current inspect/continue/reset/save/render control.
stage-render-kit -> renderer, camera, scene, hotspots, hover, post-process.
aspect-frame-kit -> 16:9 layout and viewport math.
localstorage-save-kit -> shallow persisted state.
notebook-log-kit -> latest story log rows.
debug-json-projection-kit -> current browser debug output.
story-authority-next -> command envelopes, reasons, preflight, results, snapshots, projection records, replay rows.
browser-adapter-readback-next -> DOM/save/interlude/stage-load readback records.
```

## Implemented kits

```txt
static-page-shell-kit
aspect-frame-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
story-data-kit
browser-story-runtime-kit
localstorage-save-kit
notebook-log-kit
debug-json-projection-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

## Next-cut kits

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-source-snapshot-kit
story-state-snapshot-kit
stage-scene-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-preflight-kit
story-command-result-kit
story-event-record-kit
story-replay-row-kit
story-projection-record-kit
save-intent-record-kit
interlude-intent-record-kit
terminal-route-result-kit
stage-load-intent-kit
browser-adapter-plan-kit
story-adapter-ledger-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Next boundary

```txt
story-data source
  -> source manifest and fingerprint
  -> story state snapshot
  -> command envelope
  -> preflight
  -> command result
  -> projection/save/interlude/stage-load intent
  -> browser adapter ledger
  -> GameHost story diagnostics
  -> DOM-free fixture rows
```

This should be additive and preserve the current visible route.
