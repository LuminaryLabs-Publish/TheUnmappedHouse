# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T08-39-05-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/TheUnmappedHouse`

Reason: the current public `LuminaryLabs-Publish` repository list was checked and compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. No checked non-Cavalry repo was new, absent from the ledger, missing sampled root `.agent`, recently added, or undocumented. `TheUnmappedHouse` was the oldest eligible documented fallback after `ZombieOrchard` advanced to `2026-07-10T08-28-26-04-00`.

`TheCavalryOfRome` remained excluded by rule.

## Runtime files inspected

```txt
index.html
package.json
src/game.js
src/stage-kit.js
src/story-data.js
```

## Interaction loop

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
  -> renderUi() writes title/text/hotspot buttons/debug JSON
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> final continue writes prototype-complete text directly into interlude DOM
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
story-command-projection-next
story-result-ledger-next
browser-adapter-readback-next
stage-load-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Services that the kits offer

- `story-data-kit`: source descriptors for title, scenes, hotspots, clue grants, completion requirements, interludes, cameras, stage layers/props, and post settings.
- `browser-story-runtime-kit`: browser-bound hotspot inspection, continue routing, mutation, persistence, DOM projection, reset, and debug JSON.
- `stage-render-kit`: Three.js WebGL renderer, camera, lights, fog, descriptor consumption, hotspot volumes, raycast picking, hover labels, and post-process.
- `aspect-frame-kit`: fixed 16:9 layout calculation and application.
- `localstorage-save-kit`: shallow story-state persistence.
- `notebook-log-kit`: recent story-log row management.
- `debug-json-projection-kit`: ad hoc current scene, clue, route, inspection, completion, and latest-log projection.
- Planned proof services: story source manifest, command envelope, preflight, command result, projection row, save/interlude/stage-load/terminal intents, adapter ledger rows, GameHost readback, and DOM-free fixture rows.

## Kits

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
story-command-envelope-kit
story-command-reason-kit
story-preflight-kit
story-command-result-kit
story-projection-ledger-kit
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

## Main finding

`TheUnmappedHouse` should not start next with new story rooms, inventory, audio, renderer extraction, visual polish, or a `StageKit` rewrite.

The blocker is story command projection proof. `src/game.js` still owns source command interpretation, mutation, save writes, interlude timing, route changes, StageKit scene loading, terminal DOM copy, reset, and debug JSON together. `StageKit` consumes descriptors and callbacks, but it exposes no serializable stage-load, pick, hover, or projection readback tied to story command results.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Projection Ledger Refresh + Browser Adapter Fixture Gate
```

## Validation

Docs-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in central repo
```
