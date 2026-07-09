# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

`TheUnmappedHouse` remains a compact fixed-camera anime point-and-click horror prototype with a stable visual route and a browser-bound story authority bottleneck.

The current pass compared the accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent` state. No non-Cavalry repo was fully new, ledger-absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was selected as the oldest eligible documented fallback. The next implementation should preserve the visible route and cut the story command/result/browser-adapter proof boundary before adding content or visual systems.

## Full repo-list comparison result

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-30-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible central latest 2026-07-09T05-20-42-04-00
```

## Source read

```txt
package.json:
  exposes npm run serve and npm run check; check is syntax-only across src/aspect-frame.js, src/game.js, src/stage-kit.js, and src/story-data.js.

src/game.js:
  imports StageKit and story-data; captures DOM nodes at module scope; owns SAVE_KEY, load/save, state/currentScene, inspectHotspot, nextScene, renderUi, interlude, reset, and debug JSON.

src/stage-kit.js:
  imports Three.js from CDN; owns renderer, fixed 16:9 aspect frame integration, render target, post-process shader pass, anime material, scene loading, layer/prop/hotspot construction, raycast picking, hover label, resize, and animation.

src/story-data.js:
  owns gameTitle, three scene descriptors, camera descriptors, stage layers, props, post-process settings, hotspot IDs, hotspot grants, completion requirements, and interlude text.
```

## Main finding

The render surface is not the immediate problem. `StageKit` already owns the fixed design frame, camera descriptor consumption, shader material, post-process pass, hotspot volumes, hover label, and raycast picking.

The source-authority problem is still concentrated in `src/game.js`: it is simultaneously command dispatcher, reducer, browser adapter, localStorage adapter, route adapter, interlude scheduler, debug projector, StageKit consumer, and save writer.

The highest-value next pass is a source-owned story-adapter fixture layer with stable command envelopes, preflight, command results, projections, browser adapter plans, adapter readback, GameHost diagnostics, and central-ledger readback.

## Current interaction loop

```txt
open index.html
  -> src/game.js loads story source and saved state
  -> StageKit loads the current fixed-camera scene
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, grants clues, writes text/log, checks scene completion, schedules interlude, renders UI, and saves
  -> repeat hotspot branch writes text/log/UI/save without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly into DOM state
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Target authority loop

```txt
UI event or StageKit callback
  -> StorySourceManifest
  -> StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> CentralLedgerReadback
  -> DOM-free fixture rows
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
```

## Services the kits offer

```txt
StageKit: WebGL renderer, fixed 16:9 viewport, camera setup, shader materials, scene load, layer/prop/hotspot construction, pointer hover, click picking, and animation.
AspectFrame: deterministic 16:9 frame calculation and DOM frame application.
Story data: scene/hotspot/clue/interlude descriptor source.
Game runtime: current browser-bound command handling, mutation, save, route, interlude, UI, debug, and reset service.
Next story-authority kits: source manifest, source snapshots, preflight, command envelope, command result, projections, browser adapter plan, readback, diagnostics, central ledger readback, and fixtures.
```

## Kits identified

```txt
implemented/static-page-shell-kit
implemented/aspect-frame-kit
implemented/stage-render-kit
implemented/anime-material-kit
implemented/post-process-kit
implemented/hotspot-picking-kit
implemented/story-data-kit
implemented/browser-story-runtime-kit
implemented/localstorage-save-kit
implemented/debug-json-projection-kit
planned/story-source-manifest-kit
planned/story-command-envelope-kit
planned/story-preflight-kit
planned/story-command-result-kit
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

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Ledger Refresh + Source Fixture Gate
```
