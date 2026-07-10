# Current audit: The Unmapped House

Timestamp: `2026-07-09T23-28-35-04-00`

## Product read

A small fixed-camera horror prototype where the player inspects hotspots across three scene descriptors, gathers clues, advances through interludes, and reaches a terminal prototype-complete route.

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads the current scene descriptor
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly into DOM state
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Domains

- Static browser shell.
- Story source descriptors.
- Browser story runtime.
- Scene route state.
- Clue collection and inspected hotspot state.
- Notebook/log projection.
- Interlude and terminal route state.
- LocalStorage save/load.
- Fixed-camera StageKit rendering.
- Hotspot pointer and side-panel interaction.
- DOM projection.
- Debug JSON projection.
- Static deploy/check validation.
- Repo-local and central ledger tracking.

## Services

- `story-data-kit`: descriptor source for game title, scenes, hotspots, grants, requirements, interludes, cameras, stage layers, props, and post settings.
- `browser-story-runtime-kit`: browser-bound command handling, mutation, persistence, route progression, DOM projection, reset, and debug JSON.
- `stage-render-kit`: WebGL renderer, fixed frame, camera, lights, fog, scene descriptor consumption, hotspot volumes, picking, hover, and post-process.
- `aspect-frame-kit`: fixed 16:9 layout calculation and application.
- `localstorage-save-kit`: shallow story-state persistence.
- `repo-local-agent-ledger-kit`: internal repo documentation.

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
debug-json-projection-kit
repo-local-agent-ledger-kit
```

Next-cut kits:

```txt
story-source-manifest-kit
story-source-snapshot-kit
story-state-snapshot-kit
stage-scene-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-preflight-kit
story-command-result-kit
story-event-record-kit
story-replay-kit
story-projection-record-kit
save-projection-kit
interlude-projection-kit
stage-projection-kit
browser-adapter-plan-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Current finding

The next useful work is not a visual rewrite. The blocker is source-owned story command proof and browser adapter readback. `src/game.js` should stop being the source of both story truth and browser effects.
