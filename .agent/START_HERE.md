# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T12-59-11-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.

No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as the oldest observed eligible fallback follow-up with an actionable source-backed blocker: the story fixture replay contract now needs a concrete reducer module map, result row schema, projection map, and fixture matrix.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T12:29:17-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T12:01:23-04:00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central update 2026-07-08T11:49:04-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T12:41:31-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T12:09:27-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T12:51:50-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central update 2026-07-08T12:21:20-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T11:40:00-04:00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / latest central update 2026-07-08T11:28:38-04:00
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The current public route remains:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

The player inspects hotspot volumes in locked-camera diorama scenes, collects clue state, completes a room when all required clues are found, reads an interlude, and continues to the next scene.

## Current source loop

```txt
DOM button or StageKit hotspot click
  -> inspectHotspot(hotspot)
  -> mutate inspected map
  -> grant clue strings directly
  -> update text and notebook log
  -> sceneComplete(currentScene)
  -> maybe setTimeout(showInterlude, 450)
  -> renderUi()
  -> saveState()
```

## Target reducer loop

```txt
StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> validateStoryCommand
  -> applyStoryCommand
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> GameHost diagnostics
  -> DOM-free fixture rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T12-59-11-04-00-story-result-reducer-map.md
.agent/render-audit/2026-07-08T12-59-11-04-00-stage-projection-readback.md
.agent/interaction-audit/2026-07-08T12-59-11-04-00-story-result-fixture-rows.md
.agent/trackers/2026-07-08T12-59-11-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-59-11-04-00.md
.agent/kit-registry.json
```

Earlier breakdown entries remain useful context:

```txt
.agent/trackers/2026-07-08T01-50-19-04-00/project-breakdown.md
.agent/trackers/2026-07-08T02-40-00-04-00/project-breakdown.md
.agent/trackers/2026-07-08T03-42-00-04-00/project-breakdown.md
.agent/trackers/2026-07-08T04-00-00-04-00/project-breakdown.md
.agent/trackers/2026-07-08T05-28-26-04-00/project-breakdown.md
.agent/trackers/2026-07-08T08-21-49-04-00/project-breakdown.md
.agent/trackers/2026-07-08T10-01-57-04-00/project-breakdown.md
.agent/trackers/2026-07-08T11-28-38-04-00/project-breakdown.md
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
src/styles.css
.github/workflows/deploy.yml
```

## Main rule

Do not make story authority depend on DOM state, WebGL state, localStorage, `setTimeout`, or StageKit picking internals.

The next implementation should preserve `index.html -> src/game.js`, current story copy, current `SAVE_KEY`, current StageKit visuals, and current Pages workflow while adding pure story authority helpers, DOM-free fixture replay, and additive `window.GameHost.getState()` diagnostics.

## Current next safe ledge

```txt
TheUnmappedHouse Story Result Reducer Implementation Map + Fixture Rows
```

Stop that ledge when fixture rows can prove initial state, first hotspot inspection, repeated inspection, unknown hotspot rejection, incomplete continue rejection, room completion, scene transition, prototype completion, save/load, reset, duplicate descriptor rejection, ungrantable clue rejection, stage snapshot readback, story projection, and GameHost projection without using DOM, Three.js, browser input, localStorage, `setTimeout`, or StageKit raycasting.
