# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T23-19-33-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected as the central-ledger catch-up fallback because its repo-local `.agent` state had advanced to `2026-07-08T23-08-29-04-00` while the central ledger still pointed at `2026-07-08T21-00-12-04-00`. This pass keeps the repo on the same implementation ledge and records the sharper browser-adapter readback contract.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / central ledger lagged root .agent 2026-07-08T23-08-29-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central alignment 2026-07-08T21-50-56-04-00
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The current route remains:

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
  -> DOM-free fixture rows
  -> browser host consumes projections without owning rules
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T23-19-33-04-00-story-browser-adapter-readback-dsk-map.md
.agent/render-audit/2026-07-08T23-19-33-04-00-stage-projection-consumer-readback.md
.agent/interaction-audit/2026-07-08T23-19-33-04-00-hotspot-command-adapter-readback.md
.agent/gameplay-audit/2026-07-08T23-19-33-04-00-story-result-adapter-loop.md
.agent/story-authority-audit/2026-07-08T23-19-33-04-00-central-ledger-adapter-readback-contract.md
.agent/deploy-audit/2026-07-08T23-19-33-04-00-fixture-check-wire-map.md
.agent/trackers/2026-07-08T23-19-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T23-19-33-04-00.md
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

## Next safe ledge

```txt
TheUnmappedHouse Story Browser Adapter Readback + Central Ledger Catch-up Fixture Gate
```

Preserve the route, story copy, `SAVE_KEY`, StageKit visuals, and fixed 16:9 frame. Add source-owned story authority, browser-adapter readback, GameHost story diagnostics, and fixture rows before new rooms, inventory, audio, or renderer extraction.
