# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T23-08-29-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` timestamps.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest eligible fallback by sampled root/central alignment. Its previous root alignment was `2026-07-08T21-00-12-04-00`, older than the other current sampled non-excluded repos.

This pass keeps the story-authority direction and tightens the next implementation into a source manifest plus adapter consumer fixture gate: `src/game.js` should become a consumer of story results and projections, not the owner of source fallback, inspection, transition, save, reset, and debug rules.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / oldest eligible sampled alignment 2026-07-08T21-00-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T21-40-45-04-00 / central readback previously recorded 2026-07-08T21-50-56-04-00
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

## Target adapter/projection loop

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
.agent/architecture-audit/2026-07-08T23-08-29-04-00-story-source-manifest-dsk-map.md
.agent/render-audit/2026-07-08T23-08-29-04-00-stage-projection-readback-fixture-map.md
.agent/interaction-audit/2026-07-08T23-08-29-04-00-hotspot-command-source-manifest.md
.agent/gameplay-audit/2026-07-08T23-08-29-04-00-story-command-journal-loop.md
.agent/story-authority-audit/2026-07-08T23-08-29-04-00-source-manifest-adapter-consumer-gate.md
.agent/deploy-audit/2026-07-08T23-08-29-04-00-npm-check-fixture-wire-map.md
.agent/trackers/2026-07-08T23-08-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T23-08-29-04-00.md
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
.github/workflows/deploy-pages.yml
```

## Source files to add next

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-preflight.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Main rule

Keep `index.html -> src/game.js`, `SAVE_KEY`, story copy, StageKit visuals, fixed 16:9 frame behavior, and current Pages deployment stable.

Do not expand story content, inventory, audio, new rooms, or renderer internals until story source manifest, preflight, command/result authority, projections, browser adapter plan, host diagnostics, and fixture rows are stable.

## Current next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Adapter Consumer Fixture Gate
```

Stop that ledge when fixture rows prove source validation, first inspect, repeat inspect, unknown hotspot, incomplete continue, completed room, scene transition, prototype complete, save/load, reset, stage snapshot, story projection, save projection, interlude projection, stage projection, browser adapter plan, and additive GameHost diagnostics without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.
