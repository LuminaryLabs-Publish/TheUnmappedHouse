# Current audit: The Unmapped House

Timestamp: `2026-07-10T04-22-00-04-00`

## Product read

A fixed-camera horror prototype where the player inspects hotspots across three scene descriptors, gathers clues, advances through interludes, and reaches a terminal prototype-complete route.

## Current interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> script type=module loads ./src/game.js
  -> src/game.js imports StageKit and story descriptors from src/story-data.js
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as callback
  -> StageKit.loadScene(currentScene) consumes camera/stage/hotspot/post descriptors
  -> renderUi() writes title/text/buttons/debug JSON
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly into DOM state
  -> KeyR clears localStorage and reloads
```

## Domains

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
story-command-authority-next
story-command-result-next
browser-adapter-readback-next
stage-load-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Services

- `story-data-kit`: source descriptors for title, scenes, hotspots, grants, requirements, interludes, camera, stage, and post settings.
- `browser-story-runtime-kit`: browser-bound command handling, mutation, persistence, route progression, DOM projection, reset, and debug JSON.
- `stage-render-kit`: WebGL renderer, fixed frame, camera, lights, fog, scene descriptor consumption, hotspot volumes, picking, hover, and post-process.
- `aspect-frame-kit`: fixed 16:9 layout calculation and application.
- `localstorage-save-kit`: shallow story-state persistence.
- `debug-json-projection-kit`: ad hoc current scene/clue/route/inspection/completion projection.
- Planned story authority services: source manifest, snapshots, preflight, command envelopes, reason catalog, command results, projections, adapter readback, diagnostics, and DOM-free fixture rows.

## Kit inventory

Current kits:

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

Next-cut kits:

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
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Current finding

The next useful work is not a visual rewrite. The blocker is source-owned story command proof and browser adapter readback. `src/game.js` should stop being the source of both story truth and browser effects.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Fixture Proof + Browser Adapter Readback Gate
```
