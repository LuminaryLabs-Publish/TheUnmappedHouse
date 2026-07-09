# Project Breakdown — The Unmapped House

**Timestamp:** `2026-07-09T08-02-33-04-00`

**Repo:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch:** `main`

## Selection

The accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` central tracking and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` was excluded by rule.

`TheUnmappedHouse` was selected as the central-ledger catch-up target: central tracking still pointed to `2026-07-09T05-20-42-04-00` while repo-local `.agent` state had advanced to `2026-07-09T07-48-29-04-00`.

## Interaction loop

```txt
index.html
  -> src/game.js imports StageKit and story-data
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from state.sceneId or falls back to scenes[0]
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
browser app runtime
story source descriptors
story scene descriptors
story hotspot descriptors
story state
inspected hotspot state
clue ledger
notebook log
scene route state
localStorage save state
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
central ledger readback
```

## Services that kits offer

```txt
AspectFrame: deterministic 16:9 frame calculation and DOM frame application.
StageKit: renderer, camera, fixed aspect integration, render target, post-process shader, anime materials, scene loading, layer creation, prop creation, hotspot volume creation, pointer hover, click picking, resize, and animation.
Story data: game title, scenes, cameras, stage layers, props, post settings, hotspots, clue grants, completion requirements, and interlude copy.
Browser story runtime: load/save, direct story mutation, clue grant, completion check, interlude schedule, route mutation, UI projection, debug JSON, and reset.
Planned story authority: manifest, source snapshots, state snapshots, stage snapshots, command envelope, reason catalog, preflight, reducer/result, event records, story/save/interlude/stage projections, browser adapter plan, browser adapter readback, GameHost diagnostics, central ledger readback, and fixture rows.
```

## Kits identified

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
planned/central-ledger-readback-kit
planned/dom-free-story-fixture-kit
```

## Main finding

`StageKit` is not the next bottleneck. The visible renderer already owns the fixed camera, 16:9 frame, materials, post pass, hotspots, hover label, and raycast click flow.

`src/game.js` is still the source-authority bottleneck because it owns command dispatch, mutation, save/load, route transition, interlude timing, StageKit scene loading, UI projection, debug projection, and reset.

## Next safe ledge

```txt
TheUnmappedHouse Central Ledger Catch-up + Story Adapter Source Fixture Gate
```

## Validation

```txt
Runtime source changed: no
Agent docs changed: yes
Central ledger changed: yes
Local npm validation run: no
Browser validation run: no
Fixture script run: no
Branch created: no
Pushed to main: yes
```