# Project Breakdown: TheUnmappedHouse

**Timestamp:** `2026-07-09T10-50-00-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

## Goal

Refresh repo-local operating docs for `TheUnmappedHouse`, identify the interaction loop, domains, services, and kits, and keep central tracking aligned without touching runtime source.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repo list.
- [x] Compared Publish repos against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read `src/game.js` and `src/stage-kit.js` source anchors.
- [x] Identified current interaction loop.
- [x] Identified current domains.
- [x] Identified services that kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture, render, interaction, gameplay, story-authority, and deploy audits.
- [x] Added timestamped turn ledger entry.
- [x] Updated central ledger and internal change log.

## Selection

`TheUnmappedHouse` was selected as the oldest eligible documented-selection fallback observed in this run after the full accessible `LuminaryLabs-Publish` list was compared against central ledger state and sampled root `.agent` state.

No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented.

## Publish repo comparison

```txt
IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00
AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
TheUnmappedHouse     selected / central latest 2026-07-09T08-02-33-04-00
MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-20-44-04-00
TheCavalryOfRome     excluded by rule
PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
```

## Current interaction loop

```txt
open index.html
  -> src/game.js loads story source and saved state
  -> StageKit loads the current fixed-camera scene
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat hotspot branch writes text/log/UI/save without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
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
central-ledger-readback
```

## Services that kits offer

```txt
StageKit:
  WebGL renderer, fixed viewport, camera setup, shader materials, scene loading, layer/prop/hotspot construction, pointer hover, raycast click picking, resize, and animation.

AspectFrame:
  deterministic 16:9 frame calculation and DOM frame application.

Story data:
  scene descriptors, hotspot descriptors, clue grants, completion requirements, route copy, and interlude text.

Browser story runtime:
  current command handling, mutation, localStorage save/load, route advancement, interlude scheduling, UI projection, debug projection, and reset.

Next story-authority services:
  source manifest, source snapshots, preflight, command envelope, command result, event ledger, projections, adapter plan, adapter readback, GameHost diagnostics, central ledger readback, and DOM-free fixtures.
```

## Kits

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
  story-command-ledger-kit
  story-reducer-kit
  story-projection-kit
  save-projection-kit
  interlude-projection-kit
  stage-projection-kit
  browser-adapter-plan-kit
  browser-adapter-readback-kit
  gamehost-story-diagnostics-kit
  central-ledger-readback-kit
  dom-free-story-fixture-kit
```

## Main finding

The renderer is not the next blocker. `StageKit` already holds a coherent fixed-camera visual surface with descriptor loading, hotspot picking, and post-processing.

The next blocker is source authority: `src/game.js` must stop being the place where story commands, mutation, save intent, interlude intent, StageKit scene load intent, DOM projection, and debug output are decided.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Result Ledger + Adapter Readback Fixture Gate
```

## Validation

Documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
DOM-free fixture run: no
pushed to main: yes
```
