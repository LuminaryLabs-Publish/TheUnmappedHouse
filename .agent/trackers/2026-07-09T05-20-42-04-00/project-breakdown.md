# Project Breakdown: TheUnmappedHouse

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, update root `.agent` docs, identify loop/domains/services/kits, and log the result centrally.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repos against central repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read `package.json`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and planned kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, interaction, gameplay, story-authority, and deploy audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local/browser validation.
- [ ] Did not edit runtime/source files.

## Selection result

No checked non-Cavalry Publish repo was new, missing from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was selected as the oldest eligible central-ledger fallback.

## Repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-01-51-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible central latest 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
```

## Interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads the current scene descriptor
  -> side-panel button or raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot directly mutates inspected state, clue list, text, log, completion, interlude timing, UI, and save state
  -> continue button calls nextScene()
  -> nextScene directly mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
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
interlude overlay
fixed aspect frame
fixed camera stage render
scene descriptor rendering
stage layer descriptors
stage prop descriptors
hotspot volumes
hover label projection
raycast picking
anime material shader
post-process shader
browser debug projection
static deploy/check script
```

## Services that kits offer

```txt
AspectFrame kit:
  compute and apply fixed 16:9 frame.

StageKit:
  WebGL renderer, fixed camera, scene loading, layer/prop/hotspot construction, raycast picking, hover label, shader material updates, post-process render pass.

Story data kit:
  game title, scenes, cameras, layers, props, hotspots, grants, completion requirements, and interlude text.

Browser story runtime kit:
  saved-state load, direct mutation, clue grant, log write, completion check, interlude scheduling, UI projection, debug projection, save, and reset.

Next source-authority kits:
  manifest, snapshots, preflight, command envelope, command result, projections, browser adapter plan, adapter readback, GameHost diagnostics, central ledger readback, and DOM-free fixture rows.
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

`TheUnmappedHouse` should not be visually expanded yet. The current render path is good enough to preserve; the highest-value next implementation is to make story command/result/projection state source-owned and prove it with DOM-free fixture rows.

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Fixture Readback + Source Authority Consumer Freeze
```

## Validation

Documentation-only pass.

Runtime source was not changed.

Local validation was not run.

Browser validation was not run.

No branch or PR was created.
