# START HERE: The Unmapped House

Last updated: `2026-07-10T17-29-23-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, local browser persistence, and descriptor-driven Three.js rendering.

The current visible route should remain unchanged. The next safe work is an atomic StageKit scene commit boundary with descriptor preflight, resource ownership, rollback, disposal, and a frame acknowledgement correlated to the story scene transition.

## Runtime path

```txt
index.html
  -> src/game.js
       -> src/story-data.js
       -> src/stage-kit.js
            -> src/aspect-frame.js
            -> Three.js 0.160.0 CDN
       -> localStorage
       -> DOM / timer / reload effects
```

## Authority today

```txt
src/story-data.js   = story, scene, hotspot, stage, camera, fog, material, post source
src/game.js         = state, inspect/continue/reset policy, persistence, UI, StageKit calls
src/stage-kit.js    = destructive descriptor consumption, render resources, picking, frame loop
src/aspect-frame.js = fixed-aspect viewport policy
```

## Read this pass first

```txt
.agent/trackers/2026-07-10T17-29-23-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T17-29-23-04-00.md
.agent/architecture-audit/2026-07-10T17-29-23-04-00-atomic-stage-scene-commit-dsk-map.md
.agent/render-audit/2026-07-10T17-29-23-04-00-destructive-stage-load-render-commit-gap.md
.agent/gameplay-audit/2026-07-10T17-29-23-04-00-story-scene-stage-commit-loop.md
.agent/interaction-audit/2026-07-10T17-29-23-04-00-hotspot-scene-epoch-correlation-map.md
.agent/stage-resource-audit/2026-07-10T17-29-23-04-00-stage-resource-ownership-disposal-contract.md
.agent/deploy-audit/2026-07-10T17-29-23-04-00-atomic-stage-fixture-gate.md
```

## Interaction loop

```txt
load save and resolve scene
  -> StageKit destructively clears and rebuilds the live scene
  -> render story UI and debug JSON
  -> inspect through button or raycast
  -> mutate clues/inspection/log and save
  -> open delayed interlude when requirements are complete
  -> continue mutates story scene/route
  -> StageKit destructively loads the next scene
  -> render UI and save
  -> final continue projects terminal copy
```

## Main finding

`StageKit.loadScene()` is destructive, incremental, and unobservable. It clears the previous stage and replaces resource tracking before validating or fully constructing the next scene. A descriptor or allocation failure can leave a partial stage with no rollback, while story progression has no scene epoch, load result, render-commit acknowledgement, or proof that the displayed scene matches `state.sceneId`.

Detached geometries and materials are not disposed, and the permanent frame loop/listeners have no teardown contract.

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Scene Commit + Resource Lifetime Fixture Gate
```

## Do not do first

```txt
new rooms
inventory
audio
renderer replacement
new shaders
camera retuning
visual polish
```
