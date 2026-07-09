# Project Breakdown - The Unmapped House

**Timestamp:** `2026-07-09T13-38-15-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was new, ledger-absent, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` remains excluded.

`TheUnmappedHouse` was selected as the oldest eligible central-ledger fallback and central-sync repair target. Repo-local `.agent` state had advanced beyond central tracking, so this pass realigns the repo-local docs and the central ledger around the story authority/browser adapter fixture gate.

## Repo comparison

```txt
IntoTheMeadow        tracked / central latest 2026-07-09T12-08-46-04-00
HorrorCorridor       tracked / central latest 2026-07-09T12-30-09-04-00
AetherVale           tracked / central latest 2026-07-09T11-30-50-04-00
ZombieOrchard        tracked / central latest 2026-07-09T13-18-48-04-00
TheUnmappedHouse     selected / oldest eligible central-ledger fallback and central-sync repair
MyCozyIsland         tracked / central latest 2026-07-09T11-39-50-04-00
TheOpenAbove         tracked / central latest 2026-07-09T11-50-08-04-00
PhantomCommand       tracked / central latest 2026-07-09T13-00-37-04-00
TheCavalryOfRome     excluded by rule
PrehistoricRush      tracked / central latest 2026-07-09T12-00-36-04-00
```

## Product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click story prototype.

Current route:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes `serve` and `check`. The check command is syntax-only across `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as callback
  -> StageKit loads current fixed-camera scene descriptor
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
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
story scene descriptor
story hotspot descriptor
story clue ledger
story route state
story completion check
story interlude state
story notebook log
inspected hotspot state
localStorage save state
fixed 16:9 aspect frame
fixed camera stage render
stage layer descriptors
stage prop descriptors
stage hotspot volumes
hover label projection
raycast hotspot picking
anime material shader
post-process shader
browser debug projection
repo-local agent ledger
central repo ledger
```

## Services offered by kits

```txt
AspectFrame: deterministic 16:9 frame calculation and DOM application.
StageKit: renderer setup, fixed viewport, scene loading, camera descriptors, materials, layer/prop/hotspot meshes, raycast picking, hover labels, resize, post-process, and animation.
Story data: game title, scene descriptors, camera/stage/post descriptors, hotspot grants, completion requirements, and interlude copy.
Browser runtime: load/save, inspect, clue grant, completion check, notebook projection, interlude scheduling, scene continuation, reset key, and debug JSON.
Agent docs: repo-local audit state, tracker handoff, central ledger pointer sync, and next-cut fixture contract.
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
implemented/repo-local-agent-ledger-kit

next-cut/story-source-manifest-kit
next-cut/story-source-snapshot-kit
next-cut/story-state-snapshot-kit
next-cut/stage-scene-snapshot-kit
next-cut/story-command-envelope-kit
next-cut/story-command-reason-kit
next-cut/story-preflight-kit
next-cut/story-command-result-kit
next-cut/story-event-record-kit
next-cut/story-reducer-kit
next-cut/story-projection-kit
next-cut/save-projection-kit
next-cut/interlude-projection-kit
next-cut/stage-projection-kit
next-cut/browser-adapter-plan-kit
next-cut/browser-adapter-readback-kit
next-cut/gamehost-story-diagnostics-kit
next-cut/repo-local-ledger-readback-kit
next-cut/central-ledger-readback-kit
next-cut/dom-free-story-fixture-kit
```

## Main finding

The next blocker is not the visual surface. `StageKit` already owns fixed aspect framing, camera descriptor consumption, scene loading, material/post-process behavior, hotspot volumes, hover labels, raycast picking, resize, and animation.

The bottleneck is `src/game.js`: story command dispatch, mutation, completion, save intent, interlude intent, stage load intent, reset, UI projection, and debug output are all browser-bound.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Central Sync + Browser Adapter Fixture Gate
```

## Validation result

No runtime source changed.

No branch or PR was created.

No local check, fixture script, static server, browser smoke, or Pages smoke was run in this connector-only documentation pass.
