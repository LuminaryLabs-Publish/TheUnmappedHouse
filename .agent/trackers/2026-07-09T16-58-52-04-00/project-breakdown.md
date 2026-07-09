# Project Breakdown - The Unmapped House

**Timestamp:** `2026-07-09T16-58-52-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

## Goal

Refresh repo-local `.agent` state, compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, identify loop/domains/services/kits, and sync the central ledger/change-log in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

- [x] Compared the accessible `LuminaryLabs-Publish` org repo list.
- [x] Compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger entries.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Confirmed the repo has root `.agent` state.
- [x] Identified interaction loop.
- [x] Identified active domains.
- [x] Identified kit services.
- [x] Identified implemented and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added turn-ledger, architecture, render, interaction, gameplay, story-authority, and deploy audits.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source edit.
- [ ] Local `npm run check`.
- [ ] Browser smoke.
- [ ] DOM-free story fixture run.

## Selection result

No checked non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was selected because it was the oldest eligible documented-selection fallback and because central tracking still pointed at `2026-07-09T13-38-15-04-00`, while repo-local `.agent` state had already advanced to `2026-07-09T16-50-00-04-00`.

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
AspectFrame: 16:9 frame calculation and DOM application.
StageKit: renderer, viewport, camera, shader material, scene load, layer/prop/hotspot construction, pointer hover, click picking, resize, post-process, animation.
Story data: title, scene, hotspot, clue, completion, interlude, camera, and stage descriptors.
Game runtime: browser command handling, mutation, save, route, interlude, UI, debug, and reset.
Agent docs: repo-local handoff, tracker state, central pointer state, and fixture planning.
Planned story authority: manifest, command envelope, preflight, reducer, results, projections, adapter plan, readback, diagnostics, and ledger fixtures.
```

## Kits

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

`src/game.js` is still the source-authority bottleneck. It owns command interpretation, mutation, save writes, interlude timing, route transitions, StageKit consumption, DOM projection, reset, and debug JSON.

`StageKit` should remain stable next because its fixed-camera render path already has clear descriptor consumption and hotspot picking behavior.

## Next safe ledge

```txt
TheUnmappedHouse Story Fixture Readback Central Catch-up + Browser Adapter Gate
```

## Validation

This was a docs-only connector pass. No runtime files changed, no local check was run, no browser smoke was run, and no fixture exists yet.
