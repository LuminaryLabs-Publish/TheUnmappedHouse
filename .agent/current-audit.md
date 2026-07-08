# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-08T12-59-11-04-00`

## Summary

`TheUnmappedHouse` is a compact fixed-camera anime point-and-click horror prototype.

The full accessible `LuminaryLabs-Publish` organization list was compared against central `LuminaryLabs-Dev/LuminaryLabs` ledger state. No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as the oldest observed eligible fallback because its story authority plan is close to implementation but still needed a concrete reducer module map, fixture row list, stage projection readback, and GameHost diagnostics target.

## Full repo-list comparison result

Current `LuminaryLabs-Publish` repos observed:

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

## Source read

```txt
README.md:
  fixed-camera anime point-and-click horror prototype; reusable StageKit; hotspots, story state, shader materials, post-processing.

package.json:
  npm run check uses node --check on src/aspect-frame.js, src/game.js, src/stage-kit.js, and src/story-data.js.

src/game.js:
  owns DOM bindings, localStorage key, mutable module state, currentScene, StageKit hookup, inspection, clue grant, scene completion, interlude, next scene, render UI, debug JSON, reset, and save.

src/stage-kit.js:
  owns Three.js renderer, fixed 16:9 frame integration, render target, post-process pass, anime material, scene loading, stage layers, props, hotspot volumes, pointer/raycast picking, hover label, and animation.

src/story-data.js:
  owns three authored scenes, camera descriptors, stage layers, props, hotspots, grants, completion requirements, and interludes.
```

## Main finding

The render route is stable enough to preserve.

The next high-value change is a pure story authority layer that turns the existing side-effectful story flow into typed command envelopes, reducer results, event records, projections, save intents, and DOM-free fixture rows.

## Interaction loop

```txt
open page
  -> load or create state
  -> load active scene into StageKit
  -> click hotspot by DOM button or StageKit pick
  -> mutate inspected map and clue ledger
  -> write text and notebook log
  -> check completion
  -> open interlude
  -> continue to next scene
  -> write localStorage
  -> reset by KeyR reload
```

## Target loop

```txt
StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> applyStoryCommand
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> GameHost diagnostics
  -> DOM-free fixture rows
```

## Current next safe ledge

```txt
TheUnmappedHouse Story Result Reducer Implementation Map + Fixture Rows
```

## Validation note

No runtime source files changed in this pass.

No local `npm run check`, browser smoke, static server, fixture script, or GitHub Pages validation was run.
