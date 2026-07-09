# Project Breakdown: TheUnmappedHouse Story Adapter Readback Ledger Refresh

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

**Branch target:** `main`

**Runtime source changed:** no

## Goal

Refresh the repo-local `.agent` operating memory for one eligible `LuminaryLabs-Publish` repo, confirm the current interaction loop/domains/services/kits, and sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger without changing runtime source.

## Selection checklist

- [x] Read the accessible `LuminaryLabs-Publish` installation repo list.
- [x] Compared Publish repos against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Checked the selected repo root `.agent/START_HERE.md` state.
- [x] Chose one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo source anchors: `package.json`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, and existing `.agent` docs.
- [x] Identified interaction loop, domains, kit services, implemented kits, and next-cut kits.
- [x] Added new timestamped tracker, turn ledger, architecture, render, interaction, gameplay, story-authority, and deploy audits.
- [x] Refreshed root `.agent` files.
- [x] Updated the central repo ledger and internal change log.
- [x] Pushed only to `main`; no branch or PR was created.

## Publish repo comparison

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

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was selected as the oldest eligible documented fallback and because its story-adapter/source-authority fixture gate is still unresolved.

## Source read

```txt
package.json:
  private module package with npm run serve and npm run check; check is node syntax validation for aspect-frame, game, stage-kit, and story-data.

src/game.js:
  imports StageKit and story-data; captures DOM nodes at module scope; owns SAVE_KEY, load/save, state/currentScene, inspectHotspot, nextScene, renderUi, interlude, reset, debug JSON, and StageKit dispatch wiring.

src/stage-kit.js:
  imports Three.js from CDN; owns WebGL renderer, fixed aspect frame, render target, shader materials, post-process pass, camera descriptor consumption, scene load, prop/layer/hotspot construction, hover label projection, raycast picking, resize, and animation.

src/story-data.js:
  owns game title, three scene descriptors, camera descriptors, stage layer/prop descriptors, post settings, hotspot ids, hotspot grants, completion requirements, and interlude text.
```

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene is resolved from saved sceneId or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as the callback
  -> StageKit loads currentScene
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot checks repeat inspection through state.inspected[currentScene.id]
  -> first inspection mutates inspected state, grants clues, writes text/log, checks sceneComplete, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log, renders UI, and saves without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates currentScene, state.sceneId, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly to interlude DOM
  -> KeyR clears localStorage and reloads
  -> renderUi emits ad hoc debug JSON
```

## Domains in use

```txt
static page shell
browser app runtime
story source descriptor domain
story scene descriptor domain
story hotspot descriptor domain
story completion requirement domain
story state domain
clue ledger domain
inspected hotspot domain
notebook log domain
scene route domain
localStorage save domain
interlude overlay domain
fixed aspect frame domain
fixed camera stage render domain
stage layer descriptor domain
stage prop descriptor domain
stage hotspot volume domain
hover label projection domain
raycast picking domain
anime material shader domain
post-process shader domain
browser debug projection domain
static deploy/check domain
```

## Services the kits offer

```txt
StageKit service:
  create WebGL renderer; apply 16:9 aspect frame; consume camera descriptors; build stage layers, props, and invisible hotspot volumes; raycast hotspots; project hover label; animate parallax camera drift; render into post-process target.

AspectFrame service:
  compute deterministic 16:9 viewport and apply frame sizing to the DOM host.

StoryData service:
  provide scene, camera, layer, prop, hotspot, clue, completion, and interlude descriptors.

BrowserStoryRuntime service:
  load/merge save state, dispatch hotspot inspection, grant clues, complete scenes, advance route, schedule interlude, render DOM UI, emit debug JSON, and save/reset localStorage.

Next story-authority services:
  create source manifest; snapshot source/state/stage; normalize loaded state; preflight commands; return command results; emit event records; project story/save/interlude/stage/browser adapter plans; read back adapter consumption; expose GameHost diagnostics; emit central ledger readback; run DOM-free fixtures.
```

## Implemented kits

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
```

## Next-cut kits

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
central-ledger-readback-kit
dom-free-story-fixture-kit
```

## Main finding

The render surface is not the next bottleneck. `StageKit` already provides a coherent fixed-camera visual adapter.

The bottleneck is still story authority and browser adapter collapse: `src/game.js` owns command dispatch, mutation, save IO, route progression, interlude timing, StageKit consumption, debug projection, and DOM rendering at the same time.

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Ledger Refresh + Source Fixture Gate
```

The next implementation should add source-owned story command/result fixtures and adapter readback before new rooms, audio, inventory, renderer extraction, route changes, or browser-only validation.

## Files updated in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T07-48-29-04-00-story-adapter-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-09T07-48-29-04-00-stage-projection-consumer-readback.md
.agent/interaction-audit/2026-07-09T07-48-29-04-00-hotspot-command-readback-freeze.md
.agent/gameplay-audit/2026-07-09T07-48-29-04-00-story-route-command-result-loop.md
.agent/story-authority-audit/2026-07-09T07-48-29-04-00-source-fixture-ledger-readback-contract.md
.agent/deploy-audit/2026-07-09T07-48-29-04-00-story-fixture-validation-wire-map.md
.agent/trackers/2026-07-09T07-48-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T07-48-29-04-00.md
```

## Validation status

```txt
runtime source changed: no
local npm run check: no
browser smoke: no
fixture script created: no
fixture script run: no
branch created: no
pull request created: no
pushed to main: yes
```
