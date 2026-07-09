# Project Breakdown — TheUnmappedHouse

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Selection result

`TheUnmappedHouse` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against central tracking and sampled root `.agent` state.

No checked non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` was excluded by standing rule.

`TheUnmappedHouse` had the oldest eligible central ledger timestamp among checked repos at this pass.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible central-ledger fallback / central latest 2026-07-09T11-00-39-04-00
```

## Interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads the current scene descriptor
  -> side-panel button or raycast click calls inspectHotspot(hotspot)
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
story-authority-readback-next
browser-adapter-readback-next
DOM-free-story-fixture-next
```

## Services that kits offer

```txt
AspectFrame:
  computeAspectFrame(width, height)
  applyAspectFrame(element, frame)
  fixed 1920x1080 / 16:9 viewport policy

StageKit:
  WebGL renderer setup
  fixed 16:9 viewport integration
  camera setup from descriptors
  anime material shader
  post-process shader pass
  scene load from descriptors
  layer, prop, and hotspot construction
  pointer hover projection
  hotspot raycast picking
  resize handling
  animation loop

Story data:
  game title descriptor
  scene descriptors
  camera descriptors
  stage layer descriptors
  prop descriptors
  hotspot descriptors
  clue grants
  completion requirements
  interlude text

Browser story runtime:
  load/save state
  inspect hotspot command handling
  clue grant mutation
  notebook log mutation
  scene completion check
  interlude scheduling
  next scene transition
  reset key behavior
  DOM projection
  debug JSON projection

Planned story authority:
  source manifest
  source/state/stage snapshots
  preflight
  command envelope
  reason catalog
  command result
  event records
  story reducer
  story/save/interlude/stage projections
  browser adapter plan
  browser adapter readback
  GameHost story diagnostics
  repo-local ledger readback
  central ledger readback
  DOM-free fixture rows
```

## Kits

### Implemented / active kits

```txt
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
```

### Next-cut kits

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

The visual StageKit path is already sufficient for the current route. The next meaningful improvement is a pure story-authority and browser-adapter proof layer so the browser consumes typed story results instead of mutating story, save, interlude, stage, and debug state directly inside `src/game.js`.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Readback + Central Ledger Fixture Gate
```

## Validation

Documentation-only pass. Runtime source was not changed. Local validation was not run. Updates were pushed to `main` only.
