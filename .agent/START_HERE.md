# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T11-28-38-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.

No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as the oldest observed eligible fallback follow-up with a source-backed blocker that is still actionable: the prior source wire map now needs a fixture replay contract and GameHost projection gate.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked; root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked; root .agent observed
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent observed
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent observed
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback: story fixture replay contract
LuminaryLabs-Publish/ZombieOrchard       tracked; root .agent observed
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

## Target fixture loop

```txt
StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> applyStoryCommand
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryCommandJournal
  -> StoryProjection
  -> SaveProjection
  -> GameHost diagnostics
  -> DOM-free fixture replay rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T11-28-38-04-00-story-fixture-replay-dsk-breakdown.md
.agent/render-audit/2026-07-08T11-28-38-04-00-stage-gamehost-readback.md
.agent/interaction-audit/2026-07-08T11-28-38-04-00-story-fixture-replay-contract.md
.agent/trackers/2026-07-08T11-28-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-28-38-04-00.md
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
TheUnmappedHouse Story Fixture Replay Contract + GameHost Projection Gate
```

Stop that ledge when fixture rows can prove initial state, hotspot inspection, repeated inspection, unknown hotspot rejection, incomplete continue rejection, room completion, scene transition, prototype completion, save/load, reset, duplicate descriptor rejection, ungrantable clue rejection, stage snapshot readback, and GameHost projection without using DOM, Three.js, browser input, or localStorage.
