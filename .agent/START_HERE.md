# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-09T02-02-03-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent/START_HERE.md`, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected because repo-local `.agent` state had already advanced to `2026-07-09T01-50-17-04-00` while the central `LuminaryLabs-Dev/LuminaryLabs` ledger still pointed at `2026-07-08T23-19-33-04-00` before this run.

This pass refreshes the repo-local breakdown and central ledger around the same implementation ledge: story authority must move behind command/result/projection/readback contracts before new content or renderer work.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / repo-local latest 2026-07-09T01-50-17-04-00 newer than central 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T00-09-22-04-00
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

`package.json` exposes `npm run serve` and `npm run check`; the check is syntax-only across `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Current source loop

```txt
open index.html
  -> src/game.js imports StageKit plus story data
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene is resolved from scenes or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads current scene descriptors
  -> hotspot side-panel button or raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot directly mutates inspected state, clue state, text, log, completion, interlude timer, UI, and save
  -> continue button calls nextScene()
  -> nextScene directly mutates currentScene, sceneId, route, interlude DOM, StageKit scene, UI, and save
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Target adapter/readback loop

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

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T02-02-03-04-00-story-authority-central-ledger-splice-dsk-breakdown.md
.agent/render-audit/2026-07-09T02-02-03-04-00-stage-gamehost-readback-consumer-freeze.md
.agent/interaction-audit/2026-07-09T02-02-03-04-00-inspection-command-result-plan.md
.agent/gameplay-audit/2026-07-09T02-02-03-04-00-route-save-fixture-loop.md
.agent/story-authority-audit/2026-07-09T02-02-03-04-00-central-ledger-splice-readback-contract.md
.agent/deploy-audit/2026-07-09T02-02-03-04-00-npm-check-story-fixture-gate.md
.agent/trackers/2026-07-09T02-02-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T02-02-03-04-00.md
.agent/kit-registry.json
```

## Source files to inspect before implementation

```txt
README.md
package.json
index.html
src/game.js
src/stage-kit.js
src/story-data.js
src/aspect-frame.js
```

## Current next safe ledge

```txt
TheUnmappedHouse Story Authority Central Ledger Splice + Browser Adapter Readback Fixture Gate
```
