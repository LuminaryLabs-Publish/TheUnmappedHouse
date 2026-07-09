# Project Breakdown: TheUnmappedHouse Story Fixture Readback Ledger Refresh

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Goal

Refresh the repo-local internal docs for `TheUnmappedHouse`, compare the full accessible `LuminaryLabs-Publish` repo list against central ledger state, and identify the next source-owned story fixture/readback ledge.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repos.
- [x] Compared against `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected exactly one repo.
- [x] Identified interaction loop.
- [x] Identified all domains in use.
- [x] Identified services offered by current and planned kits.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Updated required root `.agent` files.
- [x] Added architecture/render/interaction/gameplay/story-authority/deploy audits.
- [x] Added timestamped turn-ledger entry.
- [x] Prepared central ledger/change-log sync.
- [x] Used `main`; no branch or PR.

## Selected repo

```txt
LuminaryLabs-Publish/TheUnmappedHouse
```

## Selection reason

No checked non-Cavalry Publish repo was new, missing from central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was the oldest eligible documented-selection fallback at central ledger comparison time.

## Publish org comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-34-14-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible fallback / central latest 2026-07-09T13-38-15-04-00
```

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as callback
  -> StageKit loads current scene descriptor
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks scene completion, schedules interlude, renders UI, and saves
  -> repeated inspection writes text/log/UI/save without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
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
static-page-shell-kit:
  HTML shell, stage mount, story panel, hotspot list, debug notebook, hover label, interlude overlay, continue button, module entry.

aspect-frame-kit:
  deterministic design frame dimensions, aspect-ratio calculation, DOM frame application.

stage-render-kit:
  Three.js renderer, fixed 16:9 viewport, render target, scene/camera/light setup, frame animation.

anime-material-kit:
  triplanar/noise/toon shader material for stage layers and props.

post-process-kit:
  grain, vignette, chromatic offset, distortion, scan/memory pass.

hotspot-volume-kit:
  invisible box volumes from story descriptors.

hotspot-picking-kit:
  pointer normalization, raycast lookup, hover label projection, click callback.

story-data-kit:
  game title, scenes, cameras, stage layers, props, hotspots, clues, completion requirements, interlude text.

browser-story-runtime-kit:
  mutable story state, command handling, route progression, save writes, interlude scheduling, DOM projection, reset.

localstorage-save-kit:
  shallow saved-state load and JSON persistence through SAVE_KEY.

debug-json-projection-kit:
  debug pre projection of title, scene, clues, route, inspected state, complete state, and latest log.

repo-local-agent-ledger-kit:
  agent start, current audit, known gaps, next steps, validation, kit registry, timestamped audits.

planned fixture/readback kits:
  source manifest, snapshots, preflight, command/result, event records, projections, browser adapter plan, adapter readback, host diagnostics, repo-local and central ledger readback, DOM-free fixtures.
```

## Kits identified

### Implemented/static kits

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

`TheUnmappedHouse` should not get more rooms, audio, inventory, or a StageKit rewrite next. The immediate blocker is that `src/game.js` owns story command authority and browser mutation together, while repeat inspections, terminal continuation, save intent, interlude intent, and debug projection have no typed command/result/readback fixture.

## Next safe ledge

```txt
TheUnmappedHouse Story Fixture Readback Ledger Refresh + Browser Adapter Gate
```

## Files changed by this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T16-50-00-04-00-story-fixture-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-09T16-50-00-04-00-stagekit-readback-contract-map.md
.agent/interaction-audit/2026-07-09T16-50-00-04-00-hotspot-command-repeat-result-map.md
.agent/gameplay-audit/2026-07-09T16-50-00-04-00-story-route-fixture-loop.md
.agent/story-authority-audit/2026-07-09T16-50-00-04-00-command-result-projection-readback-contract.md
.agent/deploy-audit/2026-07-09T16-50-00-04-00-story-fixture-check-wire-map.md
.agent/trackers/2026-07-09T16-50-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T16-50-00-04-00.md
```

## Validation

Documentation-only pass.

Runtime source changed: no.

Local validation run: no.

Branch created: no.

Pull request created: no.

Target branch: `main`.
