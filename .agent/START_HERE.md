# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T18-51-55-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest currently eligible fallback because its prior central/root alignment was `2026-07-08T16-19-57-04-00`, older than the other sampled non-excluded repos after the current ledger comparison.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central alignment 2026-07-08T17-49-51-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central alignment 2026-07-08T16-20-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / oldest eligible alignment 2026-07-08T16-19-57-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central alignment 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central alignment 2026-07-08T18-29-21-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central alignment 2026-07-08T16-51-11-04-00
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

The player inspects hotspot volumes in locked-camera diorama scenes, collects clue state, completes a room when all required clues are found, reads an interlude, and continues to the next scene.

## Current source loop

```txt
open index.html
  -> src/game.js loads story source and saved state
  -> StageKit loads the current fixed-camera scene
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, grants clues, writes text/log, checks scene completion, schedules interlude, renders UI, and saves
  -> continue button calls nextScene()
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
  -> KeyR clears localStorage and reloads
  -> debug panel emits an ad hoc JSON projection
```

## Target authority loop

```txt
UI event or StageKit callback
  -> StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> StoryPreflight
  -> applyStoryCommand()
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
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
.agent/architecture-audit/2026-07-08T18-51-55-04-00-story-preflight-dsk-map.md
.agent/render-audit/2026-07-08T18-51-55-04-00-stage-projection-readback-contract.md
.agent/interaction-audit/2026-07-08T18-51-55-04-00-hotspot-command-preflight-map.md
.agent/gameplay-audit/2026-07-08T18-51-55-04-00-route-save-result-loop.md
.agent/story-authority-audit/2026-07-08T18-51-55-04-00-preflight-result-fixture-contract.md
.agent/trackers/2026-07-08T18-51-55-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-51-55-04-00.md
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
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Main rule

Keep `index.html -> src/game.js`, `SAVE_KEY`, story copy, StageKit visuals, fixed 16:9 frame behavior, and current Pages deployment stable.

Do not expand story content, inventory, audio, new rooms, or renderer internals until story preflight, command/result authority, projections, host diagnostics, and fixture rows are stable.

## Current next safe ledge

```txt
TheUnmappedHouse Story Preflight Result Fixture Contract + Stage Projection Readback Gate
```

Stop that ledge when fixture rows prove source validation, first inspect, repeat inspect, unknown hotspot, incomplete continue, completed room, scene transition, prototype complete, save/load, reset, stage snapshot, story projection, save projection, interlude projection, stage projection, and additive GameHost diagnostics without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.
