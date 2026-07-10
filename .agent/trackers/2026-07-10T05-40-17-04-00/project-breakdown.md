# TheUnmappedHouse Project Breakdown

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/TheUnmappedHouse`.

The public `LuminaryLabs-Publish` repository page was checked and shows 9 repositories. `TheCavalryOfRome` was excluded. No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was the oldest eligible documented fallback at central comparison time.

## Public repos observed

```txt
LuminaryLabs-Publish/TheUnmappedHouse     selected / prior central latest 2026-07-10T04-22-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T05-11-51-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T05-21-20-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T05-28-12-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime horror point-and-click prototype.

The active browser route is:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`src/story-data.js` is the current source descriptor file. `src/game.js` is the browser runtime and currently also acts as story command authority.

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
story-command-authority-next
story-command-result-next
browser-adapter-readback-next
stage-load-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Kit services

```txt
static-page-shell-kit: fixed HTML shell, stage, story panel, hotspot list, debug, hover label, interlude.
aspect-frame-kit: fixed 1920 x 1080 frame sizing and positioning.
story-data-kit: source descriptors for scenes, hotspots, grants, required clues, interludes, camera, stage, and post settings.
browser-story-runtime-kit: load/save, inspect, clue grant, log write, completion check, route transition, terminal copy, reset, DOM debug.
stage-render-kit: Three renderer, scene, camera, lights, fog, render target, post scene, shader material, resize, animation.
scene-descriptor-consumer-kit: consumes layer/prop/hotspot descriptors into meshes, camera state, fog, and post uniforms.
hotspot-volume-kit: invisible hotspot meshes carrying source hotspot data.
hotspot-picking-kit: pointer normalization, raycaster picking, hover state, click dispatch.
localstorage-save-kit: shallow story-state persistence.
debug-json-projection-kit: ad hoc debug projection for scene, clues, route, inspected state, completion, latest log.
```

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

`TheUnmappedHouse` should not start next with new rooms, inventory, audio, renderer extraction, or a StageKit rewrite.

The blocker is still browser adapter authority. `src/game.js` owns command dispatch, mutation, clue grants, completion checks, interlude scheduling, save writes, StageKit scene loading, terminal copy, DOM projection, reset, and debug JSON together.

## Next safe ledge

```txt
TheUnmappedHouse Browser Adapter Readback Refresh + Story Fixture Gate
```

First source-own story command/result/readback rows, then adapt `src/game.js` as the browser consumer.

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
central ledger updated: yes
```
