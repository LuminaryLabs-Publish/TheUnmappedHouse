# START HERE: The Unmapped House

Last updated: `2026-07-11T01-38-28-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a descriptor-driven Three.js stage and a post-processing pass.

This documentation pass changes no runtime source. It isolates a story-phase recovery defect: scene completion is stored only as clues, while interlude pending/open state lives in an unretained timer and DOM classes. Reloading a completed scene can therefore strand the player with every hotspot already inspected, no interlude, and no admitted Continue path.

## Selection

The accessible `LuminaryLabs-Publish` inventory contains ten repositories:

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

`TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `ZombieOrchard` was receiving active same-minute documentation writes, so `TheUnmappedHouse` was selected as the oldest stable eligible fallback. Only this product repository was changed.

## Runtime path

```txt
index.html
  -> src/game.js
  -> shallow-merge localStorage state
  -> resolve currentScene
  -> construct StageKit, listeners, render target and recursive RAF
  -> load scene descriptors and project UI
  -> inspect by side-panel or raycast
     -> mutate inspected/clues/log
     -> derive sceneComplete
     -> schedule unretained 450 ms callback
     -> project UI
     -> write localStorage
  -> timer callback opens interlude in the DOM
  -> Continue mutates route, replaces stage, projects UI and writes localStorage
  -> KeyR clears storage and reloads
```

## Main finding

The runtime has no explicit persisted story phase.

```txt
completion evidence = clues[]
interlude pending    = unretained setTimeout
interlude open       = DOM class and aria-hidden
continue admission   = button event only
terminal state       = DOM copy only
```

A reload after the final required clue preserves `sceneComplete(currentScene) === true`, but boot does not restore or reschedule the interlude. Every hotspot is already marked inspected, and the re-read branch does not evaluate completion. The player can remain permanently stuck in a completed scene.

The timer has no id, target scene id, save revision, deadline or epoch. Its callback closes over mutable `currentScene`. `nextScene()` has no phase/completion guard, so a hidden or repeated Continue activation can advance without authoritative admission. The final scene has no persisted terminal state.

## Current authority

```txt
src/story-data.js   = story, completion requirements and visual descriptors
src/game.js         = mutable story state, implicit phase, timer, persistence and DOM orchestration
src/stage-kit.js    = Three.js resource creation, picking, rendering and scene replacement
src/aspect-frame.js = fixed 16:9 layout policy
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T01-38-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T01-38-28-04-00.md
.agent/architecture-audit/2026-07-11T01-38-28-04-00-story-phase-recovery-dsk-map.md
.agent/render-audit/2026-07-11T01-38-28-04-00-phase-projection-render-correlation-gap.md
.agent/gameplay-audit/2026-07-11T01-38-28-04-00-completion-reload-continue-loop.md
.agent/interaction-audit/2026-07-11T01-38-28-04-00-continue-admission-and-stale-timer-map.md
.agent/story-phase-audit/2026-07-11T01-38-28-04-00-interlude-resume-terminal-contract.md
.agent/deploy-audit/2026-07-11T01-38-28-04-00-story-phase-resume-fixture-gate.md
```

## Next safe ledge

```txt
TheUnmappedHouse Story Phase Recovery Authority
+ Interlude/Continue Admission Fixture Gate
```

Implementation order:

```txt
versioned durable StorySnapshot
  -> explicit exploring/interlude_pending/interlude_open/transitioning/terminal phases
  -> scene-scoped completion proof
  -> persisted interlude deadline and target scene
  -> boot phase reconciliation
  -> typed Continue admission and idempotent result
  -> retained/cancellable timer adapter
  -> persisted terminal state
  -> phase/projection/stage correlation rows
  -> Node fixtures and browser reload smoke
```

## Do not do first

```txt
new rooms or branches
inventory or audio
renderer replacement
shader redesign
camera retuning
visual polish
```
