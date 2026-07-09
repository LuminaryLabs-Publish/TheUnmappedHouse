# Project Breakdown: TheUnmappedHouse

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Summary

`TheUnmappedHouse` remains a fixed-camera anime point-and-click horror prototype with a stable visual surface and a browser-bound story authority seam.

This pass compared the current accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger, kept `TheCavalryOfRome` excluded, and selected `TheUnmappedHouse` as the oldest eligible documented fallback after newer central catch-ups moved `ZombieOrchard` and `PhantomCommand` forward.

## Repo selection comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-03-43-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible central latest 2026-07-09T11-00-39-04-00 before this update
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

No checked non-Cavalry repo was fully new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

## Current route

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

## Current interaction loop

```txt
open index.html
  -> src/game.js captures browser DOM nodes at module scope
  -> loadState() shallow-merges localStorage into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads the current scene descriptor
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly into DOM state
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Domains in use

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
planned-story-source-manifest
planned-story-command-result
planned-browser-adapter-readback
planned-dom-free-story-fixture
```

## Services that kits offer

```txt
package scripts:
  serve static route with python3 -m http.server 8080
  syntax-check src/aspect-frame.js, src/game.js, src/stage-kit.js, src/story-data.js

StageKit:
  WebGL renderer
  fixed 16:9 viewport
  camera setup
  shader materials
  render target
  post-process shader pass
  scene load
  layer/prop/hotspot construction
  pointer hover
  click picking
  resize
  animation

AspectFrame:
  deterministic 16:9 frame calculation
  DOM frame application

Story data:
  game title
  three scene descriptors
  camera descriptors
  layer/prop descriptors
  post-process settings
  hotspot IDs/labels/grants
  completion requirements
  interlude copy

Browser story runtime:
  current command handling
  state mutation
  save/load
  route transition
  interlude timing
  UI projection
  debug projection
  reset

Agent ledger:
  repo-local audit state
  tracker and turn-ledger handoff
  central ledger pointer
  next-cut fixture contract
```

## Kits identified

```txt
implemented:
  static-page-shell-kit
  aspect-frame-kit
  stage-render-kit
  anime-material-kit
  post-process-kit
  hotspot-volume-kit
  hotspot-picking-kit
  story-data-kit
  browser-story-runtime-kit
  localstorage-save-kit
  debug-json-projection-kit
  repo-local-agent-ledger-kit

next-cut:
  story-source-manifest-kit
  story-source-snapshot-kit
  story-state-snapshot-kit
  stage-scene-snapshot-kit
  story-command-envelope-kit
  story-command-reason-kit
  story-preflight-kit
  story-command-result-kit
  story-event-record-kit
  story-reducer-kit
  story-projection-kit
  save-projection-kit
  interlude-projection-kit
  stage-projection-kit
  browser-adapter-plan-kit
  browser-adapter-readback-kit
  gamehost-story-diagnostics-kit
  repo-local-ledger-readback-kit
  central-ledger-readback-kit
  dom-free-story-fixture-kit
```

## Main finding

Do not start next with more rooms, audio, inventory, StageKit rewrite, renderer extraction, or browser-only smoke gates.

The durable blocker is still `src/game.js`: it owns command dispatch, reducer behavior, save IO, route mutation, interlude scheduling, StageKit consumption, UI projection, reset, and debug JSON in one browser-bound file.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Ledger Refresh + Adapter Readback Fixture Gate
```

The next implementation should add pure `src/story-authority/*` modules and `scripts/validate-story-authority.mjs`, then adapt `src/game.js` to consume source-owned command/result/projection records without changing the visible route, story copy, save key, StageKit surface, hotspot picking, or interlude behavior.

## Validation

```txt
runtime source changed: no
documentation-only pass: yes
local npm run check: no
browser smoke: no
DOM-free story fixture run: no
branch created: no
pull request created: no
pushed to main: yes
```
