# START HERE: The Unmapped House

Last updated: `2026-07-10T20-38-24-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a descriptor-driven Three.js stage, and a post-processing pass.

This documentation pass changes no runtime source. It promotes the next render-host boundary: scene loading must become an atomic prepare/commit/dispose transaction with explicit stage epochs, resource accounting, and a stoppable host lifecycle.

## Selection

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

`ZombieOrchard` had a newer repo-local documentation sequence actively landing while its central ledger still showed the older timestamp. To avoid colliding with an in-progress audit, `TheUnmappedHouse` was selected as the oldest stable eligible ledger entry.

## Runtime path

```txt
index.html
  -> src/game.js
       -> load mutable story state
       -> resolve current scene
       -> src/story-data.js descriptors
       -> StageKit.loadScene(scene)
            -> clear current group immediately
            -> create layer, prop, hotspot geometry/materials
            -> update camera, fog and post uniforms
       -> side-panel and raycast inspection
       -> clue/completion/interlude/continue loop
       -> localStorage and DOM projection
```

## Interaction loop

```txt
load save
  -> resolve current scene
  -> construct StageKit
  -> load scene descriptors
  -> RAF renders stage to WebGLRenderTarget
  -> post pass renders to canvas
  -> pointer hover raycasts hotspot volumes
  -> click or side-panel button inspects hotspot
  -> grant clues and evaluate scene completion
  -> delayed interlude opens
  -> continue loads the next scene
  -> final continue projects terminal copy
  -> KeyR clears save and reloads
```

## Current authority

```txt
src/story-data.js   = authored story and render descriptors
src/game.js         = story mutation, persistence, DOM and transition effects
src/stage-kit.js    = Three.js resource creation, picking, frame loop and scene replacement
src/aspect-frame.js = fixed 16:9 layout policy
```

## Main finding

`StageKit.loadScene()` clears the live `stageGroup` before the replacement scene is fully prepared. A build failure can therefore leave a partial or blank stage. The method returns no typed result, stage epoch, committed scene identity, or resource ledger.

`Group.clear()` only detaches children. The old geometries and materials are not disposed, `this.materials` is reset before disposal, hotspot materials are never tracked, and repeated scene loads accumulate GPU resources. The constructor also installs anonymous resize/pointer listeners and starts an untracked recursive RAF, so the host has no idempotent `dispose()` boundary.

## Read this pass first

```txt
.agent/trackers/2026-07-10T20-38-24-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T20-38-24-04-00.md
.agent/architecture-audit/2026-07-10T20-38-24-04-00-stage-resource-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-10T20-38-24-04-00-atomic-scene-commit-resource-lifecycle-gap.md
.agent/gameplay-audit/2026-07-10T20-38-24-04-00-scene-transition-render-commit-loop.md
.agent/interaction-audit/2026-07-10T20-38-24-04-00-hotspot-stage-epoch-admission-map.md
.agent/resource-lifecycle-audit/2026-07-10T20-38-24-04-00-three-resource-disposal-contract.md
.agent/deploy-audit/2026-07-10T20-38-24-04-00-stage-lifecycle-fixture-gate.md
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Commit + Resource Lifecycle Fixture Gate
```

The earlier story-source manifest and save-reconciliation plan remains an upstream gameplay-authority requirement. This pass isolates the render-host contract that can be implemented without changing story content, pacing, camera framing, or visual output.

## Do not do first

```txt
new rooms or branches
inventory or audio
renderer replacement
shader redesign
camera retuning
visual polish
```
