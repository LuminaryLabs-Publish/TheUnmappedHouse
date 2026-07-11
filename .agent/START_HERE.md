# START HERE: The Unmapped House

Last updated: `2026-07-10T22-21-17-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a descriptor-driven Three.js stage, and a post-processing pass.

This documentation pass changes no runtime source. It identifies a resume-breaking story-state boundary: completion is persisted before the delayed interlude is projected, but the save contains no story phase, pending interlude, transition identity, or terminal state. Reloading a completed scene can therefore leave the route permanently unable to advance.

## Selection

The complete accessible `LuminaryLabs-Publish` inventory contains ten repositories:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `TheUnmappedHouse` was the oldest eligible documented fallback after `ZombieOrchard` advanced.

## Runtime path

```txt
index.html
  -> src/game.js
       -> shallow-merge localStorage state
       -> resolve currentScene from sceneId
       -> construct StageKit
       -> StageKit.loadScene(currentScene)
       -> render side-panel and debug state
       -> inspect by side-panel or raycast
       -> mutate inspected, clues and notebook log
       -> persist completion state
       -> schedule interlude projection after 450 ms
       -> Continue mutates route and loads the next stage
       -> final Continue changes DOM copy only
```

## Interaction loop

```txt
load save
  -> inspect hotspots
  -> grant scene clues
  -> evaluate completion from global clue strings
  -> save completed state
  -> wait 450 ms
  -> open non-persisted interlude
  -> Continue advances to the next scene
  -> final Continue projects non-persisted terminal copy
```

## Current authority

```txt
src/story-data.js   = authored story and render descriptors
src/game.js         = mutable story state, persistence, timer, DOM and scene transition orchestration
src/stage-kit.js    = Three.js resource creation, picking, rendering and scene replacement
src/aspect-frame.js = fixed 16:9 layout policy
```

## Main finding

The save records `sceneId`, `clues`, `flags`, `inspected`, `route` and `log`, but it does not record a story phase such as `exploring`, `interlude_pending`, `interlude_open`, `transitioning` or `terminal`.

`inspectHotspot()` saves the completed clue state immediately and only then schedules `showInterlude()` with `setTimeout(..., 450)`. A reload after completion, including after the interlude has opened, restores a complete scene with the interlude hidden. Re-inspecting the final hotspot returns through the already-seen branch and never reschedules the interlude, so the user cannot continue.

`nextScene()` also has no typed command/result boundary. It mutates story state and hides the interlude before `StageKit.loadScene()` succeeds, while the final route state exists only as DOM text and is not persisted.

## Read this pass first

```txt
.agent/trackers/2026-07-10T22-21-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T22-21-17-04-00.md
.agent/architecture-audit/2026-07-10T22-21-17-04-00-resume-safe-story-transition-dsk-map.md
.agent/render-audit/2026-07-10T22-21-17-04-00-story-stage-commit-correlation-gap.md
.agent/gameplay-audit/2026-07-10T22-21-17-04-00-completion-interlude-resume-loop.md
.agent/interaction-audit/2026-07-10T22-21-17-04-00-continue-command-admission-map.md
.agent/persistence-audit/2026-07-10T22-21-17-04-00-save-schema-reconciliation-contract.md
.agent/story-authority-audit/2026-07-10T22-21-17-04-00-story-phase-transition-transaction.md
.agent/deploy-audit/2026-07-10T22-21-17-04-00-resume-transition-fixture-gate.md
```

## Next safe ledge

```txt
TheUnmappedHouse Resume-Safe Story Phase Authority + Transition Fixture Gate
```

Implementation order:

```txt
versioned story source and save envelope
  -> validated and reconciled StorySnapshot
  -> explicit story phase state machine
  -> typed inspect/continue command results
  -> deterministic interlude readiness
  -> persisted terminal state
  -> atomic StoryStageTransition composition
  -> JSON-safe command/result/event journal
  -> headless reload and browser route fixtures
```

The earlier Atomic Stage Commit and Resource Lifecycle work remains the required render-host companion. Story mutation should not be coupled directly to Three.js construction.

## Do not do first

```txt
new rooms or branches
inventory or audio
renderer replacement
shader redesign
camera retuning
visual polish
```
