# START HERE: The Unmapped House

Last updated: `2026-07-10T19-00-19-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, delayed interludes, browser persistence, and descriptor-driven Three.js rendering.

This pass does not change runtime behavior. It identifies the next authority boundary: the authored story source, persisted save, accepted hotspot command, completion proof, and rendered scene need one canonical source identity.

## Runtime path

```txt
index.html
  -> src/game.js
       -> parse localStorage save
       -> shallow-merge state
       -> resolve current scene
       -> src/story-data.js descriptors
       -> src/stage-kit.js
            -> src/aspect-frame.js
            -> Three.js 0.160.0 CDN
       -> DOM, timers, localStorage, reload effects
```

## Authority today

```txt
src/story-data.js   = authored scene, hotspot, clue, render and interlude descriptors
src/game.js         = save parsing, mutable story state, inspect/continue/reset, UI and effects
src/stage-kit.js    = live descriptor consumption, rendering, picking and frame loop
src/aspect-frame.js = fixed-aspect viewport policy
```

## Read this pass first

```txt
.agent/trackers/2026-07-10T19-00-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T19-00-19-04-00.md
.agent/architecture-audit/2026-07-10T19-00-19-04-00-story-source-save-authority-dsk-map.md
.agent/render-audit/2026-07-10T19-00-19-04-00-source-save-render-identity-gap.md
.agent/gameplay-audit/2026-07-10T19-00-19-04-00-clue-completion-authority-loop.md
.agent/interaction-audit/2026-07-10T19-00-19-04-00-canonical-hotspot-command-map.md
.agent/persistence-audit/2026-07-10T19-00-19-04-00-save-envelope-reconciliation-contract.md
.agent/story-source-audit/2026-07-10T19-00-19-04-00-story-manifest-graph-contract.md
.agent/deploy-audit/2026-07-10T19-00-19-04-00-story-source-save-fixture-gate.md
```

## Interaction loop

```txt
parse save
  -> shallow-merge arbitrary persisted fields
  -> resolve a scene, with fallback that does not repair state.sceneId
  -> load StageKit and project UI
  -> button or raycast passes a live hotspot descriptor object
  -> mutate inspected, clues and log
  -> evaluate completion from global clue strings
  -> schedule delayed interlude
  -> continue mutates route and scene
  -> load next StageKit scene and save
  -> final continue projects terminal copy only
  -> KeyR clears storage and reloads
```

## Main finding

The runtime has no versioned story manifest or validated save envelope. Parsed storage is shallow-merged directly into live state, a bad `sceneId` falls back visually without repairing the persisted id, and clue/inspection/route data are not reconciled against the current authored source.

Both input paths pass live hotspot objects into mutation. There is no canonical `{sceneId, hotspotId, inputOrigin}` command, membership check, typed result, source fingerprint, or proof that completion was derived from canonical inspected hotspots rather than stale or injected clue strings.

## Next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Save Reconciliation Fixture Gate
```

The existing atomic StageKit scene-commit work remains the next render-host boundary after source/save authority is explicit.

## Do not do first

```txt
new rooms or branches
inventory or audio
renderer replacement
new shaders
camera retuning
visual polish
```
