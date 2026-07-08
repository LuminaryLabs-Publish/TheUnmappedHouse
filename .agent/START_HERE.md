# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T16-19-57-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheUnmappedHouse` was selected as the oldest sampled root-agent fallback because its last root alignment was `2026-07-08T14-31-06-04-00`, older than the other sampled non-excluded repos. The current high-value seam is still story authority, but this pass narrows it from a broad host-integration map into an exact source-file cutover contract.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T15:49:18-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / repo-local alignment 2026-07-08T16-10-36-04-00; central ledger still older at sampled readback
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / oldest sampled root alignment 2026-07-08T14-31-06-04-00
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
  -> applyStoryCommand()
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
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
.agent/architecture-audit/2026-07-08T16-19-57-04-00-story-authority-source-file-map.md
.agent/render-audit/2026-07-08T16-19-57-04-00-stage-snapshot-projection-boundary.md
.agent/interaction-audit/2026-07-08T16-19-57-04-00-story-result-host-adapter-contract.md
.agent/gameplay-audit/2026-07-08T16-19-57-04-00-route-completion-result-loop.md
.agent/story-authority-audit/2026-07-08T16-19-57-04-00-source-file-cutover-contract.md
.agent/trackers/2026-07-08T16-19-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T16-19-57-04-00.md
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
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Main rule

Keep `index.html -> src/game.js`, `SAVE_KEY`, story copy, StageKit visuals, fixed 16:9 frame behavior, and current Pages deployment stable.

Do not expand story content, inventory, audio, new rooms, or renderer internals until story command/result authority is fixture-readable and the host consumes projections instead of owning rules.

## Current next safe ledge

```txt
TheUnmappedHouse Story Authority Source File Cutover + Host Projection Fixture Gate
```

Stop that ledge when fixture rows prove first inspect, repeat inspect, unknown hotspot, incomplete continue, completed room, scene transition, prototype complete, save/load, reset, descriptor validation, stage snapshot, story projection, save projection, interlude projection, and additive GameHost diagnostics without DOM, WebGL, localStorage, setTimeout, or StageKit raycasting.