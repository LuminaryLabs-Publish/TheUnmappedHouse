# TheUnmappedHouse project breakdown

Timestamp: `2026-07-09T23-28-35-04-00`
Repository: `LuminaryLabs-Publish/TheUnmappedHouse`
Selection rule: oldest eligible documented-selection fallback after comparing the public Publish repo list to central ledger state. `TheCavalryOfRome` was excluded.

## Status

Documentation-only pass. Runtime source was not changed.

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

## Domains in use

- Static page shell and browser module boot.
- Story source descriptors: `gameTitle`, `scenes`, stage layers, props, camera, post settings, hotspots, clue grants, completion requirements, and interlude copy from `src/story-data.js`.
- Browser story runtime and command dispatch in `src/game.js`.
- Story state: clue set, inspected hotspot map, log rows, current scene, completion flags, interlude flags, and terminal route state.
- Local persistence through `localStorage` key `the-unmapped-house.stage-prototype.v1`.
- Fixed-camera stage rendering through `StageKit`.
- Aspect-frame and resize projection.
- Scene descriptor consumption: background, fog, camera, layers, props, hotspots, and post-process uniforms.
- Hotspot picking and hover label projection.
- DOM projection for scene title, narrative text, hotspot buttons, clue list, log, interlude, debug, and reset affordance.
- Browser debug projection through ad hoc JSON.
- Static deploy/check surface.
- Repo-local `.agent` audit ledger.
- Central LuminaryLabs ledger readback.
- Planned story adapter/result/readback fixture domain.

## Kit services

### Implemented services

- `aspect-frame-kit`: calculates and applies the fixed 16:9 browser frame.
- `stage-render-kit`: owns WebGL renderer, scene, camera, lights, render target, post-process scene, animation, and resize.
- `scene-descriptor-consumer-kit`: consumes scene background, fog, camera, layers, props, hotspots, and post settings.
- `anime-material-kit`: builds shader materials from descriptor palettes and scale values.
- `post-process-kit`: renders the stage through grain, vignette, chromatic, distortion, and memory uniforms.
- `hotspot-volume-kit`: creates invisible hotspot meshes from descriptor positions/sizes.
- `hotspot-picking-kit`: maps pointer raycasts to hotspot callbacks and hover labels.
- `story-data-kit`: provides story, scene, hotspot, clue, route, stage, camera, and interlude descriptors.
- `browser-story-runtime-kit`: owns browser command handling, mutation, persistence, route progression, DOM projection, reset, and debug JSON.
- `localstorage-save-kit`: serializes and restores shallow story state.
- `repo-local-agent-ledger-kit`: keeps repo-local breakdown files current.

### Needed next services

- Story source manifest and snapshot service.
- Story state snapshot service.
- Hotspot preflight service.
- Story command envelope and reason catalog.
- Story command result service for accepted, rejected, repeat/no-op, terminal, save, and interlude outcomes.
- Story event record and replay service.
- DOM projection record service.
- Browser adapter plan and readback service.
- Additive `GameHost` story diagnostics.
- DOM-free story fixture runner.
- Central ledger readback service.

## All kits

### Current kits

- `static-page-shell-kit`
- `aspect-frame-kit`
- `stage-render-kit`
- `scene-descriptor-consumer-kit`
- `anime-material-kit`
- `post-process-kit`
- `hotspot-volume-kit`
- `hotspot-picking-kit`
- `story-data-kit`
- `browser-story-runtime-kit`
- `localstorage-save-kit`
- `debug-json-projection-kit`
- `repo-local-agent-ledger-kit`

### Planned kits

- `story-source-manifest-kit`
- `story-source-snapshot-kit`
- `story-state-snapshot-kit`
- `stage-scene-snapshot-kit`
- `story-command-envelope-kit`
- `story-command-reason-kit`
- `story-preflight-kit`
- `story-command-result-kit`
- `story-event-record-kit`
- `story-replay-kit`
- `story-projection-record-kit`
- `save-projection-kit`
- `interlude-projection-kit`
- `stage-projection-kit`
- `browser-adapter-plan-kit`
- `browser-adapter-readback-kit`
- `gamehost-story-diagnostics-kit`
- `dom-free-story-fixture-kit`
- `repo-local-ledger-readback-kit`
- `central-ledger-readback-kit`

## Main finding

`src/game.js` remains the source-authority bottleneck. It owns story command interpretation, direct state mutation, save writes, interlude timing, route transitions, `StageKit` scene loading, DOM projection, reset behavior, and debug JSON. `StageKit` is stable enough to preserve while adding source-owned story command/result/readback proof.

## Do not start next with

- New rooms or story content.
- Audio, inventory, or route expansion.
- Renderer extraction or `StageKit` rewrite.
- Browser-only smoke tests without DOM-free fixture rows.
- LocalStorage format changes without compatibility records.

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Catch-up + Browser Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
pushed to main: pending at file creation time
```
