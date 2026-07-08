# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-08T14-31-06-04-00`

## Summary

`TheUnmappedHouse` remains a compact fixed-camera anime point-and-click horror prototype.

The full accessible `LuminaryLabs-Publish` organization list was compared against central `LuminaryLabs-Dev/LuminaryLabs` ledger state. No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as the oldest observed eligible fallback because it had the oldest central review among the sampled non-excluded repos after the newer `PhantomCommand` and `ZombieOrchard` ledger updates. The previous story reducer map is still correct; this pass adds the missing host-integration wire map needed before runtime source changes.

## Full repo-list comparison result

Current `LuminaryLabs-Publish` repos observed:

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T13:39:15-04:00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central update 2026-07-08T13:31:29-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T14:08:24-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T13:18:13-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T14:18:45-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central update 2026-07-08T13:50:37-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T13:11:07-04:00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / previous central review 2026-07-08T12:59:11-04:00
```

## Source read

```txt
src/game.js:
  owns DOM bindings, SAVE_KEY, mutable state, currentScene, StageKit construction, inspection, clue grant, completion, interlude, next-scene routing, UI projection, debug JSON, reset, and save writes.

src/stage-kit.js:
  owns Three.js import, renderer, fixed 16:9 frame integration, render target, post-process pass, anime material, scene loading, layers, props, hotspot volumes, pointer/raycast picking, hover label, resize, and animation.

src/story-data.js:
  owns gameTitle, three ordered scene descriptors, camera descriptors, stage layers, props, post settings, hotspot ids, hotspot grants, completion requirements, and interlude text.
```

## Main finding

The render route is stable enough to preserve.

The next high-value change is not another broad documentation map; it is a concrete source cutover that moves `inspectHotspot`, `nextScene`, `loadState`, `saveState`, reset, interlude state, and debug projection behind pure command/result/projection helpers.

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
UI event or StageKit callback
  -> create StoryCommandEnvelope
  -> create StorySourceSnapshot
  -> create StoryStateSnapshot
  -> create StageSceneSnapshot
  -> applyStoryCommand
  -> return StoryCommandResult
  -> emit StoryEventRecord[]
  -> derive StoryProjection
  -> derive SaveProjection
  -> derive InterludeProjection
  -> project GameHostStoryDiagnostics
  -> verify DOM-free fixture rows
```

## Domains in use

```txt
implemented:
  static-page-shell, static-pages-deploy, browser-app-runtime, story-source, story-state, localstorage-save, notebook-log, stage-render-host, fixed-aspect-frame, fixed-camera-composition, anime-material-shader, webgl-post-process, stage-layer-descriptor, stage-prop-descriptor, stage-hotspot-volume, hotspot-picking, hover-label-projection.

missing-next:
  story-source-snapshot, story-state-snapshot, stage-scene-snapshot, story-command-envelope, story-command-validation, story-command-reason-authority, story-command-result, story-event-records, story-result-reducer, story-projection, save-projection, interlude-projection, GameHost-story-diagnostics, fixture-replay.
```

## Current next safe ledge

```txt
TheUnmappedHouse Story Reducer Host Integration Wire Map + Fixture Gate
```

## Validation note

No runtime source files changed in this pass.

No local `npm run check`, browser smoke, static server, fixture script, or GitHub Pages validation was run.
