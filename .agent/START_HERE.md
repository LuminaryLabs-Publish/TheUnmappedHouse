# START HERE: The Unmapped House

Last updated: `2026-07-11T00-00-26-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a descriptor-driven Three.js stage and a post-processing pass.

This documentation pass changes no runtime source. It identifies the next authority boundary: story state, timers, DOM and StageKit can advance before localStorage confirms a durable save. A write failure can therefore display an inspection, interlude or next scene that disappears or rewinds on reload, while a boot write failure can occur after WebGL resources, listeners and RAF are already active.

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

`TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `TheUnmappedHouse` was the oldest eligible direct review after `ZombieOrchard` advanced.

## Runtime path

```txt
index.html
  -> src/game.js
       -> read and shallow-merge localStorage state
       -> resolve currentScene
       -> construct StageKit
            -> WebGL renderer and target
            -> browser listeners
            -> recursive RAF
       -> load current scene
       -> render story UI
       -> write current state to localStorage
       -> inspect by side-panel or raycast
            -> mutate state
            -> schedule interlude when complete
            -> project UI
            -> write localStorage
       -> Continue
            -> mutate route and scene
            -> replace StageKit scene
            -> project UI
            -> write localStorage
       -> KeyR clears storage and reloads
```

## Interaction loop

```txt
load save
  -> inspect hotspots
  -> grant clues
  -> complete scene
  -> persist and open interlude
  -> Continue
  -> persist and display next scene
  -> final Continue
  -> persist terminal state
```

The intended loop assumes persistence succeeds. The current code does not return or verify persistence outcomes.

## Current authority

```txt
src/story-data.js   = authored story and render descriptors
src/game.js         = mutable story state, persistence, timer, DOM and transition orchestration
src/stage-kit.js    = Three.js resource creation, picking, rendering and scene replacement
src/aspect-frame.js = fixed 16:9 layout policy
```

## Main finding

`saveState()` directly calls `localStorage.setItem()` and returns no status.

```txt
inspection:
  mutate -> schedule timer -> render -> save

Continue:
  mutate -> replace stage -> render -> save

boot:
  acquire renderer/listeners/RAF -> load/render -> save
```

If inspection persistence fails, the delayed interlude remains scheduled and can open from an uncommitted completion. If Continue persistence fails, the next stage can remain visible until reload restores the previous durable scene. If the boot write fails, module evaluation can abort after StageKit resources and listeners are active, with no cleanup stack or disposal boundary.

The earlier resume-safe phase, source reconciliation and atomic StageKit findings remain valid. This pass adds the durable persistence result and recovery layer required to make those transactions truthful.

## Read this pass first

```txt
.agent/trackers/2026-07-11T00-00-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T00-00-26-04-00.md
.agent/architecture-audit/2026-07-11T00-00-26-04-00-story-persistence-commit-dsk-map.md
.agent/render-audit/2026-07-11T00-00-26-04-00-render-before-durable-commit-gap.md
.agent/gameplay-audit/2026-07-11T00-00-26-04-00-inspection-transition-save-failure-loop.md
.agent/interaction-audit/2026-07-11T00-00-26-04-00-command-to-persistence-result-map.md
.agent/persistence-audit/2026-07-11T00-00-26-04-00-localstorage-commit-recovery-contract.md
.agent/lifecycle-audit/2026-07-11T00-00-26-04-00-boot-save-failure-rollback-contract.md
.agent/deploy-audit/2026-07-11T00-00-26-04-00-persistence-failure-recovery-fixture-gate.md
```

## Next safe ledge

```txt
TheUnmappedHouse Durable Story Commit Authority
+ Persistence Failure and Recovery Fixture Gate
```

Implementation order:

```txt
versioned StorySnapshot and source identity
  -> injected persistence adapter
  -> typed load/write/clear results
  -> save revision and state fingerprint
  -> story phase and command reducer
  -> inspection commit before projection/timer
  -> StageKit prepare/commit/discard
  -> recoverable scene-transition protocol
  -> startup cleanup stack and disposal
  -> deterministic failure/recovery fixtures
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