# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T02-19-14-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/TheUnmappedHouse`.

`TheCavalryOfRome` was excluded by rule. No checked non-Cavalry repo was new, missing from central tracking, missing root `.agent`, recently added but undocumented, or otherwise undocumented, so this pass used the oldest documented-selection fallback.

## Plan ledger

- [x] Compare current Publish repo list against central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select one repo only.
- [x] Inspect repo-local `.agent` state.
- [x] Inspect package, HTML shell, story runtime, stage renderer, and story descriptors.
- [x] Identify interaction loop.
- [x] Identify domains in use.
- [x] Identify services that kits offer.
- [x] Identify current and next-cut kits.
- [x] Add timestamped tracker and audit entries.
- [x] Refresh root `.agent` docs.
- [x] Sync central ledger and internal change-log.
- [ ] Runtime source changed.
- [ ] Local/browser validation run.

## Current interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> script type=module loads ./src/game.js
  -> src/game.js imports StageKit and story descriptors
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
browser-adapter-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Services

- `static-page-shell-kit`: mounts the stage, story panel, hotspot list, debug JSON, hover label, and interlude overlay.
- `aspect-frame-kit`: keeps the fixed 16:9 frame scaled and positioned.
- `story-data-kit`: provides source descriptors for title, scenes, hotspots, clue grants, requirements, interludes, camera, stage, and post settings.
- `browser-story-runtime-kit`: owns load/save, inspect, clue grant, log write, completion check, route transition, terminal copy, reset, DOM projection, and debug JSON.
- `stage-render-kit`: owns Three renderer, camera, lights, fog, render target, post pass, shader material, resize, and animation.
- `scene-descriptor-consumer-kit`: consumes layer, prop, hotspot, camera, fog, background, and post descriptors into rendered scene state.
- `hotspot-volume-kit`: builds invisible raycast meshes and carries source hotspot data in `userData`.
- `hotspot-picking-kit`: converts pointer input into hover/click callback events.
- Planned story authority services: source manifest, source snapshots, preflight, command envelopes, reason catalog, command results, projection records, save/interlude/stage/terminal intents, browser adapter readback, replay rows, and fixture rows.

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

## Main finding

`src/game.js` remains the source-authority bottleneck. It owns command dispatch, mutation, clue grants, completion checks, interlude scheduling, save writes, StageKit scene loading, terminal copy, DOM projection, reset, and debug JSON together.

`StageKit` should stay stable next. The right next cut is source-owned story command/result/projection/readback proof plus a DOM-free browser-adapter fixture.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Adapter Readback Catch-up + Browser Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
pushed to main: yes
central ledger updated: pending this pass
```
