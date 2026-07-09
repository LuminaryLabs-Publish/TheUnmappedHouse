# Project Breakdown: TheUnmappedHouse

**Timestamp:** `2026-07-09T11-00-39-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Goal

Refresh the repo-local `.agent` audit state, repair mixed timestamp pointers, identify the current interaction loop, domains, kit services, and kits, then sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Selection result

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest central ledger fallback and mixed pointer repair target
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-20-44-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
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
static page shell
story source descriptors
browser app runtime
story state
localStorage save state
scene route state
clue ledger
notebook log
inspected hotspot state
interlude overlay
fixed aspect frame
fixed camera stage render
scene descriptor rendering
stage layer descriptors
stage prop descriptors
stage hotspot volumes
hover label projection
raycast picking
anime material shader
post-process shader
browser debug projection
static deploy/check script
repo-local agent ledger
central ledger readback
```

## Services the kits offer

```txt
AspectFrame: deterministic 16:9 frame calculation and DOM frame application.
StageKit: WebGL renderer, fixed 16:9 viewport, camera setup, shader materials, scene load, layer/prop/hotspot construction, pointer hover, click picking, resize, post-process, and animation.
Story data: game title, scene/hotspot/clue/interlude/camera/stage descriptor source.
Game runtime: browser-bound command handling, mutation, save, route, interlude, UI, debug, and reset service.
Agent docs: repo-local audit state, tracker/turn-ledger handoff, central ledger pointer, and next-cut fixture contract.
Planned story authority: source manifest, snapshots, preflight, command envelope, reason catalog, command result, projections, browser adapter plan, readback, diagnostics, central ledger readback, and fixtures.
```

## Kits

```txt
implemented/static-page-shell-kit
implemented/aspect-frame-kit
implemented/stage-render-kit
implemented/anime-material-kit
implemented/post-process-kit
implemented/hotspot-volume-kit
implemented/hotspot-picking-kit
implemented/story-data-kit
implemented/browser-story-runtime-kit
implemented/localstorage-save-kit
implemented/debug-json-projection-kit
implemented/repo-local-agent-ledger-kit
planned/story-source-manifest-kit
planned/story-source-snapshot-kit
planned/story-state-snapshot-kit
planned/stage-scene-snapshot-kit
planned/story-command-envelope-kit
planned/story-command-reason-kit
planned/story-preflight-kit
planned/story-command-result-kit
planned/story-event-record-kit
planned/story-reducer-kit
planned/story-projection-kit
planned/save-projection-kit
planned/interlude-projection-kit
planned/stage-projection-kit
planned/browser-adapter-plan-kit
planned/browser-adapter-readback-kit
planned/gamehost-story-diagnostics-kit
planned/repo-local-ledger-readback-kit
planned/central-ledger-readback-kit
planned/dom-free-story-fixture-kit
```

## Main finding

The renderer is not the first blocker. `StageKit` already provides the fixed-camera WebGL surface and descriptor consumption.

The blocker remains story authority and readback: `src/game.js` owns command dispatch, reducer behavior, save/route/interlude side effects, StageKit consumption, and debug projection in one browser-bound file.

## Next safe ledge

```txt
TheUnmappedHouse Central Ledger Sync + Story Adapter Fixture Gate
```

## Validation

```txt
Runtime source changed: no
Agent docs changed: yes
Central ledger changed: yes
Local validation run: no
Browser validation run: no
Branch created: no
PR created: no
Push target: main
```
