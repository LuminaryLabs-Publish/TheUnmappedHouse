# Project Breakdown: TheUnmappedHouse Story Adapter Ledger Refresh

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

**Branch target:** `main`

## Goal

Refresh the repo-local `.agent` docs and central ledger for `TheUnmappedHouse`, then keep the next implementation ledge focused on source-owned story command/result fixtures and browser adapter readback.

## Selection result

The current public `LuminaryLabs-Publish` organization list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent` state.

No checked public non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest eligible documented fallback among the current public non-Cavalry repos. Its central ledger was at `2026-07-09T16-58-52-04-00`, older than the other checked eligible public entries after the `2026-07-09T18-49-13-04-00` ZombieOrchard refresh.

## Public Publish repos observed

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible documented fallback / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T18-49-13-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T18-41-55-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T18-30-30-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T18-20-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Product read

`TheUnmappedHouse` is a static fixed-camera anime point-and-click horror prototype.

Current route:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes `npm run serve` and a syntax-only `npm run check` for `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Current interaction loop

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
static page shell
16:9 aspect frame
story source descriptors
browser app runtime
story state
localStorage save state
scene route state
clue ledger
notebook log
inspected hotspot state
interlude overlay
fixed-camera stage render
scene descriptor rendering
stage layer descriptors
stage prop descriptors
stage hotspot volumes
raycast hotspot picking
hover label projection
anime material shader
post-process shader
browser debug JSON projection
syntax-only check script
repo-local agent ledger
central repo ledger
story adapter readback next
DOM-free story fixture next
```

## Services that kits offer

```txt
AspectFrame service:
  deterministic 1920x1080 design frame, aspect calculation, and DOM frame application

StageKit service:
  Three.js WebGL renderer, fixed 16:9 viewport, camera descriptor consumption, shader materials, render target, post-process pass, descriptor-driven layer/prop/hotspot construction, raycast picking, hover labels, resize, and animation

Story data service:
  title, scene descriptors, camera descriptors, stage descriptors, hotspot descriptors, clue grants, completion requirements, and interlude copy

Browser story runtime service:
  load/save, command dispatch, story mutation, route changes, interlude timing, StageKit load calls, UI projection, reset, and debug JSON

Agent ledger service:
  root `.agent` handoff docs, timestamped tracker, turn ledger, audit set, central repo ledger, and internal change log

Planned story authority service:
  source manifest, command envelopes, preflight, typed result rows, projections, adapter plan, adapter readback, host diagnostics, repo/central ledger readback, and DOM-free fixture rows
```

## Kits identified

### Implemented kits

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

`src/game.js` remains the source-authority bottleneck. It owns command interpretation, mutation, save writes, interlude timing, route transitions, StageKit scene loading, DOM projection, reset, and debug JSON.

The render surface should stay stable next. `StageKit` already handles the fixed 16:9 frame, Three.js renderer, camera descriptors, shader material path, post-process pass, descriptor loading, hotspot volumes, raycast picking, hover labels, resize, and animation loop.

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Ledger Refresh + Browser Fixture Gate
```

## Do not start next with

```txt
new rooms
audio
inventory
StageKit rewrite
renderer extraction
browser-only smoke gate
Pages workflow churn
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
repo-local docs pushed to main: yes
central ledger synced: yes
```
