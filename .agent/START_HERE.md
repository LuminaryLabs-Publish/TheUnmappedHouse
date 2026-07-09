# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-09T10-54-04-04-00`

## Purpose

This folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before implementation changes.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from central tracking, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`TheUnmappedHouse` was selected as the oldest eligible central-ledger fallback and as a repo-local ledger repair target. Central tracking still pointed at `2026-07-09T08-02-33-04-00`; repo-local `START_HERE.md` had advanced to `2026-07-09T10-50-00-04-00` but referenced timestamped files that were not present. This pass replaces that inconsistent handoff with a complete `2026-07-09T10-54-04-04-00` audit set.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-20-44-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest central ledger and repo-local doc consistency repair target
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

Current route:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`src/game.js` owns browser command dispatch, story mutation, save IO, interlude timing, StageKit scene loading, DOM projection, reset, and debug JSON.

`src/stage-kit.js` owns the fixed 16:9 WebGL presentation surface, shader material, post-process pass, descriptor-driven stage loading, hotspot volumes, raycast picking, hover labels, resize, and animation.

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

## Current next safe ledge

```txt
TheUnmappedHouse Repo-Local Ledger Repair + Story Authority Fixture Gate
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T10-54-04-04-00-repo-local-ledger-repair-story-authority-dsk-map.md
.agent/render-audit/2026-07-09T10-54-04-04-00-stagekit-render-readback-gap.md
.agent/interaction-audit/2026-07-09T10-54-04-04-00-hotspot-repeat-adapter-readback.md
.agent/gameplay-audit/2026-07-09T10-54-04-04-00-story-command-result-fixture-loop.md
.agent/story-authority-audit/2026-07-09T10-54-04-04-00-repo-local-consistency-fixture-contract.md
.agent/deploy-audit/2026-07-09T10-54-04-04-00-check-script-fixture-wire-map.md
.agent/trackers/2026-07-09T10-54-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T10-54-04-04-00.md
```

## Main rule

Keep the current route, `SAVE_KEY`, story copy, fixed 16:9 StageKit surface, hotspot picking, interlude behavior, reset key, and existing debug panel stable.

Do not add rooms, audio, inventory, renderer extraction, or browser-only smoke gates before source-owned story command/result fixtures prove reducer output, browser adapter plans, adapter readback, stage projection, save/interlude intent, GameHost diagnostics, repo-local ledger consistency, and central ledger readback.
