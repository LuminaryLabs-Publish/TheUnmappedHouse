# TheUnmappedHouse project breakdown — 2026-07-10T10-11-35-04-00

## Selected repo

`LuminaryLabs-Publish/TheUnmappedHouse`

Reason: no checked non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added, or undocumented. `TheUnmappedHouse` was the oldest eligible fallback after `ZombieOrchard` advanced.

## Interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> src/game.js imports StageKit and story descriptors from src/story-data.js
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot callback
  -> StageKit.loadScene(currentScene) consumes camera/stage/hotspot/post descriptors
  -> renderUi() writes title/text/buttons/debug JSON
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspect mutates state, grants clues, logs, checks completion, renders, saves
  -> repeat inspect writes text/log/UI/save without typed no_mutation result
  -> continue mutates route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete copy directly into interlude DOM
  -> KeyR clears localStorage and reloads
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
story-source-manifest-next
story-command-envelope-next
story-command-result-next
story-projection-ledger-next
story-adapter-ledger-next
browser-adapter-readback-next
stage-load-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Current kits

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
story-command-envelope-kit
story-command-reason-kit
story-preflight-kit
story-command-result-kit
story-projection-ledger-kit
save-intent-record-kit
interlude-intent-record-kit
terminal-route-result-kit
stage-load-intent-kit
stage-load-readback-kit
stage-pick-readback-kit
browser-adapter-plan-kit
story-adapter-ledger-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Kit services

- `story-data-kit`: title, scene, hotspot, grant, completion, interlude, camera, stage, and post descriptors.
- `browser-story-runtime-kit`: hotspot inspection, continue routing, mutation, persistence, DOM projection, reset, and debug JSON.
- `stage-render-kit`: Three.js renderer, camera, lights, fog, stage layers/props, hotspot volumes, raycast picking, hover labels, and post-process.
- `aspect-frame-kit`: fixed 16:9 layout.
- `localstorage-save-kit`: shallow state persistence.
- `notebook-log-kit`: recent story log rows.
- `debug-json-projection-kit`: current ad hoc scene, clue, route, inspection, completion, and latest-log projection.
- Next proof kits: source manifest/fingerprint, command envelope, preflight, result rows, projection ledger, adapter ledger, stage load/pick readback, GameHost story diagnostics, DOM-free fixture replay.

## Main finding

`TheUnmappedHouse` should not start next with new story rooms, inventory, audio, renderer extraction, visual polish, or a `StageKit` rewrite.

The blocker is browser adapter readback. `src/game.js` still owns command interpretation, mutation, save writes, interlude timing, route changes, StageKit scene loading, terminal DOM copy, reset, and debug JSON together. `StageKit` consumes descriptors and callbacks, but it exposes no serializable stage-load, pick, hover, or projection readback tied to story command results.

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Ledger Refresh + DOM-Free Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
pushed to main: pending this pass
central ledger updated: pending this pass
```
